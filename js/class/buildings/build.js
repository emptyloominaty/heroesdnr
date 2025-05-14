let buildingGrid = {}
let buildingCellSize = 5

let ghostBuilding = {
    enabled: false,
    size: [2, 2],
    type: "road",
    price: 0,
}

function changeRoadSize(x, y) {
    ghostBuilding.size[0] -= x
    ghostBuilding.size[1] -= y
    if (ghostBuilding.size[0] < 0) {
        ghostBuilding.size[0] = 1
    }
    if (ghostBuilding.size[1] < 0) {
        ghostBuilding.size[1] = 1
    }
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

function placeBuilding(x, y, w, h, ignorePrice = false) {
    let bGrid = []
    if (ghostBuilding.type === "removeRoad") {
        removeRoadArea(x,y,w,h)
        return true
    }
    if (ghostBuilding.type === "torchSmall" || ghostBuilding.type === "torchMedium" || ghostBuilding.type === "torchLarge") {
        if (!ignorePrice) {
            gold -= ghostBuilding.price
        }
        buildingGrid[getCellKey(x, y)] = {type: ghostBuilding.type, obj: new Torch((x + w / 2 - 0.5) * buildingCellSize, (y + h / 2 - 0.5) * buildingCellSize,ghostBuilding.type)}
        bGrid.push(buildingGrid[getCellKey(x, y)])
        return true
    }

    if (!isAreaFree(x, y, w, h)) return false
    if (gold<ghostBuilding.price && !ignorePrice) {
        //TODO:MESSAGE
        return false
    }
    if (!ignorePrice) {
        gold -= ghostBuilding.price
    }
    if (!keys['shift'] && ghostBuilding.type !== "road" && ghostBuilding.type !== "torchSmall" && ghostBuilding.type !== "torchMedium" && ghostBuilding.type !== "torchLarge" ) {
        ghostBuilding.enabled = false
    }
    
    for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
            buildingGrid[getCellKey(x + dx, y + dy)] = {type:ghostBuilding.type, obj:undefined}
            bGrid.push(buildingGrid[getCellKey(x + dx, y + dy)])
        }
    }
    if (ghostBuilding.type === "inn") {
        buildings.push(new Inn({x: (x + w / 2 - 0.5) * buildingCellSize, y: (y + h / 2 - 0.5) * buildingCellSize}, "Inn", 1))
        gridCellAddObj(bGrid, buildings[buildings.length - 1])
    } else if (ghostBuilding.type === "potionShop") {
        buildings.push(new PotionShop({x: (x + w / 2 - 0.5) * buildingCellSize, y: (y + h / 2 - 0.5) * buildingCellSize}, "Potion Shop", 1))
        gridCellAddObj(bGrid, buildings[buildings.length - 1])
    } else if (ghostBuilding.type === "recruitmentHall") {
        buildings.push(new RecruitmentHall({x: (x + w / 2 - 0.5) * buildingCellSize, y: (y + h / 2 - 0.5) * buildingCellSize}, "Recruitment Hall", 1))
        gridCellAddObj(bGrid, buildings[buildings.length - 1])
    } else if (ghostBuilding.type === "dungeonController") {
        dungeonControllers.push(new DungeonController((x + w / 2 - 0.5) * buildingCellSize, (y + h / 2 - 0.5) * buildingCellSize))
        gridCellAddObj(bGrid, dungeonControllers[dungeonControllers.length - 1])
    } else if (ghostBuilding.type === "torchSmall" || ghostBuilding.type === "torchMedium" || ghostBuilding.type === "torchLarge") {
        gridCellAddObj(bGrid, new Torch(1,1,ghostBuilding.type))
    }
    return true
}

function gridCellAddObj(bGrid,obj) {
    for (let i = 0; i<bGrid.length; i++) {
        bGrid[i].obj = obj
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
    //const [wx, wy] = screenToWorld(mouse.x, mouse.y)
    return worldToGrid(mouse.x, mouse.y)
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
    if (!ghostBuilding.enabled) return

    const isFree = isAreaFree(gridX, gridY, ...building.size)
    const color = isFree ? "rgba(0,255,0,0.4)" : "rgba(255,0,0,0.4)"
    const cellScreenSize = buildingCellSize * zoom

    for (let dx = 0; dx < building.size[0]; dx++) {
        for (let dy = 0; dy < building.size[1]; dy++) {
            const [wx, wy] = gridToWorld(gridX + dx, gridY + dy)

            const screenX = (canvas.width / 2) + (wx - x) * zoom
            const screenY = (canvas.height / 2) + (wy - y) * zoom

            ctx.fillStyle = color
            ctx.fillRect(screenX, screenY, cellScreenSize, cellScreenSize)
        }
    }
}

function buildTorch(location = false, type = "torchSmall") {
    ghostBuilding = {
        enabled: true,
        size: [1, 1],
        type: type,
        price: torchConfig[type].price,
    }
    if (location !== false) {
        placeBuilding(location.x, location.y, 1, 1, true)
    }
}

function buildRoad(x = 2, y = 2, location = false, type = "road") {
    ghostBuilding = {
        enabled: true,
        size: [x, y],
        type: type,
        price: x*y*4,
    }
    if (location !== false) {
        placeBuilding(location.x, location.y, x, y, true)
    }
}

let buildingsConfig = {
    "inn": {max: 10, w:12, h:8, price: 500},
    "potionShop": {max: 1, w:4, h:4, price: 200},
    "recruitmentHall": {max: 1, w:8, h:7, price: 500},
    "dungeonController":{max: 100, w:12, h:12, price: 0},
}

function buildBuilding(type = "",location = false) {
    if (!countBuildings(type,buildingsConfig[type].max)) {
        return false
    }
    ghostBuilding = {
        enabled: true,
        size: [buildingsConfig[type].w, buildingsConfig[type].h],
        type: type,
        price: buildingsConfig[type].price,
    }
    if (location !== false) {
        placeBuilding(location.x/buildingCellSize, location.y/buildingCellSize, buildingsConfig[type].w, buildingsConfig[type].h, true)
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

function removeRoadArea(x, y, w = 1, h = 1) {
    let removed = false
    for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
            const key = getCellKey(x + dx, y + dy)
            const cell = buildingGrid[key]
            if (cell && cell.type === "road") {
                delete buildingGrid[key]
                removed = true
            }
        }
    }
    return removed
}