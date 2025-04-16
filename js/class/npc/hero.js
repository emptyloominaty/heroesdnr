class Hero extends Character {
    skill = 1.0 //0.1-1
    dps = 1
    hps = 0
    dtps = 0
    statistics = {dungeonSoloRuns: 0, dungeonGroupRuns: 0, raidRuns:0, goldEarned:0 }
    constructor(name, age, id, level, health, characterClass, role, location, skill) {
        super(name, age, id, level, health, characterClass, role, location)
        characters.push(this)
        this.skill = skill
        this.stDps = this.getSTDps()
        this.aoeDps = this.getAOEDps()
        this.stHps = this.getSTHps()
        this.aoeHps = this.getAOEHps()
        this.dps = (this.stDps+this.aoeDps)/2
        this.hps = (this.stHps+this.aoeHps)/2
        this.dtpsP = this.getDtpsP()
        this.dtpsM = this.getDtpsM()
        this.dtps = this.dtpsP + this.dtpsM
    }

    updateStats() {
        this.stDps = this.getSTDps()
        this.aoeDps = this.getAOEDps()
        this.stHps = this.getSTHps()
        this.aoeHps = this.getAOEHps()
        this.dps = (this.stDps+this.aoeDps)/2
        this.hps = (this.stHps+this.aoeHps)/2
        this.dtpsP = this.getDtpsP()
        this.dtpsM = this.getDtpsM()
        this.dtps = this.dtpsP + this.dtpsM
    }


    gainGold(val) {
        this.inventory.gold += val
        this.statistics.goldEarned += val
    }

    gainXp(val) {
        this.xp += val
        if (this.xp>=this.xpNeed) {
            this.level++
            this.xpNeed = Math.floor(100 * this.level * Math.pow(this.level, 1.2))
            if (Math.random()>0.05) {
                this.skill += Math.random()*0.05
            } else if (Math.random()>0.04) {
                this.skill -= Math.random()*0.05
            }

            this.updateStats()
        }
    }

    getSTDps() {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
        let roleMultiplier = roleMultipliersDpsST[this.role] || 1
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDpsST[this.characterClass] || 1
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDpsST[this.characterClass] || 1
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDpsST[this.characterClass] || 1
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * this.skill)
    }
    getAOEDps() {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
        let roleMultiplier = roleMultipliersDpsAOE[this.role] || 1
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDpsAOE[this.characterClass] || 1
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDpsAOE[this.characterClass] || 1
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDpsAOE[this.characterClass] || 1
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * this.skill)
    }
    getSTHps() {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1
        let roleMultiplier = roleMultipliersDpsST[this.role] || 1
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersHpsST[this.characterClass] || 1
        } else if (this.role === "healer") {
            weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
            specMultiplier = classHealerMultipliersHpsST[this.characterClass] || 1
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersHpsST[this.characterClass] || 1
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * this.skill)
    }
    getAOEHps() {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1
        let roleMultiplier = roleMultipliersHpsAOE[this.role] || 1
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersHpsAOE[this.characterClass] || 1
        } else if (this.role === "healer") {
            weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
            specMultiplier = classHealerMultipliersHpsAOE[this.characterClass] || 1
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersHpsAOE[this.characterClass] || 1
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * this.skill)
    }


    getDtpsP() {
        let base = 5 + (this.level * 0.1)
        let armorBonus = 1 + ((this.inventory.armorLevel-1) * 0.2)
        let roleMultiplier = roleMultipliersDtpsP[this.role] || 1
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDtpsP[this.characterClass] || 1
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDtpsP[this.characterClass] || 1
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDtpsP[this.characterClass] || 1
        }
        return Math.floor((base * armorBonus) * roleMultiplier * specMultiplier * this.skill)
    }
    getDtpsM() {
        let base = 5 + (this.level * 0.1)
        let armorBonus = 1 + ((this.inventory.armorLevel-1) * 0.1)
        let roleMultiplier = roleMultipliersDtpsM[this.role] || 1
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDtpsM[this.characterClass] || 1
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDtpsM[this.characterClass] || 1
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDtpsM[this.characterClass] || 1
        }
        return Math.floor((base * armorBonus) * roleMultiplier * specMultiplier * this.skill)
    }
}