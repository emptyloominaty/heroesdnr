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




buildBuilding("inn",{x: 50, y: 45})
buildBuilding("inn",{x: -220, y: -105})
buildBuilding("inn",{x: -350, y: -150})
buildBuilding("potionShop",{x: -280, y: -80})
buildBuilding("recruitmentHall",{x: 0, y: -125})


buildBuilding("dungeonController",{x: -530, y: 0}) //+30 +30

//TEST
for (let i = 0; i<5; i++) {
    spawnHeroRandom(1)
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
        //characters[i].update()
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
            if (heroes[i].rankPoints > 0) {
                heroes[i].rankPoints -= Math.min(8.5, heroes[i].rankPoints/1000)
            }
        }
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].updateDay()
        }
        for (let i = 0; i < guilds.length; i++) {
            guilds[i].updateDay()
            guilds[i].rankPoints -= Math.min(8.5, guilds[i].rankPoints / 1000)
        }
        
    }
}