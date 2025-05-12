let pauseReset = [true]
let scrollVal = 0

let updateInput = function () {
    if (keys[" "]) {
        if (pauseReset[0]) {
            pauseReset[0] = false
            if (!gamePaused) {
                const btn = elements.pauseBtn
                pauseGame(0, btn)
                
            } else {
                const btn = elements.playBtn
                pauseGame(0, btn) 
                setGameSpeed(1, btn)
            }

        }
    } else {
        pauseReset[0] = true
    }


    if (ghostBuilding.enabled && ghostBuilding.type === "road") {
        if (keys["h"]) {
            changeRoadSize(1, 0)
        } else if (keys["u"]) {
            changeRoadSize(0, 1)
        } else if (keys["k"]) {
            changeRoadSize(-1, 0)
        } else if (keys["j"]) {
            changeRoadSize(0, -1)
        }
        keys["u"] = false
        keys["h"] = false
        keys["j"] = false
        keys["k"] = false
    }

    if (scrollVal !== 0) {
        if (scrollVal > 0) {
           
        } else {
      
        }
        scrollVal = 0
    }

}



let zoomScroll = function (event) {
    const el = document.elementFromPoint(mousePosition.x, mousePosition.y)
    if (el && (el === document.body || el === elements.canvasParticles)) {
        //event.preventDefault()
        let val = event.deltaY * -0.001 * zoom
        scrollVal = event.deltaY
        zoom += val
        if (zoom < 1.0) {
            zoom = 1.0
        } else if (zoom > 9) {
            zoom = 9
        }
    }
}
let keys = {}
document.body.onwheel = zoomScroll



window.addEventListener("keydown", e => {
    const key = e.key.toLowerCase()
    keys[key] = true
  
    if (key === "escape") {
        closeTopWindow()
    } else if (key === " " || key === "control") {
        e.preventDefault()
    } else if (key === "l") {
        if (mouseLight.radius === 0) {
            mouseLight.radius = 50
        } else {
            mouseLight.radius = 0
        }

    }

})

window.addEventListener("keyup", e => {
    const key = e.key.toLowerCase()
    keys[key] = false
})

let viewWidth = 2000 / 2
let viewHeight = 1000 / 2

let worldLeft = -viewWidth
let worldRight = viewWidth
let worldTop = -viewHeight
let worldBottom = viewHeight

function updateCamera() {
    let moveSpeed = 600 / gameSpeedP

    if (keys['w']) {
        y -= moveSpeed / zoom * progress
    }
    if (keys['s']) {
        y += moveSpeed / zoom * progress
    }
    if (keys['a']) {
        x -= moveSpeed / zoom * progress
    }
    if (keys['d']) {
        x += moveSpeed / zoom * progress
    }



 
    let halfW = (viewWidth) / zoom
    let halfH = (viewHeight) / zoom


    let minX = worldLeft + halfW
    let maxX = worldRight - halfW
    let minY = worldTop + halfH
    let maxY = worldBottom - halfH

    x = Math.max(minX, Math.min(maxX, x))
    y = Math.max(minY, Math.min(maxY, y))
}

let showNamesMouse = []

let mousePosition = {x: 0, y: 0}
let mousePosition2d = {x: 0, y: 0}

let onMouseUpdate = function(e) {
    mousePosition.x = e.clientX
    mousePosition.y = e.clientY

    updateTooltipLocation(mousePosition.x, mousePosition.y)
}

