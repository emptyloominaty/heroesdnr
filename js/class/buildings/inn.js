class Inn extends Building {
    heroesMax = 0
    heroes = 0
    heroesList = []
    upgradeCost = [0, 500, 1000, 2000, 3000]
    dailyCost = [10,30,50,80,120]
    prices = { eat: 2, sleep: 5 }
    heroesMaxatLvl = [10,20,30,40,50]

    constructor(location, name, level = 1) {
        super(location, name, level)
        this.type = "inn"
        this.levelUpdate()
    }

    levelUpdate() {
        this.heroesMax = this.heroesMaxatLvl[this.level - 1]
        if (this.level === 1) {
            this.size = [40,20]
        } else if (this.level === 2) {
            this.size = [40,30]
        } else if (this.level === 3) {
            this.size = [50,30]
        } else if (this.level === 4) {
            this.size = [50,40]
        } else if (this.level === 5) {
            this.size = [60,40]
        }
    }

    getVal(i) {
        return this.heroesMaxatLvl[i]+""
    }

    update() {
        this.heroes = this.heroesList.length
    }

    updateDay() {
        gold -= this.dailyCost[this.level-1]
    }



}