class Inn extends Building {
    heroesMax = 0
    heroes = 0
    heroesList = []
    upgradeCost = [0, 500, 1000, 2000, 3000]
    dailyCost = [10,30,50,70,100]
    prices = {eat: 2, sleep:5}

    constructor(location, level = 1) {
        super(location, level)
        this.type = "inn"
        this.levelUpdate()
    }

    levelUpdate() {
        if (this.level === 1) {
            this.size = [40,20]
            this.heroesMax = 5
        } else if (this.level === 2) {
            this.size = [40,30]
            this.heroesMax = 10
        } else if (this.level === 3) {
            this.size = [50,30]
            this.heroesMax = 15
        } else if (this.level === 4) {
            this.size = [50,40]
            this.heroesMax = 25
        } else if (this.level === 5) {
            this.heroesMax = 50
            this.size = [60,40]
        }
    }

    update() {

    }


}