let time = 0

let gold = 1000
let gold2 = 1000
let goldS = gold
let goldE = gold
let income = 0
let income2 = 0
let incomeI = 0


let heroes = []
let buildings = []

let heroesMax = 0

buildings.push(new Inn(1))

function update() {
    income2 += (goldE-goldS)/progress
    goldS = gold
    gold -= ((Math.random()*40)-20) * progress


    heroesMax = 0
    for (let i = 0; i < buildings.length; i++) {
        buildings[i].run()
        if (buildings[i].type === "inn") {
            heroesMax += buildings[i].heroesMax
        }
    }



    goldE = gold
    incomeI++
    if (incomeI > 60) { //TODO DAY
        income = income2 / incomeI
        income2 = 0
        incomeI = 0
        gold2 = gold
    }
}