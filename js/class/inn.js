class Inn extends Building {
    heroesMax = 0
    heroes = 0
    heroesList = []
    constructor(level = 1) {
        super()
        this.type = "inn"
        this.level = level
        this.levelUpdate()
    }

    levelUpdate() {
        if (this.level == 1) {
            this.heroesMax = 5
        } else if (this.level == 2) {
            this.heroesMax = 10
        } else if (this.level == 3) {
            this.heroesMax = 15
        } else if (this.level == 4) {
            this.heroesMax = 25
        } else if (this.level == 5) {
            this.heroesMax = 50
        }
    }

    run() {

    }


}