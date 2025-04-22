class Building {
    location = {x:0, y:0}
    type = ""
    upgradeCost = [0,0,0,0,0]
    prices = {}
    dailyCost = [0,0,0,0,0]
    size = [30, 30]
    name = ""
    constructor(location, name, level = 1) {
        this.location = location
        this.level = level
        this.name = name

    }

    update() {

    }
    updateDay() {

    }
}