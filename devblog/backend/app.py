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
    """Crée une connexion à la base de données avec retry si elle n'est pas prête."""
    retries = 5
    while retries > 0:
        try:
            return psycopg2.connect(**DB_CONFIG)
        except psycopg2.OperationalError:
            retries -= 1
            print(f"La DB n'est pas prête... tentative restante: {retries}")
            time.sleep(2)
    raise Exception("Impossible de se connecter à la base de données")

def init_db():
    """Initialisation de la table au démarrage."""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                type TEXT CHECK (type IN ('article','tuto')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("Base de données initialisée avec succès.")
    except Exception as e:
        print(f"Erreur d'initialisation: {e}")

init_db()

@app.get("/api/ping") 
def ping():
    return jsonify({"status": "ok", "message": "Backend Flask est en ligne"}), 200

@app.get("/posts")
def list_posts():
    post_type = request.args.get("type")
    limit = request.args.get("limit")
    
    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    query = "SELECT id, title, type, created_at FROM posts"
    params = []

    if post_type:
        query += " WHERE type=%s"
        params.append(post_type)
    
    query += " ORDER BY created_at DESC"
    
    if limit:
        query += " LIMIT %s"
        params.append(limit)

    cur.execute(query, params)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(rows)

@app.post("/posts")
def create_post():
    data = request.json
    if not data or not all(k in data for k in ("title", "content", "type")):
        return jsonify({"error": "Données manquantes"}), 400

    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(
        "INSERT INTO posts (title, content, type) VALUES (%s, %s, %s) RETURNING id, created_at",
        (data["title"], data["content"], data["type"])
    )
    new_post = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({"status": "created", "id": new_post['id']}), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)