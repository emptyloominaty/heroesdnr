let buildingGrid = {}
let buildingCellSize = 5

let ghostBuilding = {
    enabled: false,
    size: [2, 2],
    type: "road",
    price: 0,
}

function getCellKey(x, y) {
    return `${Math.floor(x)},${Math.floor(y)}`
}

function isAreaFree(x, y, w, h) {
    for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
            if (buildingGrid[getCellKey(x + dx, y + dy)] !== undefined) {
                return false
            }
        }
    }
    return true
}

function placeBuilding(x, y, w, h) {
    if (!isAreaFree(x, y, w, h)) return false
    if (gold<ghostBuilding.price) {
        return false
    }
    gold -= ghostBuilding.price
    ghostBuilding.enabled = false
    let bGrid = []
    for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
            buildingGrid[getCellKey(x + dx, y + dy)] = {type:ghostBuilding.type, obj:undefined}
            bGrid.push(buildingGrid[getCellKey(x + dx, y + dy)])
        }
    }
    if (ghostBuilding.type === "inn") {
        console.log(bGrid)
        buildings.push(new Inn({x: (x + w / 2 - 0.5) * buildingCellSize, y: (y + h / 2 - 0.5) * buildingCellSize}, "Inn", 1))
        gridCellAddObj(bGrid,buildings[buildings.length-1])
    }
    return true
}

function gridCellAddObj(bGrid,obj) {
    for (let i = 0; i<bGrid.length; i++) {
        bGrid.obj = obj
    }
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
    if (!ghostBuilding.enabled) {
        return false
    }
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


function buildRoad(x = 2, y = 2) {
    ghostBuilding = {
        enabled: true,
        size: [x, y],
        type: "road",
        price: x*y*4,
    }
}

function buildInn() {
    if (!countBuildings("inn",10)) {
        return false
    }
    ghostBuilding = {
        enabled: true,
        size: [12, 8],
        type: "inn",
        price: 500,
    }
}

function countBuildings(type,max = 1) {
    let a = 0
    for (let i = 0; i<buildings.length; i++) {
        if (buildings[i].type === type) {
            a++
        }
    }
    return a < max
}