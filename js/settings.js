let settings = {
    particleVisuals: 2,   //0-1-2-3
    particleGlow: false,
    terrain: 3,
    lights: true,
    shadows: 0,
    particleTimer: 0.025,
    drawHeroNames: false,
    maxLogSize: 150, //hero
    maxLogSizeDungeons: 100,
    maxLogSizeDeadCharacters: 1000,
    maxSizeInactiveHeroes: 1000,
    debugSpeeds: true,     //elements.btn_speed50 btn_speed100
    skipMenu: true,
    gameSpeedMode: "Precise",  //["Performance","Precise"]
}

let settingsUpdate = function () {
    if (settings.debugSpeeds) {
        elements.btn_speed50.style.display = "inline-block"
        elements.btn_speed100.style.display = "inline-block"
    } else {
        elements.btn_speed50.style.display = "none"
        elements.btn_speed100.style.display = "none"
    }
}

settingsUpdate()