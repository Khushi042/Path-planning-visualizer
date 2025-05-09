const getNeighbors = (node, grid) => {
  const neighbors = [];
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0], // Right, Down, Left, Up
  ];

  for (let [dx, dy] of directions) {
    const newX = node[0] + dx;
    const newY = node[1] + dy;
    if (
      newX >= 0 && newX < grid.length &&
      newY >= 0 && newY < grid[0].length &&
      !grid[newX][newY].isObstacle
    ) {
      neighbors.push([newX, newY]);
    }
  }

  return neighbors;
};

const manhattanDistance = (node, goal) => {
  return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);
};

const aStar = (start, goal, grid) => {
  const openSet = [];
  const closedSet = new Set();
  const cameFrom = {};

  const gScore = {};
  const fScore = {};

  openSet.push(start);
  gScore[`${start[0]},${start[1]}`] = 0;
  fScore[`${start[0]},${start[1]}`] = manhattanDistance(start, goal);

  while (openSet.length > 0) {
    // Get the node with the lowest fScore
    openSet.sort((a, b) =>
      fScore[`${a[0]},${a[1]}`] - fScore[`${b[0]},${b[1]}`]
    );
    const current = openSet.shift();

    if (current[0] === goal[0] && current[1] === goal[1]) {
      // Reconstruct path
      const path = [];
      let temp = current;
      while (temp) {
        path.unshift(temp);
        temp = cameFrom[`${temp[0]},${temp[1]}`];
      }
      return path;
    }

    closedSet.add(`${current[0]},${current[1]}`);

    const neighbors = getNeighbors(current, grid);
    for (let neighbor of neighbors) {
      if (closedSet.has(`${neighbor[0]},${neighbor[1]}`)) continue;

      const tentativeGScore =
        gScore[`${current[0]},${current[1]}`] + 1;

      const neighborKey = `${neighbor[0]},${neighbor[1]}`;
      const isNew = !openSet.some(n => n[0] === neighbor[0] && n[1] === neighbor[1]);

      if (isNew || tentativeGScore < gScore[neighborKey]) {
        cameFrom[neighborKey] = current;
        gScore[neighborKey] = tentativeGScore;
        fScore[neighborKey] = tentativeGScore + manhattanDistance(neighbor, goal);

        if (isNew) openSet.push(neighbor);
      }
    }
  }

  return []; // No path found
};

export default aStar;
