const effectiveLevelMultiplier = {
    1: 1.00,
    2: 0.84,
    3: 0.73,
    4: 0.66,
    5: 0.60,
    6: 0.54,
    7: 0.50
}

function shouldReplace(oldLevel, oldQuality, newLevel, newQuality = 1) {
    let effectiveOld = oldLevel / effectiveLevelMultiplier[oldQuality]
    let effectiveNew = newLevel / effectiveLevelMultiplier[newQuality]
    return effectiveNew > effectiveOld
}

let iqc = {
    "dungeon": [0.95, 0.16, 0.03, 0.001, 0.00001],
    "quest": [0.25, 0.08, 0.01, 0.001, 0.00001],
    "raid": [0.95, 0.21, 0.07, 0.001, 0.00001],
}

function getRandomQuality(drop = "dungeon", luck = 1) {
    let rng = Math.random()
    if (rng < iqc[drop][4] * luck) return 6
    if (rng < iqc[drop][3] * luck) return 5
    if (rng < iqc[drop][2] * luck) return 4
    if (rng < iqc[drop][1] * luck) return 3
    if (rng < iqc[drop][0] * luck) return 2
    return 1
}



function getRandomSlot() {
    let rng = Math.random()
    if (rng < 0.11) {
        return "hands"
    } else if (rng < 0.22) {
        return "head"
    } else if (rng < 0.33) {
        return "chest"
    } else if (rng < 0.44) {
        return "legs"
    } else if (rng < 0.55) {
        return "feet"
    } else if (rng < 0.66) {
        return "finger"
    } else if (rng < 0.77) {
        return "trinket"
    } else {
        return "weapon"
    }
}

function getQualityColor(quality) {
    if (quality === 6) {
        return "#EE0303"
    } else if (quality === 5) {
        return "#FF8000"
    } else if (quality === 4) {
        return "#A335EE"
    } else if (quality === 3) {
        return "#0070DD"
    } else if (quality === 2) {
        return "#1EFF00"
    }
    return "#FFFFFF"
}

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
            return this.level * 3 / effectiveLevelMultiplier[this.quality]
        }
        return this.level / effectiveLevelMultiplier[this.quality]
    }
}