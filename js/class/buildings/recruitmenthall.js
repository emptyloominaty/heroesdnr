class RecruitmentHall extends Building {
    heroesMax = 0
    heroesList = []
    maxLvl = 1
    maxNum = 3
    upgradeCost = [0, 500, 1000, 2000, 3000]
    dailyCost = [10,20,50,70,100]
    heroesNumLvl = [3, 4, 5, 6, 7]
    heroesMaxLvl = [1, 5, 10, 25, 50]

    constructor(location, name, level = 1) {
        super(location, name, level)
        this.type = "recruitmentHall"
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
        this.heroesList = []
        for (let i = 0; i < this.maxNum; i++) {
            this.heroesList.push(this.generateRandomHero())
        }
    }

    getVal(i) {
        return this.heroesNumLvl[i] + " lvl:" + this.heroesMaxLvl[i]
    }

    update() {

    }

    getUi() {
        let html = "<table>"
        html += `
        <tr class='heroListFirstRow' >
        <th>Class</th>
        <th>Spec</th>
        <th></th>
        <th>Level</th>
        <th>Avg Skill</th>
        <th>Price</th>
        </tr>
        `

        for (let i = 0; i < this.heroesList.length; i++) {
            let hero = this.heroesList[i]
            let classColor = colors[hero.characterClass] || "#FFFFFF"
            let bgColor = pSBC(0.55, classColor, "#111111")
            /*let name = ""
            if (hero.hero !== undefined) {
                name = hero.hero.name
            }*/

            html += `
        <tr class='heroListRow'  style='background-color: ${bgColor}' >
        <td>${hero.characterClass}</td>
        <td>${hero.spec}</td>
        <td>${hero.sex.charAt(0).toUpperCase() + Math.ceil(hero.age)}</td>
        <td>${hero.level}</td>
        <td>${Math.round(hero.avgSkill*100)/100}</td>
        <td>${Math.round(hero.price)}</td>
        <td class='btn_recruit' onclick='recruitHero(${this.id},${i},${hero.price});open_buildinginfo(undefined,true,false)' >Recruit</td>
        <td colspan='12' style='width: 0;padding:0;margin:0;border:0;'><div style='border:0; bottom: 0px;right: 0px;margin: 0px;' class='gradientWow2'></div></td>
        </tr>
        `
        }


        html += "</table>"
        return html
    }



    updateDay() {
        this.heroesList = []
        for (let i = 0; i < this.maxNum; i++) {
            this.heroesList.push(this.generateRandomHero())
        }

        if (currentWindow[3] ==="buildinginfo") {
            open_buildinginfo(undefined, true, true)
        }
        
        gold -= this.dailyCost[this.level-1]
    }

    

    generateRandomHero() {
        let hero = undefined
        let ih = false
        /*if (inactiveHeroes.length > 0) {
            if (Math.random() > 99) {
                ih = true
                hero = Math.ceil(Math.random() * inactiveHeroes.length)
            }
        }*/
        let age
        let roll
        let characterClass
        let spec
        let role
        let sex
        let skill
        let avgSkill = 0
        let level

        if (!ih) {
            age = generateAge()
            if (Math.random > 0.7) {
                roll = rollClassSpec2()
            } else {
                roll = rollClassSpec()
            }

            characterClass = roll.class
            spec = roll.spec
            role = spec
            sex = rollSex(characterClass, spec)
            skill = [1, 1, 1, 1, 1, 1, 1, 1, 1]
            level = Math.max(1, Math.ceil(Math.random() * this.maxLvl))

            for (let i = 0; i < skill.length; i++) {
                skill[i] = getSkillRandom()
                skill[i] -= ((30 - age) / 100) * Math.random()
                skill[i] += (level / 300) * Math.random()
            }
        } else {
            let timeDays = (((realtime - hero.realtime) / 720) * (1 / 365))
            age = hero.age + timeDays
            characterClass = hero.characterClass
            spec = hero.characterSpec
            role = spec
            sex = hero.sex
            skill = [...hero.skill]
            let addlvl = hero.level + Math.min(10, Math.ceil((timeDays / 100) / hero.level))
            level = hero.level + addlvl

            for (let i = 0; i < skill.length; i++) {
                skill[i] += (addlvl / 100) * Math.random()
            }
        }

        for (let i = 0; i < skill.length; i++) {
            if (skill[i] < 0.1) {
                skill[i] = 0.1
            } else if (skill[i] > 0.9) {
                skill[i] = 0.9
            }
            avgSkill += skill[i]
        }
        avgSkill = avgSkill / skill.length
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
        let priceClassMul = 10 / (getClassSpecPercentage(characterClass, spec))
        let price = 125 * level * priceSkillMul  * priceClassMul

        return {
            price, priceSkillMul, priceClassMul, characterClass, spec, avgSkill, age, roll, level, role, sex, skill, hero
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