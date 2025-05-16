let time = 0
let day = 0
let gamePaused = false

let renown = 20 //TODO:
let gold = 5000
let gold2 = gold
let goldS = gold
let goldE = gold
let income = 0
let incomeI = 0

let characters = []
let heroes = []
let buildings = []
let charactersMap = {}
let buildingsMap = {}

let deadHeroes = []
let inactiveHeroes = []

let healers = 0
let damagedealers = 0
let tanks = 0

let heroesMax = 0

let logs = {heroes: [], buildings: [], debug: []}

let statistics = {
    income: [], heroes: [], gold: [], healers: [], damagedealers: [], tanks: [], sociability: [], intelligence: [], competitiveness: [], adventurousness: [],
    level: [], levels: {}, classes: {}, guilds: [], ranks: {}, rank: [], deadHeroes: [], age:[], sex:[[],[]]
}


let hourTimer = 0
let hourTimeRng = 30

function update() {
    if (gamePaused) {
        return
    }
    heroesMax = 0
    for (let i = 0; i < buildings.length; i++) {
        buildings[i].update()
        if (buildings[i].type === "inn") {
            heroesMax += buildings[i].heroesMax
        }
    }

    for (let i = 0; i < characters.length; i++) {
        characters[i].update()
    }

    for (let i = 0; i < dungeonControllers.length; i++) {
        dungeonControllers[i].update()
    }


    hourTimer += progress
    if (hourTimer > hourTimeRng) {
        hourTimer = 0
        hourTimeRng = 20 + Math.random()*20
        if (heroesMax > heroes.length) {
            if (Math.random() > (heroes.length / heroesMax)) { //TODO renown
                spawnHeroRandom()
            }
            
        }
    }

    gold2 = gold
    incomeI += progress
    if (incomeI > 720) {
        goldE = gold
        income = (goldE - goldS)
        goldS = gold

        incomeI = 0
        for (let i = 0; i < characters.length; i++) {
            characters[i].age += (1/365)
            characters[i].updateDay()
        }
        for (let i = 0; i < heroes.length; i++) {
            heroes[i].rankPoints -= heroes[i].rankPoints / 1000
            if (heroes[i].rankPoints < 0) {
                heroes[i].rankPoints = 0
            }
            if (heroes[i].inGuild && Math.random() < 0.002 * (1 - heroes[i].loyalty)) {
                guilds[heroes[i].guildId].kickHero(heroes[i])
            }
        }
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].updateDay()
        }
        for (let i = 0; i < guilds.length; i++) {
            guilds[i].updateDay()
            guilds[i].rankPoints -= ((guilds[i].rankPoints) / 600) * (2 + (guilds[i].heroes.length) / 7)
            if (guilds[i].rankPoints < 0) {
                guilds[i].rankPoints = 0
            }
            if (guilds[i].heroes.length > 50 && Math.random() < 0.001) {
                let newGuildHeroes = []
                let num = 10 + Math.random() * 20
                for (let a = 0; a < guilds[i].heroes.length; a++) {
                    if (charactersMap[guilds[i].heroes[a]] === undefined) {
                        continue
                    }
                    guilds[i].kickHero(charactersMap[guilds[i].heroes[a]])
                    newGuildHeroes.push(charactersMap[guilds[i].heroes[a]])
                    if (a > num) {
                        break
                    }
                }
                let gm = newGuildHeroes[Math.floor(Math.random() * newGuildHeroes.length)]
                let guild = new Guild(newGuildHeroes, gm)
                guild.rankPoints = guilds[i].rankPoints / 1.3
                guilds[i].rankPoints = guilds[i].rankPoints / 1.3
            }
            if (guilds[i].heroes.length > 100 && Math.random() < 0.01) {
                let newGuildHeroes = []
                let num = 10 + Math.random() * 60
                for (let a = 0; a < guilds[i].heroes.length; a++) {
                    if (charactersMap[guilds[i].heroes[a]] === undefined) {
                        continue
                    }
                    guilds[i].kickHero(charactersMap[guilds[i].heroes[a]])
                    newGuildHeroes.push(charactersMap[guilds[i].heroes[a]])
                    if (a > num) {
                        break
                    }
                }
                let gm = newGuildHeroes[Math.floor(Math.random() * newGuildHeroes.length)]
                console.log(gm)
                let guild = new Guild(newGuildHeroes, gm)
                guild.rankPoints = guilds[i].rankPoints / 1.3
                guilds[i].rankPoints = guilds[i].rankPoints / 1.3
            }
        }
        updateStatistics()
    }
}

