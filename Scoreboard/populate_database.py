import sqlite3
import random

# Connect to the database
conn = sqlite3.connect('database.db')
c = conn.cursor()

# Create the players table if it doesn't exist
c.execute('''
          CREATE TABLE IF NOT EXISTS players
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          score INTEGER NOT NULL)
          ''')

# List of sample player names
names = [
    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivan", "Jack",
    "Karen", "Leo", "Mona", "Nina", "Oscar", "Paul", "Quincy", "Rita", "Sam", "Tina",
    "Uma", "Vera", "Walt", "Xena", "Yara", "Zane", "Aaron", "Bella", "Carl", "Diana",
    "Ethan", "Fiona", "George", "Helen", "Isaac", "Judy", "Kevin", "Laura", "Mike", "Nora",
    "Oliver", "Paula", "Quinn", "Rachel", "Steve", "Tracy", "Ursula", "Victor", "Wendy", "Xander"
]

# Insert 50 sample records
for name in names[:50]:
    score = random.randint(0, 2000)
    c.execute("INSERT INTO players (name, score) VALUES (?, ?)", (name, score))

# Commit the transaction and close the connection
conn.commit()
conn.close()
