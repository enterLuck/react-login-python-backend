from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
import hashlib

app = Flask(__name__)

def check_credentials(email, password):
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='your_database',
            user='your_user',
            password='your_password'
        )

        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            cursor.execute("SELECT access_level FROM users WHERE email = %s AND password = %s", (email, hashed_password))
            record = cursor.fetchone()
            return record

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = check_credentials(email, password)
    if user:
        return jsonify({"accessLevel": user['access_level']}), 200
    else:
        return jsonify({"message": "Login denied"}), 401

if __name__ == '__main__':
    app.run(debug=True)
