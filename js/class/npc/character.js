class Character {
    uiElements
    id = 0
    name = ""
    location = {x:0, y:0}
    destination = { x: 0, y: 0 }
    atDestination = true
    status = ""
    sex = "male"
    race = "human"
    maxAge = 100
    size = [10,10]

    sleepBuildingId = -1

    inventory = {
        food: 0, weaponLevel: 1, armorLevel: 1, potionHealth: 0, potionMana: 0, other: [], gold: 100
    }

    fatigue = 100 
    fatigueRate = 1.0
    sleepSpeed = 0.3
    hunger = 100
    hungerRate = 8.0
    eatSpeed = 1.5

    mood = 100
    satisfaction = 100
    loyalty = 100
    entertainment = 100

    sociability = 0.1 + Math.random() * 0.9

    speed = 4
    role = "dps"
    xp = 0
    xpNeed = 0

    idleTimer = 2+Math.random()*15
    waitTimer = 0
    wandering = false
    goingToInn = false

    isTalking = false
    talkingTimer = 0
    talkingTargetId = 0

    talkInc = 0

    inTown = true

    friendships = {}

    constructor(name, age, level, health, characterClass, role, location) {
        this.name = name
        this.age = age
        this.id = globalCharId
        charactersMap[this.id] = this
        globalCharId++
        this.level = level
        this.health = health
        this.characterClass = characterClass
        this.role = role
        this.location = location
        this.fatigueRate = 0.7 + (Math.random() * 0.6)
        this.hungerRate = 0.95 + (Math.random() * 0.1)
        this.destination = { x: location.x, y: location.y }
        this.createUI()
        this.xp = Math.floor(100 * (this.level - 1) * Math.pow(this.level - 1, 1.2))
        this.xpNeed = Math.floor(100 * this.level * Math.pow(this.level, 1.2))

        let ma = raceMaxAge[this.race]
        this.maxAge = ma-(ma/5)+(Math.random()*ma/2.5)
        addToGrid(this)
    }



    update() {
        this.hunger -= progress * 0.12 * this.hungerRate
        this.fatigue -= progress * 0.08 * this.fatigueRate

        if (this.location.x === this.destination.x && this.location.y === this.destination.y) {
            this.atDestination = true
            if (this.needsSleep() || this.isHungry()) {
                this.wandering = false
                this.findInn()
            }
            if (this.isTalking) {
                this.status = "Talking"
                this.wandering = false
                if (this.talkingTimer <= 0) {
                    this.status = ""
                    this.isTalking = false
                    if (this.talkingTargetId !== -1) {
                        this.updateFriendship(this.talkingTargetId,0) //add to list
                        if (Math.random() < 0.05) {
                            this.updateFriendship(this.talkingTargetId, Math.random()*10)
                        }
                    }
                }
            }
            if (this.wandering) {
                this.status = "Waiting"
                if (this.waitTimer<=0) {
                    this.status = ""
                    this.wandering = false
                }
            }

            switch (this.status) {
                case "Eating":
                    this.eatingSleepingInn(false)
                    break
                case "Sleeping":
                    this.eatingSleepingInn(true)
                    break
                case "":
                    this.idleTimer -= progress
                    if (this.idleTimer <= 0) {
                        let rng = Math.random()

                        this.wandering = true
                        this.idleTimer = 5 + Math.random() * 5
                        this.waitTimer = 2 + Math.random() * 10

                        if (rng > (0.999 - this.sociability * (0.999 - 0.97)) - this.talkInc) {
                            let rng2 = Math.floor(Math.random() * heroes.length)
                            if (heroes[rng2].inTown && heroes[rng2] !== this) {
                                let angle = Math.atan2(heroes[rng2].location.y - this.location.y, heroes[rng2].location.x - this.location.x)
                                    angle += (Math.random() - 0.5) * 0.5
                                    let distance = 2 + Math.random() * 2
                                    let dx = heroes[rng2].location.x - Math.cos(angle) * distance
                                    let dy = heroes[rng2].location.y - Math.sin(angle) * distance
                                    this.destination = { x: dx, y: dy }
                                    let timer = 8 + Math.random() * 12
                                    this.isTalking = true
                                    this.talkingTimer = timer
                                    heroes[rng2].isTalking = true
                                    heroes[rng2].destination = { x: heroes[rng2].location.x, y: heroes[rng2].location.y }
                                    heroes[rng2].talkingTimer = timer + (getDistance({ x: this.location.x, y: this.location.y }, { x: heroes[rng2].location.x, y: heroes[rng2].location.y }) / 4)
                                    heroes[rng2].talkingTargetId = -1
                                    this.talkingTargetId = rng2
                                    this.talkInc = 0
                            }
                        } else if (rng > (0.995 - this.sociability * (0.995 - 0.95)) - this.talkInc) {
                            let rng2 = Math.floor(Math.random() * heroes.length)
                            if (heroes[rng2].inTown && heroes[rng2] !== this) {
                                let angle = Math.atan2(heroes[rng2].location.y - this.location.y, heroes[rng2].location.x - this.location.x)
                                if (getDistance(this.location, heroes[rng2].location) > 20 + Math.random() * 20 * this.sociability) {
                                    angle += (Math.random() - 0.5) * 0.5
                                    let dx = heroes[rng2].location.x - Math.cos(angle) * (5+(Math.random()*5))
                                    let dy = heroes[rng2].location.y - Math.sin(angle) * (5 + (Math.random() * 5))
                                    this.destination = { x: dx, y: dy }
                                    this.talkInc = 0.3
                                } else {
                                    angle += (Math.random() - 0.5) * 0.5
                                    let distance = 2 + Math.random() * 2
                                    let dx = heroes[rng2].location.x - Math.cos(angle) * distance
                                    let dy = heroes[rng2].location.y - Math.sin(angle) * distance
                                    this.destination = { x: dx, y: dy }
                                    let timer = 8 + Math.random() * 12
                                    this.isTalking = true
                                    this.talkingTimer = timer
                                    heroes[rng2].isTalking = true
                                    heroes[rng2].destination = { x: heroes[rng2].location.x, y: heroes[rng2].location.y }
                                    heroes[rng2].talkingTimer = timer + (getDistance({ x: this.location.x, y: this.location.y }, { x: heroes[rng2].location.x, y: heroes[rng2].location.y }) / 4)
                                    heroes[rng2].talkingTargetId = -1
                                    this.talkingTargetId = rng2
                                    this.talkInc = 0
                                }
                            }
                        } else if (rng > (0.95 - this.sociability * (0.95 - 0.8)) - this.talkInc) {
                            let heroKeys = Object.keys(this.friendships)
                            let rng2 = Math.floor(Math.random() * heroKeys.length)
                            let chosenKey = heroKeys[rng2]
                            let chosen = heroes[chosenKey]
                            if (chosen !== undefined && chosen.inTown) {
                                let angle = Math.atan2(chosen.location.y - this.location.y, chosen.location.x - this.location.x)
                                if (getDistance(this.location, chosen.location) > 40 + Math.random()*40) {
                                    angle += (Math.random() - 0.5) * 0.5
                                    let dx = chosen.location.x - Math.cos(angle) * (5 + (Math.random() * 5))
                                    let dy = chosen.location.y - Math.sin(angle) * (5 + (Math.random() * 5))
                                    this.destination = { x: dx, y: dy }
                                    this.talkInc = 0.3
                                } else {
                                    angle += (Math.random() - 0.5) * 0.5
                                    let distance = 2 + Math.random() * 2
                                    let dx = chosen.location.x - Math.cos(angle) * distance
                                    let dy = chosen.location.y - Math.sin(angle) * distance
                                    this.destination = { x: dx, y: dy }
                                    let timer = 8 + Math.random() * 12
                                    this.isTalking = true
                                    this.talkingTimer = timer
                                    chosen.isTalking = true
                                    chosen.destination = { x: chosen.location.x, y: chosen.location.y }
                                    chosen.talkingTimer = timer + (getDistance({ x: this.location.x, y: this.location.y }, { x: heroes[rng2].location.x, y: heroes[rng2].location.y }) / 4)
                                    this.talkingTargetId = chosenKey
                                    chosen.talkingTargetId = -1
                                    this.talkInc = 0
                                }
                            }

                        } else {
                            let dx = this.location.x - 15 + Math.random() * 30
                            let dy = this.location.y - 15 + Math.random() * 30
                            if (dx > 1000 || dx < -1000) {
                                dx = Math.random() * 30
                            }
                            if (dy > 600 || dy < -600) {
                                dy = Math.random() * 30
                            }
                            this.destination = { x: dx, y: dy }
                        }
                    }
                    break
                case "Waiting":
                    this.waitTimer -= progress

                    break
                case "Talking":
                    this.talkingTimer -= progress

                    break
                default: 
                    break
            }
        } else {
            this.atDestination = false
            this.move()
        }
    }

    findInn() {
        if (this.sleepBuildingId === -1) {
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
        if (!this.goingToInn) {
            if (this.sleepBuildingId !== -1) {
                let building = buildings[this.sleepBuildingId]
                let bsize =  [building.size[0]-1,building.size[1]-1]
                let xx = building.location.x-(bsize[0]/2)+(Math.random()*bsize[0])
                let yy = building.location.y-(bsize[1]/2)+(Math.random()*bsize[1])-1
                this.destination = {x:xx,y:yy}
                this.goingToInn = true

                return true
            } else {
                return false
            }
        }
        if (this.location.x === this.destination.x && this.location.y === this.destination.y && this.status!=="Eating" && this.status!=="Sleeping") {
            if (this.isHungry()) {
                this.inventory.gold -= buildings[this.sleepBuildingId].prices.eat
                gold += buildings[this.sleepBuildingId].prices.eat
                this.status = "Eating"
                return true
            }
            
            if (this.needsSleep()) {
                this.inventory.gold -= buildings[this.sleepBuildingId].prices.sleep
                gold += buildings[this.sleepBuildingId].prices.sleep
                this.status = "Sleeping"
                return true
            }
         
        }
    }

    eatingSleepingInn(sleep) {
        if (this.location.x === this.destination.x && this.location.y === this.destination.y) {
            if (sleep) {
                this.fatigue += this.sleepSpeed * progress
                this.status = "Sleeping"
                if (this.fatigue > 100) {
                    this.fatigue = 100
                    this.goingToInn = false
                    this.status = ""
                }
            } else {
                this.hunger += this.eatSpeed * progress
                this.status = "Eating"
                if (this.hunger > 100) {
                    this.hunger = 100
                    this.goingToInn = false
                    this.status = ""
                }
            }
        }
    }

    move() { //TODO: PATH
        let speed = this.speed *4
        this.status = "Moving"
        let dx = this.destination.x - this.location.x
        let dy = this.destination.y - this.location.y

        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance === 0) return

        let dirX = dx / distance
        let dirY = dy / distance

        this.location.x += dirX * speed * progress
        this.location.y += dirY * speed * progress

        let newDx = this.destination.x - this.location.x
        let newDy = this.destination.y - this.location.y

        if (dx * newDx < 0) this.location.x = this.destination.x
        if (dy * newDy < 0) this.location.y = this.destination.y
        updateGridPosition(this)
    }

    needsSleep() {
        return this.fatigue < 15
    }

    isHungry() {
        return this.hunger < 30
    }

    getStatus() {
        if (this.status === "") {
            return "Idle"
        }
        return this.status
    }

    updateDay() {
        if (this.age>this.maxAge) {
            if (Math.random()<0.01) {
                //TODO:DIE
            }
        }
    }

    updateFriendship(fId, fVal) {
        if (this.friendships[fId] === undefined) {
            this.friendships[fId] = 0
        }
        let scaling = 1 - this.friendships[fId] / 100
        this.friendships[fId] += fVal * scaling
        if (heroes[fId].friendships[this.id] === undefined) {
            heroes[fId].friendships[this.id] = 0
        }
        heroes[fId].friendships[this.id] += fVal * scaling
    }

    createUI() {
        this.uiElements = document.createElement('div')
        this.uiElements.classList.add('characterUi')
        
        this.uiElements.style.color = colors[this.characterClass]
        this.uiElements.textContent = `${this.name}`

        document.getElementById('charactersUi').appendChild(this.uiElements)

    }

    destroyUI() {
        if (this.uiElements) {
            this.uiElements.remove()
            this.uiElements = null
        }
    }

}