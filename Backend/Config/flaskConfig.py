from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from Config.mysqlConnect import cursor, connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# create database if not exists
cursor.execute("CREATE DATABASE IF NOT EXISTS HospitalManagementSystem")
connection.commit()
cursor.close()
connection.close()

# Configure sql database URI (For MySQL):
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Harsha%4003@localhost/HospitalManagementSystem'

# Optional: Suppress warning messages
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)