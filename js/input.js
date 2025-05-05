let zoomScroll = function (event) {
    const el = document.elementFromPoint(mousePosition.x, mousePosition.y)
    if (el && (el === document.body || el === elements.canvasParticles)) {
        //event.preventDefault()
        let val = event.deltaY * -0.001 * zoom
        zoom += val
        if (zoom < 1.0) {
            zoom = 1.0
        } else if (zoom > 6.25) {
            zoom = 6.25
        }
    }
}
let keys = {}

document.body.onwheel = zoomScroll

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true)
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false)

let viewWidth = 2000 / 2
let viewHeight = 1000 / 2

let worldLeft = -viewWidth
let worldRight = viewWidth
let worldTop = -viewHeight
let worldBottom = viewHeight

function updateCamera() {
    let moveSpeed = 600 / gameSpeed

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


let mousePosition = {x:0,y:0}
let mousePosition2d = {x:0,y:0}
let onMouseUpdate = function(e) {
    mousePosition.x = e.pageX
    mousePosition.y = e.pageY

    mousePosition2d.x = ((x+((e.pageX)-(game2d.canvasW/2))/zoom))
    mousePosition2d.y = ((y+((e.pageY)-(game2d.canvasH/2))/zoom))

    updateTooltipLocation(mousePosition.x, mousePosition.y)

    const el = document.elementFromPoint(mousePosition.x, mousePosition.y)
    if (el && (el === document.body || el === elements.canvasParticles)) {
        let nearbyCells = getNearbyCells(mousePosition2d.x, mousePosition2d.y, 2)
        let nearbyObjects = []
        for (const cell of nearbyCells) {
            const key = `${cell.x},${cell.y}`
            const objects = grid[key] || []
            nearbyObjects.push(...objects)
        }
        for (let obj of nearbyObjects) {
            if (isMouseOverObject(obj)) {
                if (obj instanceof Character ) {
                    showTooltip(obj,"hero")
                } else if (obj instanceof Building) {
                    showTooltip(obj, "building")
                }
                return
            }
        }
    }
    hideTooltip()
}

setTimeout( ()=> {
    document.addEventListener('mousemove', onMouseUpdate)
    document.addEventListener("mousedown", function(e) {
        const el = document.elementFromPoint(mousePosition.x, mousePosition.y)
        if (el && (el === document.body || el === elements.canvasParticles)) {
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


