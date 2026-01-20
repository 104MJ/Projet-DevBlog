from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

@app.route("/")
def home():
    return jsonify({"message": "DevBlog backend is running "})

@app.route("/health")
def health():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.close()
        return jsonify({"db": "connected"})
    except Exception as e:
        return jsonify({"db": "error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
