from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/leaderboard')
def leaderboard():
    conn = get_db_connection()
    players = conn.execute('SELECT * FROM players ORDER BY score DESC').fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in players])

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
