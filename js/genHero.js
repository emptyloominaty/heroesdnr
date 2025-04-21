let globalCharId = 0

let getHeroRandom = function(level = 1) {

    let roll = rollClassRole()
    let characterClass = roll.class
    let role = roll.role
    let sex = rollSex(characterClass)


    let first
    if (sex==="male") {
        if (moidFirstNames.length !==0) {
            let rng = Math.floor(Math.random() * moidFirstNames.length)
            first = moidFirstNames.splice(rng,1)[0]
        } else {
            first = "YIKES"
        }
    } else {
        if (foidFirstNames.length !==0) {
        let rng = Math.floor(Math.random() * foidFirstNames.length)
        first = foidFirstNames.splice(rng,1)[0]
        } else {
            first = "YIKES"
        }
    }

    let name = first //`${first} ${last}`
    let age = 15+(Math.random()*45)

    //location edge
    let hero = new Hero(name,age, level, 100, characterClass, "tank", { x: 0, y: 5 })
    hero.role = role
    hero.sex = sex
    for (let i = 0; i<hero.skill.length; i++) {
        hero.skill[i] -= ((30-hero.age)/100)*Math.random()
        if (hero.skill[i]<0.1) {
            hero.skill[i] = 0.1
        } else if (hero.skill[i]>0.9) {
            hero.skill[i] = 0.9
        }
    }
    hero.updateStats()
    heroes.push(hero)
    return hero
}

function rollClassRole() {
    const flatChances = []
    for (const className in spawnChances) {
        const roles = spawnChances[className]
        for (const role in roles) {
            const weight = roles[role]
            if (weight > 0) {
                flatChances.push({ class: className, role, weight })
            }
        }
    }

    const totalWeight = flatChances.reduce((sum, entry) => sum + entry.weight, 0)
    const roll = Math.random() * totalWeight

    // Pick one based on the roll
    let cumulative = 0
    for (const entry of flatChances) {
        cumulative += entry.weight
        if (roll < cumulative) {
            return { class: entry.class, role: entry.role }
        }
    }
    return { class: "Warrior", role: "dps" }
}


let getSkillRandom = function() {
    const rand = Math.random()
    if (rand < 0.85) {
        let value
        do {
            const mean = 0.65
            const stdDev = 0.07
            const u1 = Math.random()
            const u2 = Math.random()
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
            value = mean + z * stdDev
        } while (value < 0.1 || value > 1.0)
        return value
    } else {
        return 0.1 + Math.random() * 0.9
    }
}

function rollSex(className, ) {
    let [maleRatio, femaleRatio] = femaleMaleClassRatio[className]
    let total = maleRatio + femaleRatio
    let roll = Math.random() * total
    return roll < maleRatio ? "male" : "female"
}