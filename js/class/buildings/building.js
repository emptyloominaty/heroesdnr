let globalBuildingId = 0

class Building {
    location = {x:0, y:0}
    type = ""
    upgradeCost = [0,0,0,0,0]
    prices = {}
    dailyCost = [0,0,0,0,0]
    size = [30, 30]
    name = ""
    id = 0
    profit = 0
    tax = 0.2
    
    constructor(location, name, level = 1) {
        this.location = location
        this.level = level
        this.name = name
        this.id = globalBuildingId
        buildingsMap[this.id] = this
        globalBuildingId++
        addToGrid(this)
        this.fire = addSpellVisualEffects(this.location.x, this.location.y, 90, "fire", {size: 0, speed: 0, target: {x: 50, y: -85}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {dirToCentre: false,ignoreLifeSize: false, name: "fire", size: 0.1, life: 0.8, speed: 3, area: 0.01, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius:100,color:'rgba(255, 160, 80, 1)',duration:-1,decTimer:0.2})
    }

    update() {
    }
    updateDay() {
    }

    levelUpdate() {
    }

    getUi() {
        return ""
    }

    getVal() {
        return ""
    }

    upgrade() {
        if (this.level<this.upgradeCost.length && gold>this.upgradeCost[this.level]) {
            this.level++
            gold -= this.upgradeCost[this.level - 1]
            this.levelUpdate()
        }
    }

    buy(val, hero) {
        hero.inventory.gold -= val
        gold += val * this.tax
        this.profit += val * this.tax
    }

}