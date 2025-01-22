import mysql.connector

connection = mysql.connector.connect(
    host = "localhost",
    username = "root",
    password = "Harsha@03"
)

if connection.is_connected():
    print("Database Connected Successfully")

cursor = connection.cursor()