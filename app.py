from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/solve', methods=['POST'])
def solve():
    data = request.json
    start = data.get('start')
    goal = data.get('goal')
    algorithm = data.get('algorithm')

    print(f"Received: start={start}, goal={goal}, algorithm={algorithm}")

    # Dummy response: just return the two points
    path = [start, goal]
    return jsonify({'path': path})

if __name__ == '__main__':
    app.run(debug=True)

