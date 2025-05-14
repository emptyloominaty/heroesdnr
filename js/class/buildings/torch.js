class Torch {
    constructor (x,y,torchSize) {
        this.x = x + (buildingCellSize/2)
        this.y = y + (buildingCellSize / 2)
        let radius = 40

        let size = 0.07
        let area = 0.007
        let speed = 2
        if (torchSize === "torchMedium") {
            radius = 100
            size = 0.15
            area = 0.015
            speed = 4
        } else if (torchSize === "torchLarge") {
            radius = 200
            size = 0.5
            area = 1
            speed = 6
        }

        this.particles = this.fire = addSpellVisualEffects(this.x, this.y, 90, "fire", {size: 0, speed: 0, target: {x: this.x, y: this.y}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {dirToCentre: false, ignoreLifeSize: false, name: "fire", size: size, life: 0.8, speed: speed, area: area, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius: radius, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})
    }
}

let torchConfig = {"torchSmall": {price: 8}, "torchMedium": {price: 15}, "torchLarge": {price: 50}}