function updateStatistics() {
    //TODO: dps, hps, dtps, skills? (healers dps, tanks dps, dpsesdps?)
    let comp = 0
    let int = 0
    let soc = 0
    let adv = 0
    let level = 0
    let rank = 0
    for (let i = 1; i < 101; i++) {
        if (statistics.levels[i] === undefined) {
            statistics.levels[i] = []
        }
        statistics.levels[i].push(0)
    }

    Object.keys(heroesConfig).forEach(key => {
        if (statistics.classes[key] === undefined) {
            statistics.classes[key] = []
        }
        statistics.classes[key].push(0)
    })

    let rankRanges = generateRankRanges()
    for (let i = 0; i < rankRanges.length; i++) {
        let key = rankRanges[i].tier + " " + rankRanges[i].division
        if (statistics.ranks[key] === undefined) {
            statistics.ranks[key] = []
        }
        statistics.ranks[key].push(0)
    }

    let males = 0
    let females = 0
    let age = 0
    for (let i = 0; i < heroes.length; i++) {
        let heroRank = getRank(heroes[i].rankPoints)
        if (statistics.ranks[heroRank] === undefined) {
            statistics.ranks["Mythic I"][statistics.ranks["Mythic I"].length - 1]++
        } else {
            statistics.ranks[heroRank][statistics.ranks[heroRank].length - 1]++
        }

        statistics.levels[heroes[i].level][statistics.levels[heroes[i].level].length - 1]++
        statistics.classes[heroes[i].characterClass][statistics.classes[heroes[i].characterClass].length - 1]++

        comp += heroes[i].competitiveness
        int += heroes[i].intelligence
        soc += heroes[i].sociability
        adv += heroes[i].adventurousness
        level += heroes[i].level
        rank += heroes[i].rankPoints
        if (heroes[i].sex === "male") {
            males++
        } else {
            females++
        }
        age += heroes[i].age
    }
    statistics.age.push(age / heroes.length)
    statistics.sex[0].push(males)
    statistics.sex[1].push(females)
    statistics.rank.push(rank / heroes.length)
    statistics.competitiveness.push(comp / heroes.length)
    statistics.intelligence.push(int / heroes.length)
    statistics.sociability.push(soc / heroes.length)
    statistics.adventurousness.push(adv / heroes.length)
    statistics.level.push(level / heroes.length)
    let gg = 0

    for (let i = 0; i < guilds.length; i++) {
        if (!guilds[i].dead) {
            gg++
        }
    }   
    statistics.guilds.push(gg)


    statistics.tanks.push(tanks)
    statistics.damagedealers.push(damagedealers)
    statistics.healers.push(healers)
    statistics.gold.push(gold)
    statistics.heroes.push(heroes.length)
    statistics.income.push(income)
    if (statistics.income.length > 365) {

        for (let i = 1; i < 101; i++) {
            statistics.levels[i].shift()
        }

        Object.keys(heroesConfig).forEach(key => {
            statistics.classes[key].shift()
        })

        for (let i = 0; i < rankRanges.length; i++) {
            let key = rankRanges[i].tier + " " + rankRanges[i].division
            statistics.ranks[key].shift()
        }
        statistics.age.shift()
        statistics.sex[0].shift()
        statistics.sex[1].shift()
        statistics.rank.shift()
        statistics.guilds.shift()
        statistics.level.shift()
        statistics.adventurousness.shift()
        statistics.competitiveness.shift()
        statistics.intelligence.shift()
        statistics.sociability.shift()
        statistics.tanks.shift()
        statistics.damagedealers.shift()
        statistics.healers.shift()
        statistics.gold.shift()
        statistics.heroes.shift()
        statistics.income.shift()
    }
}