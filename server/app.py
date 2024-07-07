from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, origins=['http://localhost:3000'])
CORS(app)

# Hardcoded user credentials
credentials = {
    "user1": "pass1",
    "user2": "pass2"
}

access_levels = {
    "user1": "accesslevel1",
    "user2": "accesslevel2"
}

users = []  # Store user data in a list for this example

@app.route('/')
def hello():
    return 'Hello, Flask!'


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print("Received data:", data)  # Debugging statement
    username = data.get('username')
    password = data.get('password')
    print("Username:", username)  # Debugging statement
    print("Password:", password)  # Debugging statement


    if username in credentials and credentials[username] == password:
        access_level = access_levels[username]
        print("Access level:", access_level)  # Debugging statement
        return jsonify({"status": "success", "access_level": access_level})
    else:
        print("Login failed")  # Debugging statement
        return jsonify({"status": "fail"}), 401


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    print("Received signup data:", data)
    # Add the new user to the users list
    users.append(data)
    return jsonify({"status": "success", "message": "User signed up successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True)
