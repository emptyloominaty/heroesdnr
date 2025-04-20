let zoomScroll = function (event) {
    //event.preventDefault()
    let val = event.deltaY * -0.001 * zoom
    zoom += val
    if (zoom < 1.0) {
        zoom = 1.0
    } else if (zoom > 6) { 
        zoom = 6  
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
}

setTimeout( ()=> {
    document.addEventListener('mousemove', onMouseUpdate)
    document.addEventListener("mousedown", function(e) {
        for (let i = 0; i < buildings.length; i++) {
            if (isMouseOverObject(buildings[i])) {
                console.log(i)
                //TODO: open_buildinginfo ->updgrades

                return
            }
        }
        for (let i = 0; i < characters.length; i++) {
            if (isMouseOverObject(characters[i])) {
                open_heroinfo(false,false,i)
                return
            }
        }
    })

},1000 )


