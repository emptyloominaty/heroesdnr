let elements = {
    "gold": document.getElementById("gold"),
    "income": document.getElementById("income"),
    "heroes": document.getElementById("heroes"),
    "travelers": document.getElementById("travelers"),
    "time": document.getElementById("time"),
    "charactersUi": document.getElementById("charactersUi"),
    "debug1": document.getElementById("debug1"),
    "debug2": document.getElementById("debug2"),
    "debug3": document.getElementById("debug3"),
    "debug4": document.getElementById("debug4"),
    "debug5": document.getElementById("debug5"),
}


function draw() {
    //header
    elements["gold"].textContent = Math.round(gold2)
    if (income >= 0) {
        elements["income"].textContent = "+"+Math.round(income * 10) / 10
    } else {
        elements["income"].textContent = Math.round(income * 10) / 10
    }
    elements["heroes"].textContent = heroes.length + "/" + heroesMax

    elements["time"].textContent = `${String(Math.floor((time % 720) / 30)).padStart(2, '0')}:${String(Math.floor((time % 30) * 2)).padStart(2, '0')} ${Math.floor(time / 720)}d`;


    //debug
    elements["debug1"].textContent = characters[0].name + ": " + characters[0].status + " - f:" + Math.round(characters[0].fatigue) + " - h:" + Math.round(characters[0].hunger)
    elements["debug2"].textContent = characters[1].name + ": " + characters[1].status + " - f:" + Math.round(characters[1].fatigue) + " - h:" + Math.round(characters[1].hunger)
    elements["debug3"].textContent = characters[2].name + ": " + characters[2].status + " - f:" + Math.round(characters[2].fatigue) + " - h:" + Math.round(characters[2].hunger)
    elements["debug4"].textContent = characters[3].name + ": " + characters[3].status + " - f:" + Math.round(characters[3].fatigue) + " - h:" + Math.round(characters[3].hunger)

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