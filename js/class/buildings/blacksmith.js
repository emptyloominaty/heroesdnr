class Blacksmith extends Building {
    upgradeCost = [0, 1000, 1000, 2000, 2000]
    dailyCost = [10, 30, 50, 100, 200]
    prices = {hands: 10, head: 10, chest: 10, legs: 10, feet: 10, weapon: 30, finger: 15, trinket: 15}
    maxLvl = [12,30,50,70,95]
    tax = 0.07

    constructor(location, name, level = 1) {
        super(location, name, level)
        this.type = "blacksmith"
        this.levelUpdate()
    }

    levelUpdate() {
        if (this.level === 1) {
            this.size = [15,10]
        } else if (this.level === 2) {
            this.size = [18,14]
        } else if (this.level === 3) {
            this.size = [22,18]
        } else if (this.level === 4) {
            this.size = [25,20]
        } else if (this.level === 5) {
            this.size = [30,30]
        }
    }

    getMaxIlvl() {
        return this.maxLvl[this.level-1]
    }

    getVal(i) {
        if (i === 0) {
            return "1-12"
        } else if (i === 1) {
            return "1-30"
        } else if (i === 2) {
            return "1-50"
        } else if (i === 3) {
            return "1-70"
        } else if (i === 4) {
            return "1-95"
        } 
        
    }

    update() {

    }

    updateDay() {
        gold -= this.dailyCost[this.level-1]
    }


    getPrice(slot, level, quality = 1) {
        return Math.pow(this.prices[slot] * level * quality, 1.4)
    }

    buyItem(slot, hero, level) {
        this.buy(this.getPrice(slot,level), hero)
        let sellItem = hero.slots[slot] 
        hero.inventory.gold += (this.getPrice(slot, sellItem.level, sellItem.quality)) / 5
        hero.itemlog.push({time: realtime, message: "New item (blacksmith): " + slot + " " + level + " lvl " + " lvl <span style='color: " + getQualityColor(1) + "'>" + getItemQuality(1)+"</span>"})
        hero.slots[slot] = new Item(slot, level, 1)
        hero.updateItems()
   
    }


}