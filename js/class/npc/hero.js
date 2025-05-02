class Hero extends Character {
    skill = [1,1,1,1,1,1,1,1,1]


    dps = 1
    hps = 0
    dtps = 0
    critFailD = 1
    escapeChance = 1

    statistics = {dungeonSoloRuns: {success:0, escape:0, failure:0, criticalFailure:0}, dungeonGroupRuns: {success:0, escape:0, failure:0, criticalFailure:0}, raidRuns: {success:0, escape:0, failure:0, criticalFailure:0}, goldEarned:0 , questsCompleted: 0}
    constructor(name, age, level, health, characterClass, role, location, randomSkill = true, ignore = false) {
        super(name, age, level, health, characterClass, role, location, ignore)
        if (!ignore) {
            characters.push(this)
        }


        if (randomSkill) {
            for (let i = 0; i<this.skill.length; i++) {
                this.skill[i] = getSkillRandom()
            }
        } else {
            for (let i = 0; i<this.skill.length; i++) {
                this.skill[i] = 0.65
            }
        }

        this.fatigueRate = this.fatigueRate * heroesConfig[this.characterClass][this.characterSpec].fMul
        this.hungerRate = this.hungerRate * heroesConfig[this.characterClass][this.characterSpec].hMul

        this.updateStats()
        this.hero = true

    }

    updateStats() {
        this.updateEquippedItems()
        this.stDps = this.getSTDps(this.skill[0])
        this.aoeDps = this.getAOEDps(this.skill[1])
        this.stHps = this.getSTHps(this.skill[2])
        this.aoeHps = this.getAOEHps(this.skill[3])
        this.dps = (this.stDps+this.aoeDps)/2
        this.hps = (this.stHps+this.aoeHps)/2
        this.dtpsP = this.getDtpsP(this.skill[4])
        this.dtpsM = this.getDtpsM(this.skill[5])
        this.dtps = (this.dtpsP + this.dtpsM)/2
        this.speed = (4 + this.skill[8]) / 4.65 * heroesConfig[this.characterClass][this.characterSpec].speed
        this.critFailD = heroesConfig[this.characterClass][this.characterSpec].critFailD
        this.escapeChance = heroesConfig[this.characterClass][this.characterSpec].escape
    }


    gainGold(val) {
        this.inventory.gold += Number(val)
        this.statistics.goldEarned += Number(val)
    }

    gainRankPoints(val) {
        this.rankPoints += Number(val)
        if (this.rankPoints<0) {
            this.rankPoints = 0
        }
    }

    gainXp(val) {
        this.xp += val
        if (this.xp >= this.xpNeed) {
            this.level++
            this.xpNeed = Math.floor(100 * this.level * Math.pow(this.level, 1.2))
            let skillText = "" //TODO?
            for (let i = 0; i<this.skill.length; i++) {
                if (Math.random()<0.04*(0.65/this.skill[i])) {
                    this.skill[i] += Math.random()*0.05
                } else if (Math.random()<0.03*(this.skill[i]/0.65)) {
                    this.skill[i] -= Math.random()*0.05
                }
                this.skill[i] = Math.max(0.1, Math.min(1, this.skill[i]))
            }
            this.addLog(messages.heroLog.levelUp(this.level))
            this.updateStats()
        } 
    }

    getSTDps(skill) {
        let base = 10 + (this.level * 2) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier = rolesConfig[this.role].dpsSt
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dpsSt
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)+1
    }
    getAOEDps(skill) {
        let base = 10 + (this.level * 2) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier =  rolesConfig[this.role].dpsAoe
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dpsAoe
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)+1
    }
    getSTHps(skill) {
        let base = 10 + (this.level * 2) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier =  rolesConfig[this.role].hpsSt
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].hpsSt
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)
    }
    getAOEHps(skill) {
        let base = 10 + (this.level * 2) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier =  rolesConfig[this.role].hpsAoe
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].hpsAoe
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)
    }

    getDtpsP(skill) {
        let base = 5 + (this.level * 1.5) + this.itemsBonus.dtps.base
        let armorBonus = this.itemsBonus.dtps.mul
        let roleMultiplier = rolesConfig[this.role].dtpsP
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dtpsP
        return Math.round((base * armorBonus) * roleMultiplier * specMultiplier * skill)+1
    }
    getDtpsM(skill) {
        let base = 5 + (this.level * 1.5) + this.itemsBonus.dtps.base
        let armorBonus = ((1+this.itemsBonus.dtps.mul)/2)
        let roleMultiplier =  rolesConfig[this.role].dtpsM
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dtpsM
        return Math.round((base * armorBonus) * roleMultiplier * specMultiplier * skill)+1
    }

    updateEquippedItems() {
        let il = 0
        let base = 0
        let mul = 0
        let ia = 0
        let iw = 0
        Object.entries(this.slots).forEach(([key, value]) => {
            il += value.level
            if (key==="weapon") {
                iw++
                this.itemsBonus.dps.base = value.getBase()
                this.itemsBonus.dps.mul = 1 + value.getMul()
            } else {
                ia++
                base += value.getBase()
                mul += value.getMul()
            }
        })
        this.ilvl = il / (ia+iw)
        this.itemsBonus.dtps.base = base / ia
        this.itemsBonus.dtps.mul = 1 + (mul / ia)
    }


    leaveTown() {
        if (this.role === "dps") {
            damagedealers--
        } else if (this.role === "healer") {
            healers--
        } else if (this.role === "tank") {
            tanks--
        }
    }
}