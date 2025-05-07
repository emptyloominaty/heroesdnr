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
    constructor(location, name, level = 1) {
        this.location = location
        this.level = level
        this.name = name
        this.id = globalBuildingId
        buildingsMap[this.id] = this
        globalBuildingId++
        addToGrid(this)
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
        if (this.level<this.upgradeCost.length && gold>this.upgradeCost[this.level-1]) {
            this.level++
            gold -= this.upgradeCost[this.level - 1]
            this.levelUpdate()
        }
    }

    buy(val, hero) {
        hero.inventory.gold -= val
        gold += val/2
    }

}