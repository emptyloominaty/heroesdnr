function draw() {
    //canvas
    game2d.reset()

    for (let i = 0; i < characters.length; i++) {
        let size = 4
        let x2d = (game2d.canvasW / 2) + characters[i].location.x - size
        let y2d = (game2d.canvasH / 2) + characters[i].location.y - size
        color = colors[characters[i].characterClass]
        game2d.drawCircle(x2d, y2d, size, color)
        if (characters[i].uiElements) {
            characters[i].uiElements.style.left = `${x2d}px`
            characters[i].uiElements.style.top = `${y2d - 10}px`
        }
    }
    for (let i = 0; i < buildings.length; i++) {
        let sizeX = 15
        let sizeY = 15
        let x2d = (game2d.canvasW / 2) + buildings[i].location.x - (sizeX/2)
        let y2d = (game2d.canvasH / 2) + buildings[i].location.y - (sizeY/2)
        let color = "#997700"
        //TODO size+color
        game2d.drawRectStroke(x2d, y2d, sizeX, sizeY, color)
    }




}