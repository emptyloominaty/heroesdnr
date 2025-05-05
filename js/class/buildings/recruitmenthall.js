class RecruitmentHall extends Building {
    heroesMax = 0
    heroesList = []
    maxLvl = 1
    maxNum = 3
    upgradeCost = [0, 500, 1000, 2000, 3000]
    dailyCost = [10,30,50,80,120]
    heroesNumLvl = [3, 4, 5, 6, 7]
    heroesMaxLvl = [1, 5, 10, 25, 50]

    constructor(location, name, level = 1) {
        super(location, name, level)
        this.type = "recruitment hall"
        this.levelUpdate()
    }

    levelUpdate() {
        this.maxNum = this.heroesNumLvl[this.level - 1]
        this.maxLvl = this.heroesMaxLvl[this.level - 1]
        if (this.level === 1) {
            this.size = [20,15]
        } else if (this.level === 2) {
            this.size = [25, 20]
        } else if (this.level === 3) {
            this.size = [30, 20]
        } else if (this.level === 4) {
            this.size = [35, 30]
        } else if (this.level === 5) {
            this.size = [40, 35]
        }
    }

    getVal(i) {
        return this.maxNum[i] + " lvl:" + this.maxLvl
    }

    update() {

    }

    updateDay() {
        //TODO: new heroes

        gold -= this.dailyCost[this.level-1]
    }

    generateRandomHero() {
        let age = generateAge()
        let roll 
        if (Math.random > 0.7) {
            roll = rollClassSpec2()
        } else {
            roll = rollClassSpec()
        }


        let characterClass = roll.class
        let spec = roll.spec
        let role = spec
        let sex = rollSex(characterClass, spec)
        let skill = [1, 1, 1, 1, 1, 1, 1, 1, 1]
        let avgSkill = 0

        for (let i = 0; i < skill.length; i++) {
            skill[i] = getSkillRandom()
        }

        for (let i = 0; i < skill.length; i++) {
            skill[i] -= ((30 - age) / 100) * Math.random()
            if (skill[i] < 0.1) {
                skill[i] = 0.1
            } else if (skill[i] > 0.9) {
                skill[i] = 0.9
            }
            avgSkill += skill[i]
        }
        avgSkill = avgSkill / skill.length
        let level = Math.max(1,Math.ceil(Math.random()*this.maxLvl)) 


        let priceClassMul = 10 / (getClassSpecPercentage(characterClass,spec))

        let priceSkillMul = 1
        if (role === "dps") {
            priceSkillMul = (this.getSkillPrice(skill[0]) + this.getSkillPrice(skill[1])) * 5
            priceSkillMul += (this.getSkillPrice(skill[2]) + this.getSkillPrice(skill[3]))
                + (this.getSkillPrice(skill[4]) + this.getSkillPrice(skill[5]))
                + (this.getSkillPrice(skill[6]) + this.getSkillPrice(skill[7]))
                + this.getSkillPrice(skill[8])
        } else if (role === "healer") {
            priceSkillMul = (this.getSkillPrice(skill[2]) + this.getSkillPrice(skill[3])) * 3
            priceSkillMul += ((this.getSkillPrice(skill[0]) + this.getSkillPrice(skill[1])) * 2)
                + (this.getSkillPrice(skill[2]) + this.getSkillPrice(skill[3]))
                + (this.getSkillPrice(skill[4]) + this.getSkillPrice(skill[5]))
                + (this.getSkillPrice(skill[6]) + this.getSkillPrice(skill[7]))
                + this.getSkillPrice(skill[8])
        } else if (role === "tank") {
            priceSkillMul = (this.getSkillPrice(skill[4]) + this.getSkillPrice(skill[5])) * 3
            priceSkillMul += ((this.getSkillPrice(skill[0]) + this.getSkillPrice(skill[1])) * 2)
                + (this.getSkillPrice(skill[2]) + this.getSkillPrice(skill[3]))
                + (this.getSkillPrice(skill[4]) + this.getSkillPrice(skill[5]))
                + (this.getSkillPrice(skill[6]) + this.getSkillPrice(skill[7]))
                + this.getSkillPrice(skill[8])
        }
        priceSkillMul = priceSkillMul / 19
        let price = 125 * level * priceSkillMul  * priceClassMul

        return {
            price, priceSkillMul, priceClassMul, characterClass, spec, avgSkill, age, roll, level, role, sex, skill
            }
    }

    
    getSkillPrice(x) {
        if (x <= 0.65) {
            const a = (1 - 0.2) / (0.65 - 0.1)
            const b = 0.2 - a * 0.1
            return a * x + b
        }
        const A = 100
        const B = 2
        const C = 1

        return A * Math.pow(x - 0.65, B) + C
    }


}