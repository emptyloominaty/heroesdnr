class Inn extends Building {
    heroesMax = 0
    heroes = 0
    heroesList = []
    upgradeCost = [0, 500, 1000, 2000, 3000]
    prices = {eat: 2, sleep:5}
    constructor(location, level = 1) {
        super()
        this.location = location
        this.type = "inn"
        this.level = level
        this.levelUpdate()
    }

    levelUpdate() {
        if (this.level === 1) {
            this.heroesMax = 5
        } else if (this.level === 2) {
            this.heroesMax = 10
        } else if (this.level === 3) {
            this.heroesMax = 15
        } else if (this.level === 4) {
            this.heroesMax = 25
        } else if (this.level === 5) {
            this.heroesMax = 50
        }
    }

    update() {

    }


}