function mouseUpdate() {
    const rect = game2d.canvasElement.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    const canvasX = (mousePosition.x - rect.left) * dpr
    const canvasY = (mousePosition.y - rect.top) * dpr

    mousePosition2d.x = x + (canvasX - game2d.canvasW / 2) / zoom
    mousePosition2d.y = y + (canvasY - game2d.canvasH / 2) / zoom

    mouseLight.x = mousePosition2d.x
    mouseLight.y = mousePosition2d.y

    const el = document.elementFromPoint(mousePosition.x, mousePosition.y)
    if (el && (el === document.body || el === elements.canvasParticles || el === elements.canvasLights || el === elements.canvasGame || el === elements.canvasTerrain)) {
        let nearbyCells = getNearbyCells(mousePosition2d.x, mousePosition2d.y, 2)
        let nearbyObjects = []
        for (const cell of nearbyCells) {
            const key = `${cell.x},${cell.y}`
            const objects = grid[key] || []
            nearbyObjects.push(...objects)
        }
        if (!settings.drawHeroNames && keys['v']) {
            let newArr = []

            for (let obj of showNamesMouse) {
                obj.drawName = false
            }

            for (let obj of nearbyObjects) {
                if (obj instanceof Character) {
                    newArr.push(obj)
                    obj.drawName = true
                }
            }

            showNamesMouse.push(...newArr)
        } else {
            for (let obj of showNamesMouse) {
                obj.drawName = false
            }
            showNamesMouse = []
        }
        for (let obj of nearbyObjects) {
            if (isMouseOverObject(obj)) {
                if (obj instanceof Character) {
                    showTooltip(obj, "hero")
                } else if (obj instanceof Building) {
                    showTooltip(obj, "building")
                }
                return
            }
        }
    }
    hideTooltip()
}

document.addEventListener("contextmenu", function (e) {
    e.preventDefault()
})


setTimeout( ()=> {
    document.addEventListener('mousemove', onMouseUpdate)
    document.addEventListener("mousedown", function (e) {
        if (e.button !== 0 ) {
            e.preventDefault()
        }
      /*  if (keys['f']) {
            addSpellVisualEffects(mousePosition2d.x, mousePosition2d.y, 90, "fire", {duration: 0.1, size: 0, speed: 0, target: {x: mousePosition2d.x, y: mousePosition2d.y}, color: "#84e7ff", onEnd: {name: "explode", size: 1}, onRun: {dirToCentre: true,ignoreLifeSize: true, name: "fire", size: 0.2, life: 0.5, speed: 8, area: 2, texture: textures.particle_fire4, color1: "#84e7ff", color2: "#84e7ff", color3: "rgba(118, 139, 255, 0.1)"}})
            addLight(mousePosition2d.x, mousePosition2d.y, 20, "rgba(118, 139, 255, 1)", 0.6)
        } else {
            addSpellVisualEffects(mousePosition2d.x, mousePosition2d.y, 90, "fire", {duration: 0.1, size: 0, speed: 0, target: {x: mousePosition2d.x, y: mousePosition2d.y}, color: "#84e7ff", onEnd: {name: "explode", size: 1}, onRun: {dirToCentre: false,ignoreLifeSize: true, name: "fire", size: 0.2, life: 0.5, speed: 8, area: 2, texture: textures.particle_fire4, color1: "#84e7ff", color2: "#84e7ff", color3: "rgba(118, 139, 255, 0.1)"}})
            addLight(mousePosition2d.x, mousePosition2d.y, 20, "rgba(118, 139, 255, 1)", 0.6)
        }*/

        const el = document.elementFromPoint(mousePosition.x, mousePosition.y)
        if (el && (el === document.body || el === elements.canvasParticles || el === elements.canvasLights || el === elements.canvasGame || el === elements.canvasTerrain)) {

            if (ghostBuilding.enabled) {
                if (e.button === 0) {
                    placeBuilding(Math.floor(mousePosition2d.x / buildingCellSize), Math.floor(mousePosition2d.y / buildingCellSize), ...ghostBuilding.size)
                } else {
                    ghostBuilding.enabled = false
                }

            }


            let nearbyCells = getNearbyCells(mousePosition2d.x, mousePosition2d.y, 1)
            let nearbyObjects = []
            for (const cell of nearbyCells) {
                const key = `${cell.x},${cell.y}`
                const objects = grid[key] || []
                nearbyObjects.push(...objects)
            }
            for (let obj of nearbyObjects) {
                if (isMouseOverObject(obj)) {
                    if (obj instanceof Character ) {
                        open_heroinfo(undefined,false, false, obj.id)
                    } else if (obj instanceof Building) {
                        open_buildinginfo(undefined,false, false, obj.id)
                    }
                    return
                }
            }
        }
    })
},1000 )


