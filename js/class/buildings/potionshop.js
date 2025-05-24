class PotionShop extends Building {
    upgradeCost = [0, 1000, 1000]
    dailyCost = [10, 30, 50]
    prices = {
        "Health": 20, "Mana": 20, "Agility": 40, "Strength": 40, "Resurrection":500 }
    tax = 0.15

    constructor(location, name, level = 1) {
        super(location, name, level)
        this.type = "potionShop"
        this.levelUpdate()
    }

    levelUpdate() {
        if (this.level === 1) {
            this.size = [12,8]
        } else if (this.level === 2) {
            this.size = [15,12]
        } else if (this.level === 3) {
            this.size = [17,14]
        } else if (this.level === 4) {
            this.size = [19,17]
        } else if (this.level === 5) {
            this.size = [20,20]
        }
    }

    getVal(i) {
        if (i === 0) {
            return "HP + MP"
        } else if (i === 1) {
            return "StrP + AgiP"
        } else if (i === 2) {
            return "ResP"
        } 
        
    }

    update() {

    }

    updateDay() {
        gold -= this.dailyCost[this.level-1]
    }


    buyPotion(potionName, hero, count) {
        this.buy(this.prices[potionName] * count, hero)
        if (hero.inventory.potions[potionName] === undefined) {
            hero.inventory.potions[potionName] = count
        } else {
            hero.inventory.potions[potionName] += count
        }
    }


}