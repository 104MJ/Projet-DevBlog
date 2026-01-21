from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Option A : La plus sûre pour le développement (autorise tout temporairement)
CORS(app, resources={r"/*": {"origins": "*"}})

# Option B : Plus précise (si tu préfères rester sur blog.localhost)
# CORS(app, origins=["http://blog.localhost"])

@app.route('/ping') # Vérifie que c'est bien /ping et non /
def ping():
    return jsonify({"status": "success", "message": "Pong!"})

if __name__ == '__main__':
    # host='0.0.0.0' est INDISPENSABLE pour Docker
    app.run(host='0.0.0.0', port=8000)