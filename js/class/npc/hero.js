class Hero extends Character {
    skill = [1,1,1,1,1,1,1,1,1]


    dps = 1
    hps = 0
    dtps = 0
    statistics = {dungeonSoloRuns: 0, dungeonGroupRuns: 0, raidRuns:0, goldEarned:0 }
    constructor(name, age, level, health, characterClass, role, location) {
        super(name, age, level, health, characterClass, role, location)
        characters.push(this)

        for (let i = 0; i<this.skill.length; i++) {
            this.skill[i] = getSkillRandom()
        }
        this.speed = (4+this.skill[8])/4.65

        this.stDps = this.getSTDps(this.skill[0])
        this.aoeDps = this.getAOEDps(this.skill[1])
        this.stHps = this.getSTHps(this.skill[2])
        this.aoeHps = this.getAOEHps(this.skill[3])
        this.dps = (this.stDps+this.aoeDps)/2
        this.hps = (this.stHps+this.aoeHps)/2
        this.dtpsP = this.getDtpsP(this.skill[4])
        this.dtpsM = this.getDtpsM(this.skill[5])
        this.dtps = (this.dtpsP + this.dtpsM)/2
    }

    updateStats() {
        this.stDps = this.getSTDps(this.skill[0])
        this.aoeDps = this.getAOEDps(this.skill[1])
        this.stHps = this.getSTHps(this.skill[2])
        this.aoeHps = this.getAOEHps(this.skill[3])
        this.dps = (this.stDps+this.aoeDps)/2
        this.hps = (this.stHps+this.aoeHps)/2
        this.dtpsP = this.getDtpsP(this.skill[4])
        this.dtpsM = this.getDtpsM(this.skill[5])
        this.dtps = (this.dtpsP + this.dtpsM)/2
        this.speed = (4+this.skill[8])/4.65
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
            for (let i = 0; i<this.skill.length; i++) {
                if (Math.random()<0.04*(0.65/this.skill[i])) {
                    this.skill[i] += Math.random()*0.05
                } else if (Math.random()<0.03*(this.skill[i]/0.65)) {
                    this.skill[i] -= Math.random()*0.05
                }
                this.skill[i] = Math.max(0.1, Math.min(1, this.skill[i]))
            }
            this.updateStats()
        }
    }

    getSTDps(skill) {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
        let roleMultiplier = roleMultipliersDpsST[this.role]
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDpsST[this.characterClass]
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDpsST[this.characterClass]
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDpsST[this.characterClass]
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * skill)
    }
    getAOEDps(skill) {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
        let roleMultiplier = roleMultipliersDpsAOE[this.role]
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDpsAOE[this.characterClass]
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDpsAOE[this.characterClass]
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDpsAOE[this.characterClass]
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * skill)
    }
    getSTHps(skill) {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1
        let roleMultiplier = roleMultipliersHpsST[this.role]
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersHpsST[this.characterClass]
        } else if (this.role === "healer") {
            weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
            specMultiplier = classHealerMultipliersHpsST[this.characterClass]
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersHpsST[this.characterClass]
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * skill)
    }
    getAOEHps(skill) {
        let base = 10 + (this.level * 2)
        let weaponBonus = 1
        let roleMultiplier = roleMultipliersHpsAOE[this.role]
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersHpsAOE[this.characterClass]
        } else if (this.role === "healer") {
            weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
            specMultiplier = classHealerMultipliersHpsAOE[this.characterClass]
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersHpsAOE[this.characterClass]
        }
        return Math.floor((base * weaponBonus) * roleMultiplier * specMultiplier * skill)
    }


    getDtpsP(skill) {
        let base = 5 + (this.level * 0.2)
        let armorBonus = 1 + ((this.inventory.armorLevel-1) * 0.5)
        let roleMultiplier = roleMultipliersDtpsP[this.role]
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDtpsP[this.characterClass]
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDtpsP[this.characterClass]
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDtpsP[this.characterClass]
        }
        return Math.floor((base * armorBonus) * roleMultiplier * specMultiplier * skill)
    }
    getDtpsM(skill) {
        let base = 5 + (this.level * 0.2)
        let armorBonus = 1 + ((this.inventory.armorLevel-1) * 0.1)
        let roleMultiplier = roleMultipliersDtpsM[this.role]
        let specMultiplier = 1
        if (this.role === "dps") {
            specMultiplier = classDpsMultipliersDtpsM[this.characterClass]
        } else if (this.role === "healer") {
            specMultiplier = classHealerMultipliersDtpsM[this.characterClass]
        } else if (this.role === "tank") {
            specMultiplier = classTankMultipliersDtpsM[this.characterClass]
        }
        return Math.floor((base * armorBonus) * roleMultiplier * specMultiplier * skill)
    }
}