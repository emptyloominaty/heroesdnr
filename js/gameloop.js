let lastRender = 0
let progress = 16.666666666666666666666666666667
let gameSpeed = 1
let fps = 60


function loop(timestamp) {
    progress = timestamp - lastRender
    if (progress > 100) { //ms
        progress = 100
    } 
    fps = Math.round(1000 / progress * 10)/10
    progress = progress / 1000 * gameSpeed
    time += progress

    day = Math.floor(time / 720)

    let startTime = performance.now()
    update(progress)
    let endTime = performance.now()
    draw(progress)
    let endTime2 = performance.now()
    document.getElementById("debugUpdate").textContent = Math.round((endTime - startTime)*10)/10+" ms"
    document.getElementById("debugDraw").textContent = Math.round((endTime2 - endTime) * 10) / 10 + " ms"



    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)