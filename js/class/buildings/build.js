let buildingGrid = new Map()
let buildingCellSize = 5
const gridCellsX = 200
const gridCellsY = 200

let ghostBuilding = {
    size: [2, 2], 
    color: "rgba(0, 200, 0, 0.4)",
}

function getCellKey(x, y) {
    return `${Math.floor(x)},${Math.floor(y)}`
}

function isAreaFree(x, y, w, h) {
    for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
            if (buildingGrid.has(getCellKey(x + dx, y + dy))) {
                return false
            }
        }
    }
    return true
}

function placeBuilding(x, y, w, h, building) {
    if (!isAreaFree(x, y, w, h)) return false;
    for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
            buildingGrid.set(getCellKey(x + dx, y + dy), building)
        }
    }
    return true
}

const canvas = elements.canvasGame
const ctx = canvas.getContext("2d")

function worldToGrid(wx, wy) {
    return [
        Math.floor(wx / buildingCellSize),
        Math.floor(wy / buildingCellSize),
    ]
}

function gridToWorld(gx, gy) {
    return [
        gx * buildingCellSize,
        gy * buildingCellSize,
    ]
}

function screenToWorld(mx, my) {
    return [
        x + (mx) ,
        y + (my) ,
    ]
}

function mouseToGrid(mouse) {
    const [wx, wy] = screenToWorld(mouse.x, mouse.y)
    return worldToGrid(wx, wy)
}

function drawGrid() {
    const cellWorldSize = buildingCellSize
    const cellScreenSize = cellWorldSize * zoom

    const cols = Math.ceil(canvas.width / cellScreenSize) + 2
    const rows = Math.ceil(canvas.height / cellScreenSize) + 2

    const startX = x - (canvas.width / 2) / zoom
    const startY = y - (canvas.height / 2) / zoom

    const offsetX = Math.floor(startX / buildingCellSize)
    const offsetY = Math.floor(startY / buildingCellSize)

    ctx.strokeStyle = "rgba(128,128,128,0.3)"
    ctx.lineWidth = 1

    for (let gx = offsetX; gx < offsetX + cols; gx++) {
        for (let gy = offsetY; gy < offsetY + rows; gy++) {
            const [wx, wy] = gridToWorld(gx, gy)
            const sx = (wx - x) * zoom + canvas.width / 2
            const sy = (wy - y) * zoom + canvas.height / 2

            ctx.strokeRect(sx, sy, cellScreenSize, cellScreenSize)
        }
    }
}

function drawGhost(gridX, gridY, building) {
    const isFree = isAreaFree(gridX, gridY, ...building.size)
    const color = isFree ? "rgba(0,255,0,0.4)" : "rgba(255,0,0,0.4)"

    const cellScreenSize = buildingCellSize * zoom

    for (let dx = 0; dx < building.size[0]; dx++) {
        for (let dy = 0; dy < building.size[1]; dy++) {
            const [wx, wy] = gridToWorld(gridX + dx, gridY + dy)
            const sx = (wx - x) * zoom + canvas.width / 2
            const sy = (wy - y) * zoom + canvas.height / 2

            ctx.fillStyle = color
            ctx.fillRect(sx, sy, cellScreenSize, cellScreenSize)
        }
    }
}

