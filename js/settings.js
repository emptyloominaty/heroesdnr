let settings = {
    particleVisuals: 3,   //0/1-2-3-4-5
    particleGlow: false,
    terrain: 0,
    lights: false,
    particleTimer: 0.025,
    drawHeroNames: false,
    maxLogSize: 50,
    maxLogSizeDungeons: 100,
    maxLogSizeDeadCharacters: 1000,
    maxSizeInactiveHeroes: 1000,
    debugSpeeds: true,     //elements.btn_speed50 btn_speed100
    skipMenu: true,
}

let settingsUpdate = function () {
    if (settings.debugSpeeds) {
        elements.btn_speed50.style.display = "inline-block"
        elements.btn_speed100.style.display = "inline-block"
    }
}

settingsUpdate()