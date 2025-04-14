let lastRender = 0
let progress = 16.666666666666666666666666666667


function loop(timestamp) {
    progress = timestamp - lastRender
    if (progress > 250) { //ms
        progress = 250
    }
    progress = progress / 1000
    time += progress

    update(progress)
    draw(progress)

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)