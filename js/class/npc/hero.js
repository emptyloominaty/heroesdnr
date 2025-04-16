class Hero extends Character {
    skill = 1.0 //0.1-1
    dps = 1
    hps = 0
    armor = 1
    statistics = {dungeonSoloRuns: 0, dungeonGroupRuns: 0, raidRuns:0, goldEarned:0 }
    constructor(name, age, id, level, health, characterClass, role, location) {
        super(name, age, id, level, health, characterClass, role, location)
        characters.push(this)
        this.stDps = this.getSTDps()
        this.aoeDps = this.getAOEDps()
        this.dps = (this.stDps+this.aoeDps)/2
    }

    getSTDps() {
        let roleMultipliers = {
            dps: 2,
            tank: 1.2,
            healer: 0.6,
        }
        let classDpsMultipliers = {
            Warrior: 1
        }
        let classHealerMultipliers = {
             
        }
        let classTankMultipliers = {
            Warrior: 1,
            Druid: 1.2,
            Paladin: 1.1
        }
        let base = 10 + (this.level * 2)
        let weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
        let roleMultiplier = roleMultipliers[this.role] || 1
        return Math.floor((base * weaponBonus) * roleMultiplier)
    }
    getAOEDps() {
        let roleMultipliers = { 
            dps: 1,
            tank: 0.5,
            healer: 0.3,
        }
        //TODO: specMultiplier
        let base = 10 + (this.level * 2)
        let weaponBonus = 1 + ((this.inventory.weaponLevel-1) * 0.1)
        let roleMultiplier = roleMultipliers[this.role] || 1
        return Math.floor((base * weaponBonus) * roleMultiplier)
    }

    //TODO get hps + dtps?
}