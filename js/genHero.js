let getHeroRandom = function(level = 1) {
    const moidFirstNames = [
        "Aden", "Alric", "Ansel", "Benn", "Bran", "Cade", "Calen", "Dain", "Derek", "Edric",
        "Elric", "Fenn", "Finn", "Garen", "Hal", "Harl", "Hob", "Ivor", "Jarl", "Joren",
        "Jude", "Kael", "Kellen", "Leif", "Liam", "Milo", "Ned", "Orren", "Perrin", "Quin",
        "Reed", "Rurik", "Sam", "Seth", "Silas", "Soren", "Tobyn", "Torin", "Ulric", "Varn",
        "Yann", "Yorik", "Zane", "Tharion",
        "Kaelen",
        "Darric",
        "Baldric",
        "Fenric",
        "Elandor",
        "Garrik",
        "Orim",
        "Valrik",
        "Draven",
        "Lucan",
        "Torren",
        "Maelor",
        "Rhydar",
        "Korran",
        "Jorund",
        "Theric",
        "Aerendel",
        "Cairos",
        "Vaelin","Aerendil",
        "Thalion",
        "Elaran",
        "Faelar",
        "Lorion",
        "Ithilorn",
        "Saelar",
        "Velion",
        "Kaerith",
        "Althir"
    ]
    const foidFirstNames = [
        "Bara", "Bryn", "Cora", "Dara", "Eda", "Elsa", "Ember", "Eryn", "Fara", "Gilda",
        "Gwen", "Hilda", "Ina", "Jana", "Kara", "Lana", "Lark", "Lina", "Lysa", "Mara",
        "Mira", "Nia", "Nora", "Olga", "Rin", "Rosa", "Sari", "Tamsin", "Tilda", "Ula",
        "Vera", "Willa", "Wyn", "Yara", "Zora","Elira",
        "Kaelith",
        "Seren",
        "Lyra",
        "Thessia",
        "Mirael",
        "Virelle",
        "Nysera",
        "Anwyn",
        "Rowena",
        "Selene",
        "Isolde",
        "Ysolde",
        "Calistra",
        "Rhiannon",
        "Faelara",
        "Liora",
        "Shaelis",
        "Elaria",
        "Myrren","Sylwen",
        "Lirael",
        "Aerinia",
        "Nymeris",
        "Thalindra",
        "Elyra",
        "Velessa",
        "Ylleria",
        "Serelis",
        "Mythria"

    ]
    const surnames = [
        "Ashfoot", "Barrow", "Barrelborn", "Birch", "Blackwell", "Bramble", "Brasshook", "Brook", "Brown", "Buckthorn",
        "Clay", "Cobbler", "Copper", "Crowley", "Dale", "Dewdrop", "Dustwhistle", "Farthing", "Fennel", "Fern",
        "Fletcher", "Flint", "Goodbarrel", "Gray", "Greenhand", "Hearth", "Hillborn", "Hollow", "Honeytrot", "Ironpot",
        "Kettle", "Kindle", "Lambkin", "Lantern", "Leaf", "Lightfoot", "Marble", "Mead", "Meadow", "Mill",
        "Moss", "Mudlock", "Nettle", "Oakridge", "Oats", "Pebble", "Pickle", "Pond", "Quickbranch", "Redfern",
        "Ridge", "Rumble", "Salt", "Scruff", "Shale", "Silverpot", "Smith", "Snailstep", "Softwhistle", "Stone",
        "Tarn", "Tatter", "Tiller", "Thatch", "Thistle", "Thorn", "Tuck", "Turnip", "Underbough", "Waggle",
        "Weatherby", "Wick", "Willow", "Wimble", "Windle", "Winters", "Woodrow", "Woolsey", "Wren", "Yew","Stormblade",
        "Shadowbinder",
        "Ironhart",
        "Windrider",
        "Duskwhisper",
        "Frostbane",
        "Flamewarden",
        "Nightbloom",
        "Dawnsworn",
        "Silverseer",
        "Wolfsong",
        "Starfire",
        "Blackthorn",
        "Emberfall",
        "Moonveil",
        "Ravenshade",
        "Ashwalker",
        "Brightforge",
        "Mistborn"
    ]
    let roll = rollClassRole()
    let characterClass = roll.class
    let role = roll.role
    let sex = rollSex(characterClass)


    let first
    if (sex==="male") {
        first = moidFirstNames[Math.floor(Math.random() * moidFirstNames.length)]
    } else {
        first = foidFirstNames[Math.floor(Math.random() * foidFirstNames.length)]
    }

    let last = surnames[Math.floor(Math.random() * surnames.length)]

    let name = `${first} ${last}`
    let age = 15+(Math.random()*45)

    //location edge
    let hero = new Hero(name,age, heroes.length, level, 100, characterClass, "tank", { x: 0, y: 5 })
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