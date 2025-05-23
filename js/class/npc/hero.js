class Hero extends Character {
    skill = [1, 1, 1, 1, 1, 1, 1, 1, 1]
    startSkill = [1, 1, 1, 1, 1, 1, 1, 1, 1]


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
                this.skill[i] = 0.7
            }
        }
        for (let i = 0; i < this.startSkill.length; i++) {
            this.startSkill[i] = this.skill[i]
        }

        this.fatigueRate = this.fatigueRate * heroesConfig[this.characterClass][this.characterSpec].fMul
        this.hungerRate = this.hungerRate * heroesConfig[this.characterClass][this.characterSpec].hMul

        this.updateStats()
        this.hero = true
        this.updateItems()
    }

    updateItems() {
        this.itemsBonus = {dps: {base: 0, mul: 1}, dtps: {base: 0, mul: 1}}

        Object.keys(this.slots).forEach(key => {
            this.ilvl += this.slots[key].getilvl()
            if (key === "weapon") {
                this.itemsBonus.dps.base += this.slots[key].getBase()
                this.itemsBonus.dps.mul += this.slots[key].getMul()
            } else if (key === "finger" || key === "trinket") {
                let base = this.slots[key].getBase()
                let mul = this.slots[key].getMul()
                this.itemsBonus.dps.base += base / 2
                this.itemsBonus.dps.mul += mul / 2
                this.itemsBonus.dtps.base += base / 2
                this.itemsBonus.dtps.mul += mul / 2
            } else {
                this.itemsBonus.dtps.base += this.slots[key].getBase()
                this.itemsBonus.dtps.mul += this.slots[key].getMul()
            }
        })
        this.ilvl = this.ilvl / 10


        this.updateStats()
    }

    updateStats() {

        let intScaling = heroesConfig[this.characterClass][this.characterSpec].intS
        let intMultiplier = Math.pow(this.intelligence, intScaling)

        this.stDps = this.getSTDps(this.skill[0]) * intMultiplier
        this.aoeDps = this.getAOEDps(this.skill[1]) * intMultiplier
        this.stHps = this.getSTHps(this.skill[2]) * intMultiplier
        this.aoeHps = this.getAOEHps(this.skill[3]) * intMultiplier
        this.dps = (this.stDps+this.aoeDps)/2
        this.hps = (this.stHps+this.aoeHps)/2
        this.dtpsP = this.getDtpsP(this.skill[4]) * intMultiplier
        this.dtpsM = this.getDtpsM(this.skill[5]) * intMultiplier
        this.dtps = (this.dtpsP + this.dtpsM)/2
        this.speed = (4 + this.skill[8]) / 4.65 * heroesConfig[this.characterClass][this.characterSpec].speed
        this.critFailD = heroesConfig[this.characterClass][this.characterSpec].critFailD * intMultiplier
        this.escapeChance = heroesConfig[this.characterClass][this.characterSpec].escape * intMultiplier
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
        if (this.level === 100) {
            return
        }
        if (this.xp >= this.xpNeed) {
            this.level++
            this.xpNeed = Math.floor(100 * this.level * Math.pow(this.level, 1.2))
            let skillText = "<span style='font-size:8px;' >(" 
            let ignoreSkillText = true
            for (let i = 0; i < this.skill.length; i++) {
                let val = Math.random() * 0.05
                if (Math.random() < 0.04) {
                    this.skill[i] = updateSkill(this.skill[i], val, 0.4, (this.startSkill[i] + 0.7) / 2,1.0)
                    skillText += i + ": <span style='color:"+colors.log.success+"'>+" + Math.round(val * 100) + "</span>, "
                    ignoreSkillText = false
                } else if (Math.random() < 0.03) {
                    this.skill[i] = updateSkill(this.skill[i], -val, 0.4, (this.startSkill[i] + 0.7) / 2, 1.0)
                    skillText += i + ": <span style='color:" + colors.log.failure + "'>-" + Math.round(val * 100) + "</span>, "
                    ignoreSkillText = false
                }
                this.skill[i] = Math.max(0.35, Math.min(1, this.skill[i]))
            }


            if (Math.random() < 0.03) {
                this.loyalty = updateSkill(this.loyalty, 0.1 - (Math.random() * 0.2), 0.15, this.startLoyalty, 0.99) 
            }
            let dInt = this.startIntelligence - 1
            if (Math.random() < 0.03) {
                this.intelligence = updateSkill(this.intelligence, 0.035 - (Math.random() * 0.7), 0.5 + dInt, this.startIntelligence, 1.5 + dInt) 
            }
            if (Math.random() < 0.03) {
                this.sociability = updateSkill(this.sociability, 0.05 - (Math.random() * 0.1), 0.1, this.startSociability, 1.0) 
            }
            if (Math.random() < 0.03) {
                this.competitiveness = updateSkill(this.competitiveness, 0.005 - (Math.random() * 0.01), 0, 0.2, 1.0) 
            }
            if (Math.random() < 0.03) {
                this.adventurousness = updateSkill(this.adventurousness, 0.05 - (Math.random() * 0.1), 0.1, this.startAdventurousness, 1.0) 
            }
            this.loyalty = Math.max(0.1, Math.min(0.99, this.loyalty))
            this.sociability = Math.max(0.1, Math.min(1, this.sociability))
            this.intelligence = Math.max(0.45, this.intelligence)
            this.competitiveness = Math.max(0, Math.min(0.9, this.competitiveness))
            this.adventurousness = Math.max(0.1, Math.min(1, this.adventurousness))
            skillText += ")</span>"
            if (ignoreSkillText) {
                skillText = ""
            }
            this.addLog(messages.heroLog.levelUp(this.level,skillText))
            this.updateStats()
        } 
    }

    getSTDps(skill) {
        let base = 10 + (Math.pow(this.level,1.8)) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier = rolesConfig[this.role].dpsSt
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dpsSt
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)+1
    }
    getAOEDps(skill) {
        let base = 10 + (Math.pow(this.level,1.8)) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier =  rolesConfig[this.role].dpsAoe
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dpsAoe
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)+1
    }
    getSTHps(skill) {
        let base = 10 + (Math.pow(this.level,1.8)) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier =  rolesConfig[this.role].hpsSt
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].hpsSt
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)*2
    }
    getAOEHps(skill) {
        let base = 10 + (Math.pow(this.level,1.8)) + this.itemsBonus.dps.base
        let weaponBonus = this.itemsBonus.dps.mul
        let roleMultiplier =  rolesConfig[this.role].hpsAoe
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].hpsAoe
        return Math.round((base * weaponBonus) * roleMultiplier * specMultiplier * skill)*2
    }

    getDtpsP(skill) {
        let base = 5 + (Math.pow(this.level,1.8)) + this.itemsBonus.dtps.base
        let armorBonus = this.itemsBonus.dtps.mul
        let roleMultiplier = rolesConfig[this.role].dtpsP
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dtpsP
        return Math.round((base * armorBonus) * roleMultiplier * specMultiplier * skill)+1
    }
    getDtpsM(skill) {
        let base = 5 + (Math.pow(this.level,1.8)) + this.itemsBonus.dtps.base
        let armorBonus = ((1+this.itemsBonus.dtps.mul)/2)
        let roleMultiplier =  rolesConfig[this.role].dtpsM
        let specMultiplier = heroesConfig[this.characterClass][this.characterSpec].dtpsM
        return Math.round((base * armorBonus) * roleMultiplier * specMultiplier * skill)+1
    }

    leaveTown() {
        removeFromGrid(this)
        if (this.role === "dps") {
            damagedealers--
        } else if (this.role === "healer") {
            healers--
        } else if (this.role === "tank") {
            tanks--
        }
    }
}