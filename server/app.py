from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import string
import random

app = Flask(__name__)
CORS(app)

# In-memory user credentials storage
credentials = {
    "user1@gmail.com": {
        "email": "user1@gmail.com",
        "fname": "John",
        "lname": "Doe",
        "password": "pass1",
        "notify": 0,
        "access_level": "C"
    },
    "user2@gmail.com": {
        "email": "user2@gmail.com",
        "fname": "Jane",
        "lname": "Doe",
        "password": "pass2",
        "notify": 1,
        "access_level": "E"
    }
}

@app.route('/')
def hello():
    return 'Hello, Flask!'

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = credentials.get(email)
    if user and user['password'] == password:
        return jsonify({
            "status": "success",
            "access_level": user['access_level'],
            "fname": user['fname'],
            "lname": user['lname'],
            "notify": user['notify']
        })
    else:
        return jsonify({"status": "fail", "message": "Invalid credentials"}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    fname = data.get('fname')
    lname = data.get('lname')
    password = data.get('password')

    if email in credentials:
        return jsonify({"status": "fail", "message": "User already exists"}), 409

    credentials[email] = {
        "email": email,
        "fname": fname,
        "lname": lname,
        "password": password,
        "notify": 0,
        "access_level": "C"  # Default access level for new users
    }

    return jsonify({"status": "success", "message": "User registered successfully"}), 201

def generate_temp_password(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')

    user = credentials.get(email)
    if user:
        temp_password = generate_temp_password()
        user['password'] = temp_password
        # Send the email with the temporary password
        server = smtplib.SMTP('smtp.example.com', 587)
        server.starttls()
        server.login("your-email@example.com", "your-email-password")
        message = f"Your temporary password is: {temp_password}"
        server.sendmail("your-email@example.com", email, message)
        server.quit()

        return jsonify({
            "status": "success",
            "temp_password": temp_password,
            "message": "Temporary password has been sent to your email"
        })
    else:
        return jsonify({"status": "fail", "message": "Email not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
