from flask import Flask, request, jsonify

app = Flask(__name__)

# Hardcoded user credentials
credentials = {
    "user1": "pass1",
    "user2": "pass2"
}

access_levels = {
    "user1": "accesslevel1",
    "user2": "accesslevel2"
}

@app.route('/')
def hello():
    return 'Hello, Flask!'

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in credentials and credentials[username] == password:
        access_level = access_levels[username]
        return jsonify({"status": "success", "access_level": access_level})
    else:
        return jsonify({"status": "fail"}), 401

if __name__ == '__main__':
    app.run(debug=True)
