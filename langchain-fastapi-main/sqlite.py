import sqlite3
import pandas as pd

# Load the Excel file
df = pd.read_excel('All_Flight_Data_Final.xlsx')

# Convert date and time fields to string format
df['date'] = df['date'].astype(str)
df['departure_time'] = df['departure_time'].astype(str)
df['arrival_time'] = df['arrival_time'].astype(str)

# Connect to SQLite database (or create it if it doesn't exist)
connection = sqlite3.connect("flight_data.db")

# Create a cursor object to interact with the database
cursor = connection.cursor()

# Create the table for flight data
table_info = """
CREATE TABLE IF NOT EXISTS flights (
    flight_name TEXT,
    date TEXT,
    departure_time TEXT,
    departure_loc TEXT,
    flight_duration TEXT,
    stops TEXT,
    arrival_time TEXT,
    arrival_loc TEXT,
    price INTEGER
)
"""
cursor.execute(table_info)

# Insert the records from the dataframe into the SQLite table
for row in df.itertuples(index=False):
    cursor.execute('''
        INSERT INTO flights (flight_name, date, departure_time, departure_loc, flight_duration, stops, arrival_time, arrival_loc, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', row)

# Display all the records
print("The inserted records are:")
data = cursor.execute('''SELECT * FROM flights''')
for row in data:
    print(row)

# Commit your changes and close the connection
connection.commit()
connection.close()
