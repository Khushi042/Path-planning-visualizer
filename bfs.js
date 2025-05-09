export default function bfs(start, goal, grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    const queue = [[start]];
    visited[start[1]][start[0]] = true;
  
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ];
  
    while (queue.length > 0) {
      const path = queue.shift();
      const [x, y] = path[path.length - 1];
  
      if (x === goal[0] && y === goal[1]) {
        return path;
      }
  
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
  
        if (
          newX >= 0 && newX < numCols &&
          newY >= 0 && newY < numRows &&
          !visited[newY][newX] &&
          !grid[newY][newX].isObstacle
        ) {
          visited[newY][newX] = true;
          queue.push([...path, [newX, newY]]);
        }
      }
    }
  
    return []; // no path found
  }
  