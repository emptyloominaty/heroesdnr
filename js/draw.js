let x = 0
let y = 0
let zoom = 1

function draw() {
    const dpr = window.devicePixelRatio || 1
    game2d.reset()

    //drawGrid() //DONT
    const [gx, gy] = mouseToGrid(mousePosition2d)
    drawGhost(gx, gy, ghostBuilding)

    for (let i = 0; i < characters.length; i++) {
        let size = characters[i].size[0] / 2 * zoom 
        let worldX = characters[i].location.x
        let worldY = characters[i].location.y
        let x2d = (game2d.canvasW / 2) + (worldX - x) * zoom
        let y2d = (game2d.canvasH / 2) + (worldY - y) * zoom
        let color = colors[characters[i].characterClass]


        if (settings.shadows === 1) {
            game2d.canvas.fillStyle = 'rgba(0, 0, 0, '+(shadowAlpha-0.1)+')'
            game2d.canvas.beginPath()
            game2d.canvas.ellipse(x2d + lengthdir_x(size*shadowLen,sunDir+45), y2d+lengthdir_y(size*shadowLen,sunDir+45), size, size, 0, 0, Math.PI * 2)
            game2d.canvas.fill()
        }

        game2d.drawCircle(x2d, y2d, size, color)

        if (settings.drawHeroNames || characters[i].drawName) {
            characters[i].uiElements.style.display = "block"
            if (settings.lights) {
                characters[i].uiElements.style.color = darkenColor(color, shadowAlpha*2.5)
            } else {
                characters[i].uiElements.style.color = color
            }
            let cssX = x2d / dpr;
            let cssY = y2d / dpr;
            let cssZoom = zoom / dpr;
            characters[i].uiElements.style.transform = `translate(-50%, -100%) translate(${cssX}px, ${cssY - 5 * cssZoom}px) scale(${cssZoom})`
            //characters[i].uiElements.style.transform = `translate(-50%, -100%) translate(${x2d}px, ${y2d - 5 * zoom}px) scale(${zoom})`
        } else {
            characters[i].uiElements.style.display = "none"
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
        if (settings.shadows === 1) {
           drawBuildingShadow(x2d,y2d,sizeX,sizeY)
        }

        game2d.drawRectStroke(x2d, y2d, sizeX, sizeY, color,2*zoom)
    }



    drawParticles()
    drawTerrain()
    drawLights()

}

function drawParticles() {
    particles2d.reset()
    for (let i = 0; i<spellVisualEffects.length; i++) {
        if (spellVisualEffects[i]!==undefined) {
            spellVisualEffects[i].update()
        }
    }


    let spellParticlestoRender = spellParticles.filter(p => p !== undefined)
    spellParticlestoRender.sort((a, b) => b.data.timeCreated - a.data.timeCreated)

    for (let i = 0; i<spellParticlestoRender.length; i++) {
        if (spellParticlestoRender[i]!==undefined) {
            spellParticlestoRender[i].update()
        }
    }
    game2d.canvas.shadowBlur = 0
    particles2d.canvas.shadowBlur = 0
}

function drawLights() {
    lights2d.reset()
    if (!settings.lights) {
        return
    }
    updateLighting()
    lights2d.canvas.fillStyle = `rgb(${R}, ${G}, ${B}, ${1})`
    lights2d.canvas.fillRect(0, 0, lights2d.canvasElement.width, lights2d.canvasElement.height)

    lights2d.canvas.globalCompositeOperation = "screen"
    for (let i = 0; i < lights.length; i++) {
        let light = lights[i]
        if (light === undefined) {
            continue
        }
        drawLightSource(light.x, light.y, light.radius, light.color)
        light.update()
    }
    lights2d.canvas.globalCompositeOperation = 'source-over'
}



function drawLightSource(lightx, lighty, radius, color) {
    let x2d = (lights2d.canvasW / 2) + (lightx - x) * zoom
    let y2d = (lights2d.canvasH / 2) + (lighty - y) * zoom

    let lightCtx = lights2d.canvas

    const gradient = lightCtx.createRadialGradient(x2d, y2d, 0, x2d, y2d, radius * zoom)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    lightCtx.fillStyle = gradient
    lightCtx.beginPath()
    lightCtx.arc(x2d, y2d, radius * zoom, 0, Math.PI * 2)
    lightCtx.fill()
}