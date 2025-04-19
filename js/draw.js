let x = 0
let y = 0
let zoom = 1

const app = new PIXI.Application({
    width: 1920,
    height: 1080,
    backgroundColor: 0x108800,
    view: document.getElementById("canvaspx")
})


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
    drawLights()
}

function drawLights() {
    lights2d.reset()
    updateLighting()

    let lightCtx = lights2d.canvas



    /*game2d.canvas.globalCompositeOperation = 'screen'
    game2d.canvas.fillStyle = `rgb(${R}, ${G}, ${B}, ${shadowAlpha})`; // Set your color
    game2d.canvas.fillRect(0, 0, game2d.canvasElement.width, game2d.canvasElement.height)*/

    terrain2d.canvas.globalCompositeOperation = 'multiply'
    terrain2d.canvas.fillStyle = `rgb(${R}, ${G}, ${B}, ${1-shadowAlpha})`
    terrain2d.canvas.fillRect(-terrain2d.canvasElement.width/2-256, -terrain2d.canvasElement.height/2-256, terrain2d.canvasElement.width+512, terrain2d.canvasElement.height+512)


    //TODO: LIGHTS ARRAY
    if (sunDir>280 || sunDir<110) {
        terrain2d.canvas.globalCompositeOperation = 'screen'
        drawLightSource(50, 45, 100, 'rgba(255, 160, 80, 0.3)')
        drawLightSource(50, 45, 100, 'rgba('+Number(255-R)+', '+Number(255-G)+', '+Number(255-B)+', 0.3)')
    }

    game2d.canvas.globalCompositeOperation = 'source-over'
    terrain2d.canvas.globalCompositeOperation = "source-over"
    lightCtx.globalCompositeOperation = "source-over"

}



function drawLightSource(lightx, lighty, radius, color) {
    let x2d = (lightx - x) / zoom
    let y2d = (lighty - y) / zoom



    let lightCtx = terrain2d.canvas

    const gradient = lightCtx.createRadialGradient(x2d, y2d, 0, x2d, y2d, radius)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    lightCtx.fillStyle = gradient
    lightCtx.beginPath()
    lightCtx.arc(x2d, y2d, radius, 0, Math.PI * 2)
    lightCtx.fill()
}