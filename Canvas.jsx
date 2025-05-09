import React, { useEffect, useRef, useState } from 'react';
import aStar from '../aStar';
import dijkstra from '../dijkstra';
import bfs from '../bfs';
import dfs from '../dfs'; 

const Canvas = ({ start, goal, obstacles, setObstacles, setStart, setGoal, path, setPath }) => {
  const canvasRef = useRef(null);
  const gridSize = 20;
  const canvasWidth = 800;
  const canvasHeight = 600;

  const [localPath, setLocalPath] = useState([]);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingGoal, setIsDraggingGoal] = useState(false);
  const [algorithm, setAlgorithm] = useState('A*');

  const drawGrid = (ctx) => {
    ctx.strokeStyle = "#ddd";
    for (let x = 0; x < canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
    }
    for (let y = 0; y < canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
  };

  const drawObstacles = (ctx) => {
    obstacles.forEach(([x, y]) => {
      ctx.fillStyle = "red";
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    });
  };

  const drawStartGoal = (ctx) => {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(start[0] * gridSize + gridSize / 2, start[1] * gridSize + gridSize / 2, gridSize / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(goal[0] * gridSize + gridSize / 2, goal[1] * gridSize + gridSize / 2, gridSize / 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawPath = (ctx) => {
    if (localPath && localPath.length > 1) {
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(localPath[0][0] * gridSize + gridSize / 2, localPath[0][1] * gridSize + gridSize / 2);
      for (let i = 1; i < localPath.length; i++) {
        ctx.lineTo(localPath[i][0] * gridSize + gridSize / 2, localPath[i][1] * gridSize + gridSize / 2);
      }
      ctx.stroke();
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize);
    const y = Math.floor((e.clientY - rect.top) / gridSize);
    if (x === start[0] && y === start[1]) setIsDraggingStart(true);
    else if (x === goal[0] && y === goal[1]) setIsDraggingGoal(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingStart && !isDraggingGoal) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize);
    const y = Math.floor((e.clientY - rect.top) / gridSize);
    if (isDraggingStart) setStart([x, y]);
    if (isDraggingGoal) setGoal([x, y]);
  };

  const handleMouseUp = () => {
    setIsDraggingStart(false);
    setIsDraggingGoal(false);
  };

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize);
    const y = Math.floor((e.clientY - rect.top) / gridSize);

    setObstacles((prev) => {
      const exists = prev.some(([ox, oy]) => ox === x && oy === y);
      return exists ? prev.filter(([ox, oy]) => ox !== x || oy !== y) : [...prev, [x, y]];
    });
  };

  const handleRunAlgorithm = () => {
    const grid = Array.from({ length: canvasHeight / gridSize }, () =>
      Array.from({ length: canvasWidth / gridSize }, () => ({ isObstacle: false }))
    );

    obstacles.forEach(([x, y]) => {
      grid[y][x].isObstacle = true;
    });

    let computedPath = [];
    if (algorithm === 'A*') {
      computedPath = aStar(start, goal, grid);
    } else if (algorithm === 'Dijkstra') {
      computedPath = dijkstra(start, goal, grid);
    } else if (algorithm === 'BFS') {
      computedPath = bfs(start, goal, grid);
    } else if (algorithm === 'DFS') {
      computedPath = dfs(start, goal, grid);
    }

    setLocalPath(computedPath);
    setPath(computedPath);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawObstacles(ctx);
    drawStartGoal(ctx);
    drawPath(ctx);
  }, [localPath, start, goal, obstacles]);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Select Algorithm: </label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="A*">A*</option>
          <option value="Dijkstra">Dijkstra</option>
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
        </select>
        <button onClick={handleRunAlgorithm} style={{ marginLeft: '10px' }}>
          Run Algorithm
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black" }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default Canvas;
