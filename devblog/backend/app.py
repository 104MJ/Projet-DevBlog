from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor 
import time
import os

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "host": os.getenv("POSTGRES_HOST", "db"),
    "dbname": os.getenv("POSTGRES_DB", "devblog"),
    "user": os.getenv("POSTGRES_USER", "devblog"),
    "password": os.getenv("POSTGRES_PASSWORD", "devblog"),
    "port": os.getenv("POSTGRES_PORT", "5432")
}

def get_db():
    retries = 5
    while retries > 0:
        try:
            return psycopg2.connect(**DB_CONFIG)
        except psycopg2.OperationalError:
            retries -= 1
            time.sleep(2)
    raise Exception("Impossible de se connecter à la DB")

def init_db():
    """Initialisation des deux tables séparées."""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS articles (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS tutos (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                video_url TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("Tables initialisées.")
    except Exception as e:
        print(f"Erreur init: {e}")

init_db()

@app.get("/posts")
def list_posts():
    post_type = request.args.get("type") 
    limit = request.args.get("limit")
    
    table = "articles" if post_type == "article" else "tutos"
    
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if post_type == "tuto":
        query = f"SELECT id, title, content, video_url, created_at FROM {table}"
    else:
        query = f"SELECT id, title, content, created_at FROM {table}"

    query += " ORDER BY created_at DESC"
    
    if limit:
        query += f" LIMIT {int(limit)}"

    cur.execute(query)
    rows = cur.fetchall()
    cur.close(); conn.close()
    return jsonify(rows)

@app.post("/posts")
def create_post():
    data = request.json
    post_type = data.get("type") 
    
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    if post_type == "article":
        cur.execute(
            "INSERT INTO articles (title, content) VALUES (%s, %s) RETURNING id",
            (data["title"], data["content"])
        )
    elif post_type == "tuto":
        cur.execute(
            "INSERT INTO tutos (title, content, video_url) VALUES (%s, %s, %s) RETURNING id",
            (data["title"], data["content"], data.get("video_url"))
        )
    else:
        return jsonify({"error": "Type invalide"}), 400

    new_id = cur.fetchone()['id']
    conn.commit()
    cur.close(); conn.close()
    
    return jsonify({"status": "created", "id": new_id}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)