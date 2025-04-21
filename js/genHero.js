let globalCharId = 0

let getHeroRandom = function(level = 1) {


    let roll = rollClassRole()
    let characterClass = roll.class
    let role = roll.role
    let sex = rollSex(characterClass)


    let name = ""
    if (sex==="male") { //TODO: A,B,C=hero0-...
        name = "Hero "+globalCharId+" M"
        /*if (moidFirstNames.length !==0) {
            let rng = Math.floor(Math.random() * moidFirstNames.length)
            name = moidFirstNames.splice(rng,1)[0]
        } else {*/
            //name = moidFirstNames2[Math.floor(Math.random() * moidFirstNames2.length)]+" "+surnames[Math.floor(Math.random() * surnames.length)]
        //}
    } else {
        name = "Hero "+globalCharId+" F"
        /*if (foidFirstNames.length !==0) {
            let rng = Math.floor(Math.random() * foidFirstNames.length)
            name = foidFirstNames.splice(rng,1)[0]
        } else {*/
            //name = foidFirstNames2[Math.floor(Math.random() * foidFirstNames2.length)]+" "+surnames[Math.floor(Math.random() * surnames.length)]
        //}
    }


    let age = 15+(Math.random()*45)

    //location edge
    let hero = new Hero(name,age, level, 100, characterClass, "tank", { x: 0, y: 5 })
    console.log("r: "+role+" c:"+characterClass+" - ("+tanks+" - "+healers+" - "+damagedealers+")")
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
    if (role === "tank") {
        tanks++
    } else if (role === "healer") {
        healers++
    } else if (role === "dps") {
        damagedealers++
    }
    hero.updateStats()
    heroes.push(hero)
    return hero
}

function rollClassRole() {
    let spawnChances2 = adjustSpawnChances(spawnChances)
    const flatChances = []
    for (const className in spawnChances2) {
        const roles = spawnChances2[className]
        for (const role in roles) {
            const weight = roles[role]
            if (weight > 0) {
                flatChances.push({ class: className, role, weight })
            }
        }
    }

    const totalWeight = flatChances.reduce((sum, entry) => sum + entry.weight, 0)
    const roll = Math.random() * totalWeight

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

function adjustSpawnChances(spawnChances) {
    const totalCurrent = tanks + healers + damagedealers
    const target = { tank: 1, healer: 1, dps: 3 }
    const totalTarget = target.tank + target.healer + target.dps

    const expected = {
        tank: (target.tank / totalTarget) * totalCurrent,
        healer: (target.healer / totalTarget) * totalCurrent,
        dps: (target.dps / totalTarget) * totalCurrent
    }

    // Compute role multipliers based on how underrepresented they are
    const bias = {
        tank: Math.max(0.1, expected.tank / Math.max(1, tanks)),
        healer: Math.max(0.1, expected.healer / Math.max(1, healers)),
        dps: Math.max(0.1, expected.dps / Math.max(1, damagedealers))
    }

    // Adjust the spawnChances using the role bias, keeping class distributions intact
    const adjusted = {}
    for (const className in spawnChances) {
        adjusted[className] = {}
        for (const role in spawnChances[className]) {
            const baseWeight = spawnChances[className][role]
            adjusted[className][role] = baseWeight * bias[role]
        }
    }

    return adjusted
}