class Item {
    slot = "head" //head, chest, legs, feet, hands, weapon
    level = 1
    quality = 1 //1-5

    constructor(slot, level = 1, quality = 1) {
        this.slot = slot
        this.level = level
        this.quality = quality
    }


    getBase() {
        return this.level * (1+(this.quality*0.02))
    }

    getMul() {
        return ((this.level*0.05))+((this.quality*0.025)-0.025)
    }

    getPrice() {
        return 5 + ((4*this.level) * this.quality)
    }

}