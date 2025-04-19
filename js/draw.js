let x = 0
let y = 0
let zoom = 1

function draw() {
    const dpr = window.devicePixelRatio || 1
    game2d.reset()

    for (let i = 0; i < characters.length; i++) {
        let size = 4 * zoom
        let worldX = characters[i].location.x
        let worldY = characters[i].location.y
        let x2d = (game2d.canvasW / 2) + (worldX - x) * zoom
        let y2d = (game2d.canvasH / 2) + (worldY - y) * zoom
        color = colors[characters[i].characterClass]
        game2d.drawCircle(x2d, y2d, size, color)
        if (characters[i].uiElements) {
            let baseFontSize = 9
            characters[i].uiElements.style.fontSize = `${baseFontSize * zoom}px`
            characters[i].uiElements.style.left = `${x2d/dpr}px`
            characters[i].uiElements.style.top = `${y2d/dpr - 5 * zoom}px`
        }
    }
    for (let i = 0; i < buildings.length; i++) {
        let sizeX = buildings[i].size[0] * zoom
        let sizeY = buildings[i].size[1] * zoom
        let worldX = buildings[i].location.x
        let worldY = buildings[i].location.y
        let x2d = (game2d.canvasW / 2) + (worldX - x) * zoom - (sizeX / 2)
        let y2d = (game2d.canvasH / 2) + (worldY - y) * zoom - (sizeY / 2)
        let color = "#997700"
        //TODO size+color
        game2d.drawRectStroke(x2d, y2d, sizeX, sizeY, color,2*zoom)
    }

    drawTerrain()
}