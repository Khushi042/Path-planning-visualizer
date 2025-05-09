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
