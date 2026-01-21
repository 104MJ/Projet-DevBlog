from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

DB = dict(
host=os.getenv("POSTGRES_HOST", "db"),
dbname=os.getenv("POSTGRES_DB", "devblog"),
user=os.getenv("POSTGRES_USER", "devblog"),
password=os.getenv("POSTGRES_PASSWORD", "devblog")
)
def get_db():
    return psycopg2.connect(
        **DB
    )

@app.before_first_request
def init_db():
    conn = get_db(); cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT CHECK (type IN ('article','tuto')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )""")
    conn.commit(); cur.close(); conn.close()

@app.get("/posts")
def list_posts():
    t = request.args.get("type")
    limit = request.args.get("limit")
    conn = get_db(); cur = conn.cursor()


    q = "SELECT id,title,created_at FROM posts"
    params = []


    if t:
        q += " WHERE type=%s"; params.append(t)
    q += " ORDER BY created_at DESC"
    if limit:
        q += " LIMIT %s"; params.append(limit)  

    cur.execute(q, params)
    rows = cur.fetchall()
    cur.close(); conn.close()

    return jsonify([
        {"id":r[0],"title":r[1],"created_at":r[2]} for r in rows
    ])


@app.get("/posts/<int:id>")
def get_post(id):
    conn = get_db(); cur = conn.cursor()
    cur.execute("SELECT * FROM posts WHERE id=%s", (id,))
    r = cur.fetchone()
    cur.close(); conn.close()


    if not r: return {"error":"not found"},404
    return {"id":r[0],"title":r[1],"content":r[2],"type":r[3]}

@app.post("/posts")
def create_post():
    d = request.json
    conn = get_db(); cur = conn.cursor()
    cur.execute(
    "INSERT INTO posts(title,content,type) VALUES(%s,%s,%s)",
    (d["title"], d["content"], d["type"])
    )
    conn.commit(); cur.close(); conn.close()
    return {"status":"ok"},201



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)


