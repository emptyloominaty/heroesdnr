

class Character {
    id = 0
    name = ""
    location = {x:0, y:0}
    destination = { x: 0, y: 0 }
    atDestination = true
    status = ""

    sleepBuildingId = 99999 //99999 = none

    inventory = {
        food: 0, weaponLevel: 1, armorLevel: 1, potionHealth: 0, potionMana: 0, other: []
    }

    fatigue = 100 
    fatigueRate = 1.0
    sleepSpeed = 0.05
    hunger = 100
    hungerRate = 8.0
    eatSpeed = 1.0

    mood = 100
    satisfaction = 100
    loyalty = 100
    entertainment = 100

    speed = 1

    constructor(name, age, id, level, health, characterClass, location) {
        this.name = name;
        this.age = age
        this.id = id
        this.level = level;
        this.health = health;
        this.characterClass = characterClass
        this.location = location
        this.fatigueRate = 0.7 + (Math.random() * 0.6)
        this.hungerRate = 0.95 + (Math.random() * 0.1) 
    }

    update() {
        this.hunger -= progress * 0.01 * this.hungerRate;
        this.fatigue -= progress * 0.005 * this.fatigueRate;

        if (this.location.x === this.destination.x && this.location.y === this.destination.y) {
            this.atDestination = true
            if (this.fatigue < 15) {
                this.findInn(true)
            }
            if (this.hunger < 30) {
                this.findInn(false)
            }
        } else {
            this.atDestination = false
            this.move()
        }
    }

    findInn(sleep) {
        if (this.sleepBuildingId === 99999) {
            for (let i = 0; i < buildings.length; i++) {
                if (buildings[i].type === "inn") {
                    if (buildings[i].heroes < buildings[i].heroesMax) {
                        this.sleepBuildingId = i
                        buildings[i].heroes++
                        buildings[i].heroesList.push(this)
                        break
                    }
                }
            }
        }
        if (this.sleepBuildingId !== 99999) {
            this.destination = buildings[this.sleepBuildingId].location
        }
        if (this.location.x === this.destination.x && this.location.y === this.destination.y) {
            if (sleep) {
                this.fatigue += sleepSpeed * progress
                this.status = "Sleeping"
                if (this.fatigue > 100) {
                    this.fatigue = 100
                    this.status = ""
                }
            } else {
                this.hunger += eatSpeed * progress
                this.status = "Eating"
                if (this.hunger > 100) {
                    this.hunger = 100
                    this.status = ""
                }
            }
        }
    }

    move() { //TODO: PATH
        this.status = "Moving"
        let dx = this.destination.x - this.location.x;
        let dy = this.destination.y - this.location.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        let dirX = dx / distance;
        let dirY = dy / distance;

        this.location.x += dirX * this.speed * progress;
        this.location.y += dirY * this.speed * progress;

        let newDx = this.destination.x - this.location.x;
        let newDy = this.destination.y - this.location.y;

        if (dx * newDx < 0) this.location.x = this.destination.x;
        if (dy * newDy < 0) this.location.y = this.destination.y;
    }

}