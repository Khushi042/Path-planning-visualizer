# Path-planning-visualizer
An interactive React-based visualizer for pathfinding algorithms like A*, Dijkstra, BFS, and DFS. Customize your grid by dragging the start/goal nodes and placing/removing obstacles, then choose an algorithm to see how it finds a path.
🚀 Features
Interactive 2D grid canvas

Drag-and-drop Start and Goal positions

Click to add/remove obstacles

Visualize multiple algorithms:

A* (A-Star)

Dijkstra

Breadth-First Search (BFS)

Depth-First Search (DFS)

🛠 Tech Stack
React (Vite or Create React App)

JavaScript

HTML5 Canvas

📦 Installation
Clone the repository

bash
Copy code
git clone https://github.com/your-username/path-planning-visualizer.git
cd path-planning-visualizer
Install dependencies

bash
Copy code
npm install
Run the development server

bash
Copy code
npm run dev   # for Vite
# or
npm start     # if using Create React App
Open in browser

Visit http://localhost:5173 or http://localhost:3000 depending on your setup.

🧠 How to Use
Select an algorithm from the dropdown (A*, Dijkstra, BFS, DFS).

Drag the green (start) or blue (goal) circle to reposition.

Click grid cells to toggle obstacles (red squares).

Click “Run Algorithm” to visualize the selected pathfinding method.

📁 Project Structure
bash
Copy code
src/
│
├── components/
│   └── Canvas.jsx        # Main visualization and grid logic
│
├── aStar.js              # A* implementation
├── dijkstra.js           # Dijkstra's algorithm
├── bfs.js                # Breadth-First Search
├── dfs.js                # Depth-First Search
│
├── App.jsx               # Root React component
└── main.jsx              # App entry point
