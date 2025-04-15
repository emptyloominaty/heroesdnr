let elements = {
    "gold": document.getElementById("gold"),
    "income": document.getElementById("income"),
    "heroes": document.getElementById("heroes"),
    "travelers": document.getElementById("travelers"),
    "time": document.getElementById("time"),
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

    //canvas
    game2d.reset()

    for (let i = 0; i < characters.length; i++) {
        let x2d = (game2d.canvasW / 2) + characters[i].location.x
        let y2d = (game2d.canvasH / 2) + characters[i].location.y
        let color = "#d78080"
        //TODO: color = colors[character[i].class]
        game2d.drawCircle(x2d, y2d, 4, color)
    }
    for (let i = 0; i < buildings.length; i++) {
        let x2d = (game2d.canvasW / 2) + buildings[i].location.x
        let y2d = (game2d.canvasH / 2) + buildings[i].location.y
        let color = "#997700"
        //TODO size+color
        game2d.drawRectStroke(x2d, y2d, 15, 15, color)
    }




}