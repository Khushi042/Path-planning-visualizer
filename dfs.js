export default function dfs(start, goal, grid) {
    const [sx, sy] = start;
    const [gx, gy] = goal;
    const rows = grid.length;
    const cols = grid[0].length;
    const stack = [[sx, sy]];
    const visited = new Set();
    const parent = {};
  
    const key = (x, y) => `${x},${y}`;
    visited.add(key(sx, sy));
  
    const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ];
  
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      if (x === gx && y === gy) break;
  
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 && nx < cols &&
          ny >= 0 && ny < rows &&
          !grid[ny][nx].isObstacle &&
          !visited.has(key(nx, ny))
        ) {
          visited.add(key(nx, ny));
          parent[key(nx, ny)] = [x, y];
          stack.push([nx, ny]);
        }
      }
    }
  
    // Reconstruct path
    const path = [];
    let curr = [gx, gy];
    while (key(curr[0], curr[1]) !== key(sx, sy)) {
      path.push(curr);
      curr = parent[key(curr[0], curr[1])];
      if (!curr) return []; // No path
    }
    path.push(start);
    return path.reverse();
  }
  