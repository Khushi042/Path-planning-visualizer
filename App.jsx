import { useState } from "react";
import Canvas from "./components/Canvas";

function App() {
  const [path, setPath] = useState([]);
  const [start, setStart] = useState([2, 2]); // Default start position
  const [goal, setGoal] = useState([15, 15]); // Default goal position
  const [obstacles, setObstacles] = useState([
    [5, 5],
    [6, 5],
    [7, 5],
    [8, 5],
    [9, 5],
    [10, 5],
  ]); // Example obstacles

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Path Planning Visualizer</h1>
      <Canvas
        path={path}
        setPath={setPath}
        start={start}
        setStart={setStart}
        goal={goal}
        setGoal={setGoal}
        obstacles={obstacles}
        setObstacles={setObstacles}
      />
    </div>
  );
}

export default App;
