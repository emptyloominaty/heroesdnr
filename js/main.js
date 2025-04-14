let time = 0
let gold = 1000
let gold2 = 1000
let heroes = []

let goldS = gold
let goldE = gold
let income = 0
let income2 = 0

let incomeI = 0

function update() {
    income2 += (goldE-goldS)/progress
    goldS = gold
    gold -= ((Math.random()*40)-20) * progress






    goldE = gold
    incomeI++
    if (incomeI > 60) { //TODO DAY
        income = income2 / incomeI
        income2 = 0
        incomeI = 0
        gold2 = gold
    }
}