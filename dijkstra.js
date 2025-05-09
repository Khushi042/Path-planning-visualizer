const getNeighbors = (node, grid) => {
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
    ];
    const neighbors = [];
  
    for (const [dx, dy] of directions) {
      const x = node[0] + dx;
      const y = node[1] + dy;
      if (
        x >= 0 && x < grid.length &&
        y >= 0 && y < grid[0].length &&
        !grid[x][y].isObstacle
      ) {
        neighbors.push([x, y]);
      }
    }
  
    return neighbors;
  };
  
  const dijkstra = (start, goal, grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const visited = new Set();
    const cameFrom = {};
  
    const priorityQueue = [[start, 0]];
    distances[start[0]][start[1]] = 0;
  
    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a[1] - b[1]);
      const [current, dist] = priorityQueue.shift();
      const key = `${current[0]},${current[1]}`;
  
      if (visited.has(key)) continue;
      visited.add(key);
  
      if (current[0] === goal[0] && current[1] === goal[1]) {
        const path = [];
        let node = goal;
        while (node) {
          path.unshift(node);
          node = cameFrom[`${node[0]},${node[1]}`];
        }
        return path;
      }
  
      for (const neighbor of getNeighbors(current, grid)) {
        const [nx, ny] = neighbor;
        const newDist = dist + 1;
        if (newDist < distances[nx][ny]) {
          distances[nx][ny] = newDist;
          cameFrom[`${nx},${ny}`] = current;
          priorityQueue.push([[nx, ny], newDist]);
        }
      }
    }
  
    return []; // No path found
  };
  
  export default dijkstra;
  