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

let logs = {heroes: [], buildings:[], debug:[]}
let incomeLog = []


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
        incomeLog.push(income)
        if (incomeLog.length>100) {
            incomeLog.shift()
        }
        goldS = gold

        incomeI = 0
        for (let i = 0; i < characters.length; i++) {
            characters[i].age += (1/365)
            characters[i].updateDay()
        }
        for (let i = 0; i < heroes.length; i++) {
            heroes[i].rankPoints -= Math.min(8.5, heroes[i].rankPoints / 1000)
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
                    guilds[i].kickHero(charactersMap[guilds[i].heroes])
                    newGuildHeroes.push(charactersMap[guilds[i].heroes])
                    if (a > num) {
                        break
                    }
                }
                let gm = newGuildHeroes[Math.floor(Math.random() * newGuildHeroes.length)]
                let guild = new Guild(newGuildHeroes, gm)
                guild.rankPoints = guilds[i].rankPoints / 1.5
            }
            if (guilds[i].heroes.length > 100 && Math.random() < 0.01) {
                let newGuildHeroes = []
                let num = 10 + Math.random() * 60
                for (let a = 0; a < guilds[i].heroes.length; a++) {
                    guilds[i].kickHero(charactersMap[guilds[i].heroes[a]])
                    newGuildHeroes.push(charactersMap[guilds[i].heroes[a]])
                    if (a > num) {
                        break
                    }
                }
                let gm = newGuildHeroes[Math.floor(Math.random() * newGuildHeroes.length)]
                let guild = new Guild(newGuildHeroes, gm)
                guild.rankPoints = guilds[i].rankPoints / 1.5
            }
        }
        
    }
}