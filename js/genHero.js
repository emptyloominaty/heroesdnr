let globalCharId = 0


let recruitHero = function (buildingId, heroId, price = 0) {
    if (price > gold) {
        return false
    }
    gold -= price
    let h = buildingsMap[buildingId].heroesList[heroId]
    let name = "Hero " + globalCharId

    let location = {x: buildingsMap[buildingId].location.x - 15 + Math.random() * 30, y: buildingsMap[buildingId].location.y - 15 + Math.random() * 30}

    let hero = new Hero(name, h.age, h.level, 100, h.characterClass, h.role, location)

    Object.keys(hero.slots).forEach(key => {
        hero.slots[key] = new Item(key,h.level,1)
    })

    hero.sex = h.sex
    for (let i = 0; i < hero.skill.length; i++) {
        hero.skill[i] = h.skill[i]
    }
    if (h.role === "tank") {
        tanks++
    } else if (h.role === "healer") {
        healers++
    } else if (h.role === "dps") {
        damagedealers++
    }
    hero.updateStats()
    heroes.push(hero)
    buildingsMap[buildingId].heroesList.splice(heroId, 1)

    return hero
}


let spawnHeroRandom = function(level = 1) {


    let roll = rollClassSpec()
    let characterClass = roll.class
    let spec = roll.spec
    let role = spec //TODO
    let sex = rollSex(characterClass,spec)


    let name = ""
    if (sex==="male") { //TODO: A,B,C=hero0-...
        name = "Hero "+globalCharId
        /*if (moidFirstNames.length !==0) {
            let rng = Math.floor(Math.random() * moidFirstNames.length)
            name = moidFirstNames.splice(rng,1)[0]
        } else {*/
            //name = moidFirstNames2[Math.floor(Math.random() * moidFirstNames2.length)]+" "+surnames[Math.floor(Math.random() * surnames.length)]
        //}
    } else {
        name = "Hero "+globalCharId
        /*if (foidFirstNames.length !==0) {
            let rng = Math.floor(Math.random() * foidFirstNames.length)
            name = foidFirstNames.splice(rng,1)[0]
        } else {*/
            //name = foidFirstNames2[Math.floor(Math.random() * foidFirstNames2.length)]+" "+surnames[Math.floor(Math.random() * surnames.length)]
        //}
    }


    let age = generateAge()

    //location edge
    let xx = Math.random() * 30
    let yy = Math.random() * 30
    let hero = new Hero(name,age, level, 100, characterClass, role, { x: xx, y: yy })
    //console.log("r: "+role+" c:"+characterClass+" - ("+tanks+" - "+healers+" - "+damagedealers+")")
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

function rollClassSpec() {
    let spawnChances2 = adjustSpawnChances(spawnChances)
    const flatChances = []
    for (const className in spawnChances2) {
        const specs = spawnChances2[className]
        for (const spec in specs) {
            const weight = specs[spec]
            if (weight > 0) {
                flatChances.push({ class: className, spec, weight })
            }
        }
    }

    const totalWeight = flatChances.reduce((sum, entry) => sum + entry.weight, 0)
    const roll = Math.random() * totalWeight

    let cumulative = 0
    for (const entry of flatChances) {
        cumulative += entry.weight
        if (roll < cumulative) {
            return { class: entry.class, spec: entry.spec }
        }
    }
    return { class: "Warrior", spec: "dps" }
}

function rollClassSpec2() {
    const flatChances = []
    let totalWeight = 0
    for (const className in spawnChances) {
        const specs = spawnChances[className]
        for (const spec in specs) {
            const weight = specs[spec]
            if (weight > 0) {
                flatChances.push({class: className, spec, weight: 1 / weight})
                totalWeight += 1 / weight
            }
        }
    }

    const roll = Math.random() * totalWeight

    let cumulative = 0
    for (const entry of flatChances) {
        cumulative += entry.weight
        if (roll < cumulative) {
            return {class: entry.class, spec: entry.spec, totalWeight: totalWeight}
        }
    }
    return {class: "Warrior", spec: "dps"}
}

function getClassSpecPercentage(className, spec) {
    let totalWeight = 0
    let classSpecWeight = 0

    for (const classKey in spawnChances) {
        const specs = spawnChances[classKey]
        for (const specKey in specs) {
            const weight = specs[specKey]
            totalWeight += weight

            if (classKey === className && specKey === spec) {
                classSpecWeight = weight
            }
        }
    }

    if (classSpecWeight === 0) {
        return 0.01
    }

    const percentage = (classSpecWeight / totalWeight) * 100
    return percentage
}



let getSkillRandom = function(rng = 0.85, mean = 0.7, stdDev = 0.03, min = 0.4, max = 1.0) {
    const rand = Math.random()
    if (rand < rng) {
        let value
        let inf = 0
        do {
            const u1 = Math.random()
            const u2 = Math.random()
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
            value = mean + z * stdDev
            inf++
            if (inf > 100) {
                return Math.min(Math.max(value, min), max);
            }
        } while (value < min || value > max)
        return value
    } else {
        return min + Math.random() * (max-min)
    }
}

function rollSex(className, specName) {
    let [maleRatio, femaleRatio] = heroesConfig[className][specName].femaleR
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

    const bias = {
        tank: Math.max(0.1, expected.tank / Math.max(1, tanks)),
        healer: Math.max(0.1, expected.healer / Math.max(1, healers)),
        dps: Math.max(0.1, expected.dps / Math.max(1, damagedealers))
    }

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


const ageBrackets = [
    { min: 15, max: 19, weight: 3 }, 
    { min: 20, max: 25, weight: 6 },
    { min: 26, max: 35, weight: 5 },
    { min: 36, max: 50, weight: 2 },
    { min: 51, max: 60, weight: 1 }, 
]
function pickWeightedBracket(brackets) {
    const totalWeight = brackets.reduce((sum, b) => sum + b.weight, 0)
    let r = Math.random() * totalWeight
    for (const b of brackets) {
        if (r < b.weight) return b
        r -= b.weight
    }
    return brackets[brackets.length - 1]
}
function generateAge() {
    const bracket = pickWeightedBracket(ageBrackets)
    return bracket.min + Math.random() * (bracket.max - bracket.min)
} 