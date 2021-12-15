const getNeighbours = (row, col, board) => {
    // ** Get all possible next path
    const totalRows = board.length;
    const totalCols = board[0].length;

    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const neighbours = [];

    directions.forEach((direction) => {
        const [offsetX, offsetY] = [...direction];

        const newRow = row + offsetX;
        const newCol = col + offsetY;

        if (newRow < 0 || newRow >= totalRows) return;
        if (newCol < 0 || newCol >= totalCols) return;

        // ** Ignore if neighbour is a wall
        if (board[newRow][newCol] !== "wall") neighbours.push([newRow, newCol]);
    });

    return neighbours;
};

const reconstructPath = (prev, board, endPos) => {
    // * Reconstruct the path from the "previous" array
    const path = [];
    const { row: endRow, col: endCol } = endPos;
    let current = [endRow, endCol];

    while (current) {
        path.push(current);
        current = prev[current[0]][current[1]];
    }

    path.reverse();
    return path;
};

const bfsAlgorithm = (board, startPos, endPos, animations) => {
    // ** Breadth-First Search algorithm
    // Mark visited node
    let visited = board.map((row) => {
        return row.slice().fill(false);
    });
    // Contain previous node to construct path
    let prev = board.map((row) => {
        return row.slice().fill(null);
    });

    const { row: startRow, col: startCol } = startPos;
    const { row: endRow, col: endCol } = endPos;

    // ** Initialize row and col queues
    const rowQueue = [];
    const colQueue = [];

    rowQueue.push(startRow);
    colQueue.push(startCol);
    visited[startRow][startCol] = true;

    while (rowQueue.length > 0) {
        let row = rowQueue.shift();
        let col = colQueue.shift();
        let node = board[row][col];

        // ** Found the end node
        if (row === endRow && col === endCol) {
            return reconstructPath(prev, board, endPos);
        }

        // ** Mark that node is visited
        if (row !== startRow || col !== startCol) {
            animations.push({ row, col, state: "visited" });
        }

        const checkingNodes = [];
        getNeighbours(row, col, board).forEach((neighbours) => {
            const [nRow, nCol] = neighbours;

            if (!visited[nRow][nCol]) {
                visited[nRow][nCol] = true;
                rowQueue.push(nRow);
                colQueue.push(nCol);
                prev[nRow][nCol] = [row, col];
                checkingNodes.push([nRow, nCol]);
            }
        });

        animations.push({ checkingNodes, state: "checking" });
    }

    return animations;
};

export default { bfsAlgorithm };
