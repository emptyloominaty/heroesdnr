let time = 0
let day = 0

let gold = 1000
let gold2 = 1000
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


buildings.push(new Inn({ x: 50, y: 45 }, "Inn 1", 1))

//TEST
for (let i = 0; i<5; i++) {
    spawnHeroRandom(1)
}


let hourTimer = 0

function update() {
    //input
    updateCamera()

    //


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
    if (hourTimer > 30) {
        hourTimer = 0
        if (heroesMax > heroes.length) {
            if (Math.random() > 1 * (heroes.length / heroesMax)) {
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
            if (heroes[i].rankPoints > 0) {
                heroes[i].rankPoints -= Math.min(8.5,heroes[i].rankPoints/1000)
            }
        }
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].updateDay()
        }
    }
}