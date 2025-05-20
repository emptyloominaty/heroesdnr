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
        if (this.slot === "weapon") {
            return this.level * (3 + (this.quality * 0.06))
        }
        return this.level * (1+(this.quality*0.02))
    }

    getMul() {
        if (this.slot === "weapon") {
            return ((this.level * 0.30)) * (this.quality * 0.06)
        } else {
            return ((this.level * 0.10)) * (this.quality * 0.02)
        }
       
    }

    getilvl() {
        if (this.slot === "weapon") {
            return this.level*3
        }
        return this.level
    }
}