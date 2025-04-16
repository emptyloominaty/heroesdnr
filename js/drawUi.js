function drawUi() {
    //header
    elements["gold"].textContent = Math.round(gold2)
    if (income >= 0) {
        elements["income"].textContent = "+"+Math.round(income * 10) / 10
    } else {
        elements["income"].textContent = Math.round(income * 10) / 10
    }
    elements["heroes"].textContent = heroes.length + "/" + heroesMax

    elements["time"].textContent = `${String(Math.floor((time % 720) / 30)).padStart(2, '0')}:${String(Math.floor((time % 30) * 2)).padStart(2, '0')} ${Math.floor(time / 720)}d`;

    windowsUpdate()

    //debug
    elements["debug1"].textContent = characters[0].name + ": " + characters[0].status + " - f:" + Math.round(characters[0].fatigue) + " - h:" + Math.round(characters[0].hunger)
    elements["debug2"].textContent = characters[1].name + ": " + characters[1].status + " - f:" + Math.round(characters[1].fatigue) + " - h:" + Math.round(characters[1].hunger)
    elements["debug3"].textContent = characters[2].name + ": " + characters[2].status + " - f:" + Math.round(characters[2].fatigue) + " - h:" + Math.round(characters[2].hunger)
    elements["debug4"].textContent = characters[3].name + ": " + characters[3].status + " - f:" + Math.round(characters[3].fatigue) + " - h:" + Math.round(characters[3].hunger)
}