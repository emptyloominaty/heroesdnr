let avgFPSA = []
let avgFPS
function drawUi() {
    //header
    elements["gold"].textContent = Math.round(gold2)
    if (income >= 0) {
        elements["income"].textContent = "+"+Math.round(income * 10) / 10
        elements["income"].style.color = "#c6f5b0"
    } else {
        elements["income"].textContent = Math.round(income * 10) / 10
        elements["income"].style.color = "#f5b0b2"
    }
    elements["heroes"].textContent = heroes.length + "/" + heroesMax

    realtime = time + 240
    elements["time"].textContent = `${String(Math.floor((realtime % 720) / 30)).padStart(2, '0')}:${String(Math.floor((realtime % 30) * 2)).padStart(2, '0')} ${Math.floor(realtime / 720)}d`;

    windowsUpdate()

    updateTooltip()

    //debug
    avgFPSA.push(fps)
    if (avgFPSA.length>30) {
        avgFPSA.shift()
    }
    avgFPS = avgFPSA.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/30




    elements["debug1"].textContent = "FPS: "+Math.round(fps)
    elements["debug2"].textContent = "Avg: "+Math.round(avgFPS)
    elements["debug3"].textContent = "Min: "+Math.round( Math.min(...avgFPSA))
    elements["debug4"].textContent = "x:"+mousePosition2d.x+" y:"+mousePosition2d.y+" "

    //elements["debug4"].textContent = "sdir"+Math.round(sunDir)+" r: "+Math.round(R)+" g:"+Math.round(G)+" b:"+Math.round(B)+" a"+shadowAlpha
}