class Character {
    uiElements
    drawName = false
    id = 0
    name = ""
    location = {x:0, y:0}
    destination = { x: 0, y: 0 }
    atDestination = true
    status = ""
    sex = "male"
    race = "human"
    maxAge = 100
    size = [3, 3]
    hero = false

    sleepBuildingId = -1

    inventory = { //TODO:REMOVE wep,armor
        weaponLevel: 1, weaponQuality: 1, armorLevel: 1, armorQuality: 1, items: [], gold: 100,
        potions: {
            "Health": 0, "Mana": 0, "Agility": 0, "Strength": 0, "Resurrection":0}
    }

    slots = {hand: new Item("hand",1,1) , head: new Item("head",1,1), chest: new Item("chest",1,1),legs: new Item("legs",1,1)
        ,feet: new Item("feet",1,1),weapon: new Item("weapon",1,1)  }
    ilvl = 1
    itemsBonus = {dps: {base:1,mul:1}, dtps: {base:1,mul:1}}


    rankPoints = 0

    log = []

    fatigue = 100 
    fatigueRate = 1.0
    sleepSpeed = 0.3
    hunger = 100
    hungerRate = 8.0
    eatSpeed = 1.5

    arrivalTime = 0

    mood = 100
    satisfaction = 100
    loyalty = 100
    entertainment = 100

    sociability = 0.1 + Math.random() * 0.9
    competitiveness = 0
    adventurousness = 0.1 + Math.random() * 0.9

    speed = 4
    role = "dps"
    xp = 0
    xpNeed = 0

    idleTimer = 2+Math.random()*15
    waitTimer = 0
    wandering = false
    goingToInn = false
    goingToPotionShop = false
    potionsNeeded = []
    potionsCount = []
    buildingId = 0
    buyingTimer = 0

    isTalking = false
    talkingTimer = 0
    talkingTargetId = 0

    talkInc = 0

    inTown = true

    friendships = {}

    isInDungeon = false
    goingToDungeon = false
    dungeonId = 0
    dungeonGroup = []
    groupLeader = false

    inGuild = false
    guildId = -1

    canTalk = true

    constructor(name, age, level, health, characterClass, role, location,ignore) {
        this.name = name
        this.age = age
        this.level = level
        this.health = health
        this.characterClass = characterClass
        this.role = role
        this.characterSpec = role
        this.location = location
        this.fatigueRate = 0.7 + (Math.random() * 0.6)
        this.hungerRate = 0.95 + (Math.random() * 0.1)
        this.destination = {x: location.x, y: location.y}

        if (Math.random() > 0.99) {
            this.competitiveness = Math.random() * 0.9
        } else if (Math.random() > 0.97) {
            this.competitiveness = Math.random() * 0.2
        }

        this.arrivalTime = realtime

        this.xp = Math.floor(100 * (this.level - 1) * Math.pow(this.level - 1, 1.2))
        this.xpNeed = Math.floor(100 * this.level * Math.pow(this.level, 1.2))

        let ma = raceMaxAge[this.race]
        this.maxAge = ma-(ma/5)+(Math.random()*ma/2.5)
        if (!ignore) {
            this.id = globalCharId
            charactersMap[this.id] = this
            globalCharId++
            this.addLog(messages.heroLog.joinTown())
            this.createUI()
            logs.heroes.push({time: realtime, message: "<span style='color:" + colors[this.characterClass] + "'>" + this.characterClass + "</span> <span style='color:" + colors.log.success + "'>" + this.name +" joined the town</span>"})
            addToGrid(this)
        }

    }



