let grid = {}
let gridCellSize = 20
function getCellCoords(x, y) {
    const cellSize = gridCellSize
    return {
        x: Math.floor(x / cellSize),
        y: Math.floor(y / cellSize),
    }
}

function addToGrid(obj) {
    const cell = getCellCoords(obj.location.x, obj.location.y)
    const key = `${cell.x},${cell.y}`
    if (!grid[key]) grid[key] = []
    grid[key].push(obj)
    obj._gridKey = key
}

function updateGridPosition(obj) {
    const newCell = getCellCoords(obj.location.x, obj.location.y)
    const newKey = `${newCell.x},${newCell.y}`

    if (newKey !== obj._gridKey) {
        // Remove from old cell
        const oldList = grid[obj._gridKey]
        if (oldList) {
            const index = oldList.indexOf(obj)
            if (index !== -1) oldList.splice(index, 1)
        }

        // Add to new cell
        if (!grid[newKey]) grid[newKey] = []
        grid[newKey].push(obj)
        obj._gridKey = newKey
    }
}
function getNearbyCells(x, y, depth = 1) {
    const centerCell = {
        x: Math.floor(x / gridCellSize),
        y: Math.floor(y / gridCellSize)
    }
    const cells = []
    for (let dx = -depth; dx <= depth; dx++) {
        for (let dy = -depth; dy <= depth; dy++) {
            const cellX = centerCell.x + dx
            const cellY = centerCell.y + dy
            cells.push({ x: cellX, y: cellY })
        }
    }
    return cells
}