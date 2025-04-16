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

let heroesMax = 0


buildings.push(new Inn({ x: 50, y: 45 },1))
//TEST
heroes.push(new Hero("test1",30, 0, 1, 100, "Warrior", "tank", { x: 0, y: 5 },getSkillRandom()))
heroes.push(new Hero("test2", 25, 0, 1, 100, "Mage", "dps", { x: 12, y: 10 },getSkillRandom()))
heroes.push(new Hero("test3", 35, 0, 1, 100, "Archer", "dps", { x: 10, y: 7 },getSkillRandom()))
heroes.push(new Hero("test4", 20, 0, 1, 100, "Priest", "healer", { x: 10, y: 5 },getSkillRandom()))
heroes.push(new Hero("test5", 24, 0, 1, 100, "Rogue", "dps", { x: 20, y: 5 },getSkillRandom()))


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



    gold2 = gold
    incomeI += progress
    if (incomeI > 720) {
        goldE = gold
        income = (goldE - goldS)
        goldS = gold

        incomeI = 0
    }
}