    update() {
        this.canTalk = !this.goingToDungeon && !this.isInDungeon && !this.goingToInn && !this.goingToPotionShop && this.status !== "Eating" && this.status !== "Sleeping" && this.status !== "Buying" 
        if (this.isInDungeon) {
            this.status = "In Dungeon"
            return
        }

        this.hunger -= progress * 0.12 * this.hungerRate
        this.fatigue -= progress * 0.08 * this.fatigueRate

        if (this.location.x === this.destination.x && this.location.y === this.destination.y) {
            this.atDestination = true
            if (this.goingToDungeon && this.groupLeader) {
                for (let i = 0; i<this.dungeonGroup.length; i++) {
                    this.dungeonGroup[i].isInDungeon = true
                    this.dungeonGroup[i].goingToDungeon = false
                    if (this.dungeonGroup[i] !== this && getDistance({x: this.dungeonGroup[i].location.x, y: this.dungeonGroup[i].location.y}, {x: this.location.x, y: this.location.y}) > 5) {
                        let xxg = this.location.x - 5 + Math.random() * 10
                        let yyg = this.location.y - 5 + Math.random() * 10
                        addSpellVisualEffects(this.dungeonGroup[i].location.x, this.dungeonGroup[i].location.y, 90, "fire", { duration: 0.1, size: 0, speed: 0, target: {x: this.dungeonGroup[i].location.x, y: this.dungeonGroup[i].location.y}, color: "#84e7ff", onEnd: {name: "explode", size: 1}, onRun: {ignoreLifeSize: true, name: "fire", size: 0.2, life: 0.2, speed: 4, area: 2, texture: textures.particle_fire4, color1: "#84e7ff", color2: "#84e7ff", color3: "rgba(118, 139, 255, 0.1)"}})
                        addLight(this.dungeonGroup[i].location.x, this.dungeonGroup[i].location.y, 20, "rgba(118, 139, 255, 1)", 0.3)

                        addSpellVisualEffects(xxg, yyg, 90, "fire", {duration: 0.1, size: 0, speed: 0, target: {x: xxg, y: yyg}, color: "#84e7ff", onEnd: {name: "explode", size: 1}, onRun: {dirToCentre: true,ignoreLifeSize: true, name: "fire", size: 0.2, life: 0.2, speed: 8, area: 2, texture: textures.particle_fire4, color1: "#84e7ff", color2: "#84e7ff", color3: "rgba(118, 139, 255, 0.1)"}})
                        addLight(xxg, yyg, 20, "rgba(118, 139, 255, 1)", 0.3)
                        this.dungeonGroup[i].location = {x:xxg, y:yyg}
                    }
                        
                }
                //console.log(this.dungeonGroup) //TODO: FIX fixed?
                dungeonControllers[this.dungeonId].startDungeon(this.dungeonGroup,this)
                return
            }
            if (this.isTalking && this.canTalk) {
                this.status = "Talking"
                this.wandering = false
                if (this.talkingTimer <= 0) {
                    this.status = ""
                    this.isTalking = false
                    if (this.talkingTargetId !== -1 && charactersMap[this.talkingTargetId]!== undefined) {
                        this.updateFriendship(this.talkingTargetId, 0) //add to list
                        if (this.inGuild && !charactersMap[this.talkingTargetId].inGuild && Math.random() < 0.2) {
                            guilds[this.guildId].inviteHero(charactersMap[this.talkingTargetId])
                        }
                        if (this.inGuild && charactersMap[this.talkingTargetId].inGuild && Math.random() < 0.01) {
                            guilds[charactersMap[this.talkingTargetId].guildId].kickHero(charactersMap[this.talkingTargetId])
                            guilds[this.guildId].inviteHero(charactersMap[this.talkingTargetId])
                        }
                        if (Math.random() < 0.05) {
                            this.updateFriendship(this.talkingTargetId, Math.random()*10)
                        }
                    }
                }
            }

            if (this.needsSleep() || this.isHungry()) {
                this.wandering = false
                this.findInn()
            }

            if (this.goingToPotionShop) {
                this.goingToPotionShop = false
                this.status = "Buying"
                this.buyingTimer += 1 + (Math.random()*2)
                for (let i = 0; i < this.potionsNeeded.length; i++) {
                    buildings[this.buildingId].buyPotion(this.potionsNeeded[i], this, this.potionsCount[i])
                    this.buyingTimer += 1 + (Math.random() * 1)
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
                        if (this.decideToGoToDungeon()) {
                            return
                        }
                        if (!this.inGuild && this.formGuild()) {
                            return
                        }
                        if (gold>100 && Math.random() > 0.6 && this.checkPotions()) {
                            return
                        }
                        let rng = Math.random()
                        this.wandering = true
                        this.idleTimer = 5 + Math.random() * 5
                        this.waitTimer = 2 + Math.random() * 10

                        if (rng > (0.999999 - this.sociability * (0.999999 - 0.9999)) - this.talkInc) {
                            let rng2 = Math.floor(Math.random() * heroes.length)
                            if (heroes[rng2].inTown && heroes[rng2] !== this && heroes[rng2].canTalk) {
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
                            if (heroes[rng2].inTown && heroes[rng2] !== this && heroes[rng2].canTalk) {
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
                        } else if (rng > (0.95 - this.sociability * (0.95 - 0.8)) - this.talkInc ) {
                            let heroKeys = Object.keys(this.friendships)
                            let rng2 = Math.floor(Math.random() * heroKeys.length)
                            let chosenKey = heroKeys[rng2]
                            let chosen = heroes[chosenKey]
                            if (chosen !== undefined && chosen.inTown  && chosen.canTalk) {
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
                case "Buying":
                    this.buyingTimer -= progress
                    if (this.buyingTimer <= 0) {
                        this.status = ""
                    }
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
                buildings[this.sleepBuildingId].buy(buildings[this.sleepBuildingId].prices.eat, this)
                this.status = "Eating"
                return true
            }
            
            if (this.needsSleep()) {
                buildings[this.sleepBuildingId].buy(buildings[this.sleepBuildingId].prices.sleep, this)
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

    checkPotions() {
        let budget = this.inventory.gold / 2
        let buildingId = -1
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].type === "potionShop") {
                buildingId = i
                break
            }
        }
        if (buildingId === -1) {
            return false
        }
        let p = 0
        let potionsNeeded = []
        if (this.inventory.potions.health <= 0) {
            potionsNeeded.push("Health")
            budget -= buildings[buildingId].prices["Health"]
            p++
        }
        if (this.characterClass === "Mage" || this.characterClass === "Shaman" || this.characterClass === "Warlock" || this.characterClass === "Druid" || this.characterClass === "Priest" || this.role === "healer") {
            if (budget > 0 && this.inventory.potions["Mana"] <= 0) {
                potionsNeeded.push("Mana")
                budget -= buildings[buildingId].prices["Mana"]
                p++
            }
        } else {
            if (budget > 0 && this.inventory.potions["Agility"] <= 0 && buildings[buildingId].level > 0) {
                potionsNeeded.push("Agility")
                budget -= buildings[buildingId].prices["Agility"]
                p++
            }
            if (budget > 0 && this.inventory.potions["Strength"] <= 0 && buildings[buildingId].level > 0) {
                potionsNeeded.push("Strength")
                budget -= buildings[buildingId].prices["Strength"]
                p++
            }
        }
        if (budget > 0 && this.inventory.potions["Resurrection"] <= 0 && buildings[buildingId].level > 1 && this.inventory.gold > buildings[buildingId].prices["Resurrection"] *1.2) {
            potionsNeeded.push("Resurrection")
            budget -= buildings[buildingId].prices["Resurrection"]
            p++
        }
        if (p === 0) {
            return false
        }
        let building = buildings[buildingId]
        this.potionsCount = []
        let budget2 = budget - Math.min(500, this.inventory.gold / 5)
        for (let i = 0; i < potionsNeeded.length; i++) {
            if (budget2 <= 0) {
                this.potionsCount.push(1)
            }
            if (potionsNeeded[i] !== "Resurrection") {
                let potPrice = building.prices[potionsNeeded[i]]
                let potsCount = Math.min(5,budget2 / potPrice)
                budget2 -= potsCount * potPrice
                this.potionsCount.push(Math.round(Math.max(potsCount,1)))                
            } else {
                this.potionsCount.push(1)
            }
        }

        if (potionsNeeded.length === 0) {
            return false
        }

      
        let bsize = [building.size[0] - 1, building.size[1] - 1]
        let xx = building.location.x - (bsize[0] / 2) + (Math.random() * bsize[0])
        let yy = building.location.y - (bsize[1] / 2) + (Math.random() * bsize[1]) - 1
        this.destination = {x: xx, y: yy}
        this.goingToPotionShop = true

        this.potionsNeeded = potionsNeeded
        this.buildingId = buildingId

        return true

        
      
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
        return this.hunger < 25
    }

    getStatus() {
        if (this.status === "") {
            return "Idle"
        }
        return this.status
    }

    decideToGoToDungeon() {
        let rng = Math.random()
        let rng2 = Math.random()
        let dcId = Math.floor(Math.random() * dungeonControllers.length)

        let soloChance = 0.1 * this.adventurousness
        let groupChance = 0.1 * this.adventurousness

        if (rng < soloChance) { // SOLO DUNGEON
            this.goingToDungeon = true
            this.destination = {x:dungeonControllers[dcId].location.x,y:dungeonControllers[dcId].location.y}
            this.dungeonGroup = [this]
            this.groupLeader = true
            this.dungeonId = dcId
            return true
        } else if (rng2 < groupChance) { // GROUP DUNGEON
            let group = this.findGroupForDungeon()
            if (!this.dungeonGroup) {
                return false
            }
            this.dungeonGroup = group
            this.groupLeader = true
            for (let i = 0; i<this.dungeonGroup.length; i++) {
                this.dungeonGroup[i].goingToDungeon = true
                this.dungeonGroup[i].groupLeader = true
                this.dungeonGroup[i].dungeonId = dcId
                this.dungeonGroup[i].dungeonGroup = this.dungeonGroup
                this.dungeonGroup[i].destination = {x:dungeonControllers[dcId].location.x,y:dungeonControllers[dcId].location.y}
            }
            return true
        }
        return false
    }


    updateDay() {
        if (this.age>this.maxAge) {
            if (Math.random()<0.01) {
                this.die(undefined,"Old age")
            }
        }
    }

    updateFriendship(fId, fVal) {
        if (!heroes[fId]) {
            return
        }
        if (this.friendships[fId] === undefined) {
            this.friendships[fId] = 0
            this.addLog(messages.heroLog.newFriend(heroes[fId].name))
            heroes[fId].addLog(messages.heroLog.newFriend(this.name))
        }
        let scaling = 1 - this.friendships[fId] / 100
        this.friendships[fId] += fVal * scaling
        if (heroes[fId].friendships[this.id] === undefined) {
            heroes[fId].friendships[this.id] = 0
        }
        heroes[fId].friendships[this.id] += fVal * scaling
    }

    addLog(message) {
        this.log.push({ time: realtime, message:message})
        if (this.log.length > settings.maxLogSize) {
            this.log.shift()
        }
    }

    die(location = {x: 0, y: 0},reason) {
        logs.heroes.push({time: realtime, message: "<span style='color:" + colors[this.characterClass] + "'>" + this.characterClass + "</span> <span style='color:" + colors.log.failure +"'>"+ this.name+" died ("+reason+")</span>"})
        deadHeroes.push({name: this.name, characterClass: this.characterClass, role: this.role, id: this.id, age: this.age, timeofDeath: realtime, location: location, })
        if (deadHeroes.length > settings.maxLogSizeDeadCharacters) {
            deadHeroes.shift()
        }
        if (this.sleepBuildingId !== -1) {
            const heroesList = buildings[this.sleepBuildingId].heroesList
            const index = heroesList.indexOf(this)
            if (index !== -1) {
                heroesList.splice(index, 1)
            }
        }
        if (this.hero) {
            heroes = heroes.filter(h => h !== this)
        }
        if (this instanceof Hero) {
            this.leaveTown()
        }
        this.destroyUI()
        characters = characters.filter(c => c !== this)
        delete charactersMap[this.id]
    }

    leaveTown() {
    }

    findGroupForDungeon(size = 5) {
        let group = [this]
        let healer = false
        let tank = false
        let dpses = 0
        if (this.role==="healer") {
            healer = true
        } else if (this.role==="tank") {
            tank = true
        } else {
            dpses++
        }
        let loop = 0
        const minLevel = Math.min(this.level - 2, this.level * 0.8)
        const maxLevel = Math.max(this.level + 2, this.level * 1.2)
        let rngLvl = Math.random()
        for (let i = 0; i < heroes.length; i++) {
            let hero = heroes[i]
            if (hero !== this && hero.inTown && hero.canTalk && (loop === 4 || (hero.level >= minLevel && hero.level <= maxLevel))) {
                let guildGroup = false
                if (this.inGuild && this.guildId === hero.guildId) {
                    guildGroup = true
                }
                if ((loop >= 3) || (loop === 2 && (this.friendships[hero.id] !== undefined && this.friendships[hero.id] >= 0)) || (loop === 1 && this.friendships[hero.id]!==undefined && this.friendships[hero.id] >= 10) || (loop === 0 && guildGroup)) {
                    if (hero.role==="healer" && !healer) {
                        healer = true
                        group.push(hero)
                    }
                    if (hero.role==="tank" && !tank) {
                        tank = true
                        group.push(hero)
                    }
                    if (hero.role==="dps" && dpses < size-2) {
                        dpses++
                        group.push(hero)
                    }
                }
                
            }
            if (group.length>=size) {
                break
            }
            if (i >= heroes.length-1 && loop === 3 && rngLvl > 0.7) {
                i = 0
                loop++
            }
            if (i >= heroes.length-1 && loop === 2) {
                i = 0
                loop++
            }
            if (i >= heroes.length-1 && loop<2) {
                i = 0
                loop++
            }

        }
        if (tank && healer && group.length===size)  {
            return group
        }
        return false
    }

    formGuild() {
        if (Math.random() > 0.9) {
            return false
        }
        let a = 0
        let heroes = []
        let rngStop = 10 + (Math.random()*20)
        Object.keys(this.friendships).forEach(key => {
            if (charactersMap[key] === undefined) {
                return
            }
            if (charactersMap[key].inGuild) {
                return
            }
            if (this.friendships[key] > 1) {
                a++
            } else if (this.friendships[key] >= 0 && Math.random() > 0.9) {
                a++
            }
            if (a < rngStop) {
                heroes.push(charactersMap[key])
            }
        })
        if (a >= 5) {
            let guild = new Guild(heroes, this)
            return true
        }
        return false
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