class DungeonController {
    currentRuns = []
    runsHistory = []
    location = {x: -500, y: 30}
    maxHistory = settings.maxLogSizeDungeons
    name = "Dungeon"
    runCount = {success: 0, escape: 0, failure: 0, criticalFailure: 0, total: 0}

    minlvl = 1
    maxlvl = 25

    constructor (x,y,data) {
        this.location.x = x
        this.location.y = y
        console.log(data)

        if (Object.keys(data).length > 0) {
            this.minlvl = data.minlvl
            this.maxlvl = data.maxlvl

        }

        addSpellVisualEffects(this.location.x - 25, this.location.y - 25, 90, "fire", {size: 0, speed: 0, target: {x: this.location.x - 25, y: this.location.y - 25}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius:200,color:'rgba(255, 160, 80, 1)',duration:-1,decTimer:0.2})

        addSpellVisualEffects(this.location.x - 25, this.location.y + 25, 90, "fire", {size: 0, speed: 0, target: {x: this.location.x - 25, y: this.location.y + 25}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius:200,color:'rgba(255, 160, 80, 1)',duration:-1,decTimer:0.2})

        addSpellVisualEffects(this.location.x + 25, this.location.y - 25, 90, "fire", {size: 0, speed: 0, target: {x: this.location.x + 25, y: this.location.y - 25}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius:200,color:'rgba(255, 160, 80, 1)',duration:-1,decTimer:0.2})

        addSpellVisualEffects(this.location.x + 25, this.location.y + 25, 90, "fire", {size: 0, speed: 0, target: {x: this.location.x + 25, y: this.location.y + 25}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius: 200, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})


        //TEST
        addSpellVisualEffects(this.location.x + 40, this.location.y + 50, 90, "fire", {
            size: 0, speed: 0, target: {x: this.location.x + 40, y: this.location.y + 50}, color: "#ffd876", onEnd: {name: "explode", size: 1},
            onRun: {ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}
        },{radius: 200, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})
        addSpellVisualEffects(this.location.x + 50, this.location.y + 50, 90, "fire", {
            size: 0, speed: 0, target: {x: this.location.x + 50, y: this.location.y + 50}, color: "#ffd876", onEnd: {name: "explode", size: 1},
            onRun: {texture: textures.particle_fire6, ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
            {radius: 200, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})
        addSpellVisualEffects(this.location.x + 60, this.location.y + 50, 90, "fire", {
            size: 0, speed: 0, target: {x: this.location.x + 60, y: this.location.y + 50}, color: "#ffd876", onEnd: {name: "explode", size: 1},
            onRun: {texture: textures.particle_fire7, ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}
        },{radius: 200, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})
        addSpellVisualEffects(this.location.x + 70, this.location.y + 50, 90, "fire", {
            size: 0, speed: 0, target: {x: this.location.x + 70, y: this.location.y + 50}, color: "#ffd876", onEnd: {name: "explode", size: 1},
            onRun: {texture: textures.particle_fire8, ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}
        }, {radius: 200, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})

        addSpellVisualEffects(this.location.x + 80, this.location.y + 50, 90, "fire", {
            size: 0, speed: 0, target: {x: this.location.x + 80, y: this.location.y + 50}, color: "#ffd876", onEnd: {name: "explode", size: 1},
            onRun: {texture: textures.particle_fire9, ignoreLifeSize: false, name: "fire", size: 0.4, life: 1, speed: 10, area: 1.5, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}
        }, {radius: 200, color: 'rgba(255, 160, 80, 1)', duration: -1, decTimer: 0.2})

    }

    startDungeon(heroes,hero = undefined) {
        if (!heroes || heroes.length===0) {
            console.log("FIX ME!!!!!!: "+hero.name+": "+hero.goingToDungeon+" - "+hero.isInDungeon+" "+hero.groupLeader)
            return false
        }
        let level = 1
        let dungeonSpeed = 1
        let c = 0
        let avgHeroLvl = 0
        let maxHeroLvl = 0
        for (let i = 0; i < heroes.length; i++) {
            c += heroes[i].speed
            avgHeroLvl += heroes[i].level
            if (heroes[i].level > maxHeroLvl) {
                maxHeroLvl = heroes[i].level
            }
        }
        avgHeroLvl = Math.round(avgHeroLvl / heroes.length)

        if (Math.random() > 0.5) {
            level = avgHeroLvl
        } else {
            level = maxHeroLvl
        }
        //TODO:
        /*if (level > this.maxlvl) {
            level = this.maxlvl
        }*/

        dungeonSpeed = c / heroes.length
        let difficulty = 0.5
        let type
        if (heroes.length>1) {
            type = "group"
            difficulty = 4
        } else {
            type = "solo"
        }

        //TODO:dungeontype rng
        //TODO:normal,heroic,mythic   maxlevel*1.1 maxlevel*1.25

        this.currentRuns.push({type: type, heroes: heroes, level: level, stage: 0, timeStarted: realtime, timeFinished: 0, dungeon: this.generateDungeon(difficulty, level), log: [], dungeonSpeed: dungeonSpeed})
        let run = this.currentRuns[this.currentRuns.length - 1]
        this.updateStagesSpeed(run)
        for (let i = 0; i<run.dungeon.stages.length; i++) {
            run.dungeon.stages[i].chances = this.getChances(run,i)
        }
        return run.dungeon.stages
    }

    updateStagesSpeed(run) {
        for (let a = 0; a < run.dungeon.stages.length; a++) {
            let dps = 0
            for (let i = 0; i < run.heroes.length; i++) {
                if (run.dungeon.stages[a].enemies === "aoe") {
                    dps += run.heroes[i].aoeDps
                } else if (run.dungeon.stages[a].enemies === "st") {
                    dps += run.heroes[i].stDps
                }
            }
            run.dungeon.stages[a].stageSpeed = 0.25 + (dps / run.dungeon.stages[a].dpsReq)
        }
    }


    endDungeon(heroes, type, run, fail) {
        this.runCount.total++
        run.timeFinished = realtime
        if (fail) {
            return
        }
        this.runCount.success++
        for (let i = 0; i < heroes.length; i++) {
            heroes[i].gainGold(run.dungeon.rewards.gold / heroes.length)
            heroes[i].gainXp(run.dungeon.rewards.xp / heroes.length)
            heroes[i].gainRankPoints(run.dungeon.rewards.rankPoints / heroes.length)
            if (Math.random() < 0.45) {
                this.dropItem(heroes[i], run.level)
            }
            if (type === "solo") {
                heroes[i].statistics.dungeonSoloRuns.success++
                //heroes[i].addLog(messages.heroLog.dungeonSuccess("dungeon"))
            } else if (type === "group") {
                heroes[i].statistics.dungeonGroupRuns.success++
                //heroes[i].addLog(messages.heroLog.dungeonGroupSuccess("dungeon"))
            }
        }
    }

    finishStage(run) {
        let type = run.type
        let stage = run.dungeon.stages[run.stage]
        let escapeChance = 0
        let criticalFailureChance = 0
        let dpsSuccess = false
        let dtpsSuccess = false
        let dpsSt = 0
        let dpsAoe = 0
        let hpsSt = 0
        let dtpsM = 0
        let dtpsP = 0
        let escapeSuccess
        let criticalFailure
        let _dps = 0
        let _dtps = 0
        let _dpsNeeded = 0
        let _dtpsNeeded = 0

        let stageResult = ""
        let aoeHpsSum = 0
        let aoeDtpsSum = 0
        let aoeDamageTaken = 0
        let rngDps = 1
        let rngDtps = 1

        let maxInt = 0
        for (let i = 0; i < run.heroes.length; i++) {
            if (run.heroes[i].intelligence > maxInt) {
                maxInt = run.heroes[i].intelligence
            }
        }

        if (Math.random() > (1 - ((stage.chances.death / 100)*(maxInt)))) {
            stageResult = "Leave"
            return {
                rngDps,rngDtps,aoeHpsSum, aoeDtpsSum, aoeDamageTaken, escapeChance, criticalFailureChance, dpsSuccess, dtpsSuccess, dpsSt, dpsAoe, dtpsM, dtpsP, escapeSuccess, criticalFailure, _dps, _dtps, _dpsNeeded, _dtpsNeeded, stageResult
            }
        }

        let tank
        for (let i = 0; i < run.heroes.length; i++) {
            if (run.heroes[i].role === "tank") {
                tank = run.heroes[i]
                break
            }
        }
        if (!tank) {
            tank = run.heroes[0]
        }
        /*for (let i = 1; i < run.heroes.length; i++) {
            const heroDtps = (stage.damageType === "magic" ? run.heroes[i].dtpsM : run.heroes[i].dtpsP)
            const tankDtps = (stage.damageType === "magic" ? tank.dtpsM : tank.dtpsP)
            if (heroDtps > tankDtps) tank = run.heroes[i]
        }*/

        for (let i = 0; i < run.heroes.length; i++) {
            dpsSt += run.heroes[i].stDps
            dpsAoe += run.heroes[i].aoeDps
            hpsSt += run.heroes[i].stHps

            aoeHpsSum += run.heroes[i].aoeHps / run.heroes.length 
            aoeDtpsSum += (stage.damageType === "magic" ? run.heroes[i].dtpsM : run.heroes[i].dtpsP)
            aoeDamageTaken += stage.aoeDtpsReq
        }

        let aoeDtps = Math.max(0,aoeDamageTaken - (aoeHpsSum + aoeDtpsSum))

        _dpsNeeded = stage.dpsReq
        _dtpsNeeded = stage.dtpsReq + aoeDtps

        if (stage.enemies === "st") {
            _dps = dpsSt
        } else if (stage.enemies === "aoe") {
            _dps = dpsAoe
        }



        _dtps = (stage.damageType === "magic" ? tank.dtpsM : tank.dtpsP)
        _dtps += tank.stHps + hpsSt

        if (_dps < _dpsNeeded) {
            _dtpsNeeded *= _dpsNeeded / Math.max(_dps, 0.1)
        }

        if (_dtps < _dtpsNeeded) {
            _dpsNeeded *= _dtpsNeeded / Math.max(_dtps, 0.1)
        }

        rngDps = 0.7 + (Math.random() / 2)
        if ((_dps / _dpsNeeded) > rngDps) {
            dpsSuccess = true
        }
        rngDtps = 0.7 + (Math.random() / 2)
        if ((_dtps / _dtpsNeeded) > rngDtps) {
            dtpsSuccess = true
        }

        if ((dpsSuccess || dtpsSuccess)) {
            let guildId = this.guildRun(run.heroes)
            if (guildId !== -1) {
                guilds[guildId].gainRankPoints(stage.reward.rankPoints / 5) 
            }
            for (let i = 0; i < run.heroes.length; i++) {
                run.heroes[i].gainGold(stage.reward.gold / run.heroes.length)
                run.heroes[i].gainXp(stage.reward.xp / run.heroes.length)
                run.heroes[i].gainRankPoints(stage.reward.rankPoints / run.heroes.length)
                this.updateFriends(run.heroes, i, 0.1, 1)
                this.reduceSkills(run.heroes[i], -0.01, 0.001)
                if (Math.random() < 0.05) {
                    this.dropItem(run.heroes[i],run.level)
                }
            }
    
            stageResult = "Success"
        } else {
            let dpsDeficit = Math.max(0, _dpsNeeded - _dps)
            let dtpsDeficit = Math.max(0, _dtpsNeeded - _dtps)

            let heroesEscapeChance = 0
            for (let i = 0; i<run.heroes.length; i++) {
                const hero = run.heroes[i]
                heroesEscapeChance += hero.escapeChance
            }
            heroesEscapeChance = heroesEscapeChance / run.heroes.length

            escapeChance = Math.min(1, heroesEscapeChance + (1 - dpsDeficit / _dpsNeeded) * 0.2 + (1 - dtpsDeficit / _dtpsNeeded) * 0.2)
            criticalFailureChance = Math.min(1, 0.1 + (dpsDeficit / _dpsNeeded) * 0.4 + (dtpsDeficit / _dtpsNeeded) * 0.4)

            escapeSuccess = Math.random() < escapeChance
            criticalFailure = Math.random() < criticalFailureChance

            if (escapeSuccess) {
                stageResult = "Escape"
                for (let i = 0; i < run.heroes.length; i++) {
                    run.heroes[i].statistics.dungeonSoloRuns.escape++
                    this.updateFriends(run.heroes, i, 0.05, 0.5)
                }
                this.runCount.escape++
            } else if (criticalFailure) {
                stageResult = "Critical failure"
                for (let i = 0; i < run.heroes.length; i++) {
                    run.heroes[i].statistics.dungeonSoloRuns.criticalFailure++
                    this.reduceSkills(run.heroes[i], 0.01, 0.001)
                    run.heroes[i].gainRankPoints(-stage.reward.rankPoints / run.heroes.length)
                    if (Math.random() > 1 - 0.08 / Math.pow(Math.max(0.2, run.heroes[i].critFailD), 0.75)) {
                        if (run.heroes.length === 1) {
                            stageResult = "Death"
                        }
                        run.heroes[i].die(undefined, "Dungeon - Critical Failure")
                    }
                    if (Math.random() > (0.97 - (run.heroes[i].competitiveness))) {
                        this.updateFriends(run.heroes, i, 0.1, -0.5)
                    }
                }
                this.runCount.criticalFailure++
            } else {
                stageResult = "Failure"
                this.runCount.failure++
                for (let i = 0; i < run.heroes.length; i++) {
                    run.heroes[i].statistics.dungeonSoloRuns.failure++
                    run.heroes[i].gainRankPoints(-stage.reward.rankPoints / 2 / run.heroes.length)
                    if (Math.random() > 0.9995) {
                        if (run.heroes.length===1) {
                            stageResult = "Death"
                        }
                        run.heroes[i].die(undefined, "Dungeon - Failure")
                    }
                    if (Math.random() > (0.99 - (run.heroes[i].competitiveness))) {
                        this.updateFriends(run.heroes, i, 0.05, -0.25)
                    }
                }
            }
        }


        return {
            rngDps,rngDtps,aoeHpsSum, aoeDtpsSum, aoeDamageTaken, escapeChance, criticalFailureChance, dpsSuccess, dtpsSuccess, dpsSt, dpsAoe, dtpsM, dtpsP, escapeSuccess, criticalFailure, _dps, _dtps, _dpsNeeded, _dtpsNeeded, stageResult
        }
    }

    dropItem(hero, level) {
        let quality = getRandomQuality("dungeon",hero.luck)
        let slot = getRandomSlot()
        hero.itemlog.push({time: realtime, message: "New item (dungeon): " + slot + " " + level + " lvl <span style='color: " + getQualityColor(quality) + "'>" + getItemQuality(quality) + "</span>"})
        if (hero.itemlog.length > 100) {
            hero.itemlog.shift()
        }

        if (shouldReplace(hero.slots[slot].level, hero.slots[slot].quality, level, quality)) {
            hero.slots[slot] = new Item(slot, level, quality)
        } else {
            hero.inventory.gold += Math.pow(10 * level * quality, 1.4) / 5
        }
    }

    getChances(run,stageId = 0) {
        const stage = run.dungeon.stages[stageId]
        const { dpsReq, dtpsReq, enemies, damageType } = stage
        let escapeHeroesChance = 0
        let dps = 0
        let dtps = 0
        let hpsSt = 0

        let aoeHpsSum = 0
        let aoeDtpsSum = 0
        let aoeDamageTaken = 0
        let heroesCritFailD = 0

        let tank = run.heroes.find(h => h.role === "tank") || run.heroes[0]
        /*
        for (let i = 1; i < run.heroes.length; i++) {
            const heroDtps = (damageType === "magic" ? run.heroes[i].dtpsM : run.heroes[i].dtpsP)
            const tankDtps = (damageType === "magic" ? tank.dtpsM : tank.dtpsP)
            if (heroDtps > tankDtps) tank = run.heroes[i]
        }
        */

        for (let i = 0; i<run.heroes.length; i++) {
            const hero = run.heroes[i]
            let dpsH = enemies === "st" ? hero.stDps : hero.aoeDps
            hpsSt += run.heroes[i].stHps

            aoeHpsSum += hero.aoeHps / run.heroes.length
            aoeDtpsSum += (damageType === "magic" ? hero.dtpsM : hero.dtpsP)
            aoeDamageTaken += stage.aoeDtpsReq

            dps += dpsH
            escapeHeroesChance += hero.escapeChance
            heroesCritFailD += hero.critFailD
            if (run.heroes.length > 1) {
                dtps += run.heroes[i].aoeHps
            }
        }
        let aoeDtps = Math.max(0, aoeDamageTaken - (aoeHpsSum + aoeDtpsSum))

        dtps = (stage.damageType === "magic" ? tank.dtpsM : tank.dtpsP)
        dtps += tank.stHps + hpsSt 

        escapeHeroesChance = escapeHeroesChance / run.heroes.length
        heroesCritFailD = heroesCritFailD / run.heroes.length

        let _dpsNeeded = dpsReq
        let _dtpsNeeded = dtpsReq + aoeDtps

        if (dps < _dpsNeeded) _dtpsNeeded *= _dpsNeeded / Math.max(dps, 0.1)
        if (dtps < _dtpsNeeded) _dpsNeeded *= _dtpsNeeded / Math.max(dtps, 0.1)

        const rollMin = 0.7
        const rollMax = 1.2
        const rollRange = rollMax - rollMin

        const dpsRatio = dps / _dpsNeeded
        const dtpsRatio = dtps / _dtpsNeeded

        const dpsSuccessChance = Math.max(0, Math.min(1, (dpsRatio - rollMin) / rollRange))
        const dtpsSuccessChance = Math.max(0, Math.min(1, (dtpsRatio - rollMin) / rollRange))

        const successChance = dpsSuccessChance + dtpsSuccessChance - dpsSuccessChance * dtpsSuccessChance

        const dpsDeficit = Math.max(0, _dpsNeeded - dps)
        const dtpsDeficit = Math.max(0, _dtpsNeeded - dtps)

        const escapeChance = (1 - successChance) * Math.min(
            1,
            escapeHeroesChance +
            (1 - dpsDeficit / _dpsNeeded) * 0.2 +
            (1 - dtpsDeficit / _dtpsNeeded) * 0.2
        )

        const criticalFailureChance = (1 - successChance - escapeChance) * Math.min(
            1,
            0.1 +
            (dpsDeficit / _dpsNeeded) * 0.4 +
            (dtpsDeficit / _dtpsNeeded) * 0.4
        )

        const failureChance = Math.max(
            0,
            1 - successChance - escapeChance - criticalFailureChance
        )
        let deathChance = 0

        if (criticalFailureChance>0) {
            deathChance = (0.08 / Math.pow(Math.max(0.2, heroesCritFailD), 0.75))*criticalFailureChance
        }

        return {
            success: +(successChance * 100).toFixed(1),
            escape: +(escapeChance * 100).toFixed(1),
            failure: +(failureChance * 100).toFixed(1),
            criticalFailure: +(criticalFailureChance * 100).toFixed(1),
            death: +(deathChance * 100).toFixed(1)
        }
    }

    updateFriends(runheroes, i, chance, val, fixVal = 0) {
        if (runheroes.length > 1) {
            for (let j = 0; j < runheroes.length; j++) {
                runheroes[i].updateFriendship(runheroes[j].id, 0)
                if (runheroes[i] !== runheroes[j] && Math.random() < chance) {
                    runheroes[i].updateFriendship(runheroes[j].id, fixVal + Math.random() * val)
                }
                let targetT = runheroes[j]
                if (runheroes[i].guildId !== targetT.guildId) {
                    if (runheroes[i].inGuild && !targetT.inGuild && Math.random() < 0.01) {
                        guilds[runheroes[i].guildId].inviteHero(targetT)
                    }
                    if (runheroes[i].inGuild && targetT.inGuild && Math.random() < getInviteChance(runheroes[i], targetT, 0.001, 0.001, 0.005)) {
                        guilds[targetT.guildId].kickHero(targetT)
                        guilds[runheroes[i].guildId].inviteHero(targetT)
                    }
                }
            }
        }
    }


    reduceSkills(hero, val, chance) {
        for (let i = 0; i < hero.skill.length; i++) {
            let chanceMul = 1
            if (val > 0) {
                chanceMul = (0.7 / hero.skill[i])
            } else {
                chanceMul = (hero.skill[i] / 0.7)
            }
            if (Math.random() < chance * chanceMul) {
                hero.skill[i] = updateSkill(hero.skill[i], val * Math.random(), 0.4, (hero.startSkill[i]+0.7)/2, 1.0)
            }
        }
    }



    update() {
        for (let i = 0; i < this.currentRuns.length; i++) {
            let stages = this.currentRuns[i].dungeon.stages
            if (stages[this.currentRuns[i].stage].timer > 0) {
                stages[this.currentRuns[i].stage].timer -= progress * this.currentRuns[i].dungeonSpeed * stages[this.currentRuns[i].stage].stageSpeed
            } else {
                if (stages.length > this.currentRuns[i].stage) {
                    let log = this.finishStage(this.currentRuns[i])
                    this.currentRuns[i].log.push(log)
                    this.currentRuns[i].stage++
                    let fail = false
                    if (log.stageResult === "Escape" || log.stageResult === "Critical failure" || log.stageResult === "Failure" || log.stageResult === "Death" || log.stageResult === "Leave") {
                        fail = true
                    }
                    if (stages.length === this.currentRuns[i].stage || fail) {
                        this.endDungeon(this.currentRuns[i].heroes, this.currentRuns[i].type, this.currentRuns[i], fail)
                        for (let j = 0; j < this.currentRuns[i].heroes.length; j++) {
                            this.currentRuns[i].heroes[j].isInDungeon = false
                            this.currentRuns[i].heroes[j].goingToDungeon = false
                            this.currentRuns[i].heroes[j].groupLeader = false
                            this.currentRuns[i].heroes[j].status = ""
                        }

                        this.currentRuns[i].heroes2 = [...this.currentRuns[i].heroes]
                        this.currentRuns[i].heroes = []
                        for (let k = 0; k < this.currentRuns[i].heroes2.length; k++) {
                            let h = this.currentRuns[i].heroes2[k]
                            this.currentRuns[i].heroes.push({name: h.name, characterClass: h.characterClass, role: h.role, spec: h.characterSpec, level: h.level,
                                dps: h.dps, stDps: h.stDps, aoeDps: h.aoeDps, hps: h.hps, stHps: h.stHps, aoeHps: h.aoeHps, rankPoints: h.rankPoints,
                                dtps: h.dtps, dtpsP: h.dtpsP, dtpsM: h.dtpsM, age:h.age, sex:h.sex
                            })
                        }
                        this.currentRuns[i].heroes2 = null

                        this.runsHistory.push(this.currentRuns[i])
                        this.currentRuns.splice(i, 1)
                        i--
                        if (this.runsHistory.length > this.maxHistory) {
                            this.runsHistory.shift()
                        }
                    }
                }
            }
        }
    }

    guildRun(arrIn) {
        let arr = []
        for (let i = 0; i < arrIn.length; i++) {
            arr.push(arrIn[i].guildId)
        }

        const filtered = arr.filter(x => x !== -1)
        if (filtered.length === 0) return -1

        const counts = {}
        for (const num of filtered) {
            counts[num] = (counts[num] || 0) + 1
        }
        const half = Math.floor(filtered.length / 2)
        for (const [num, count] of Object.entries(counts)) {
            if (count > half) {
                return Number(num)
            }
        }

        return -1
    }


    dungeonTypes = {
        "Default": {chance: 1, minLvl:1, maxLvl:1000, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Goblin Lair": {chance: 1, minLvl:1, maxLvl:30, damageTypes:[0.95,0.05], stAoe:[0.1,0.9], bossStAoe:[0.8,0.2], stageMulChance:0.95,stageMul:0.1,stagesBase:3,stagesRng:3, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 0.7,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 20, timerRng: 20 },
        //TODO
        "Dense Forest": {chance: 1, minLvl:1, maxLvl:15, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Skeleton Crypt": {chance: 1, minLvl:1, maxLvl:45, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Spider Nest": {chance: 1, minLvl:2, maxLvl:50, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Arcane Ruins": {chance: 1, minLvl:10, maxLvl:100, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Dragon Cave": {chance: 1, minLvl:25, maxLvl:100, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Demonic Rift": {chance: 1, minLvl:50, maxLvl:100, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Haunted Manor": {chance: 1, minLvl:3, maxLvl:35, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Bandit Hideout": {chance: 1, minLvl:1, maxLvl:50, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Abandoned Mine": {chance: 1, minLvl:3, maxLvl:40, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Beast Den": {chance: 1, minLvl:5, maxLvl:20, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Forgotten Shrine": {chance: 1, minLvl:17, maxLvl:45, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Cave System": {chance: 1, minLvl:20, maxLvl:32, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Ruined Fort": {chance: 1, minLvl:12, maxLvl:60, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Volcanic Cavern": {chance: 1, minLvl:33, maxLvl:60, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
        "Vampire Keep": {chance: 1, minLvl:38, maxLvl:85, damageTypes:[0.5,0.5], stAoe:[0.4,0.6], bossStAoe:[0.8,0.2], stageMulChance:0.5,stageMul:0.2,stagesBase:2,stagesRng:6, goldBase:10, goldRng:100, xpMul: 0.5, rankMul: 1,
            stageRewards :{goldBase:10, goldRng: 50 },aoeChance:1,aoeDmgBase: 2, aoeDmgRng: 5, dpsMul:1, dtpsMul:1, speedMul:1.2, bossMul: 1.3, timerBase: 30, timerRng: 20 },
    }

    getDungVal(level,valL,valH) {
        const low = valL * Math.pow(level, 1.72)
        const high = valH * Math.pow(level, 1.87)

        if (level <= 10) return low
        if (level >= 95) return high

        
        const t = (level - 10) / (95 - 10)
        return low * (1 - t) + high * t
    }

    generateDungeon(difficulty, level, dungeonType = "Default") {
        const pickRandom = (arr, weights = null) => {
            if (!weights) return arr[Math.floor(Math.random() * arr.length)]
            const sum = weights.reduce((a, b) => a + b)
            const rnd = Math.random() * sum
            let acc = 0
            for (let i = 0; i < arr.length; i++) {
                acc += weights[i]
                if (rnd < acc) return arr[i]
            }
            return arr[arr.length - 1]
        }

        const generateStageReward = (difficulty, isBoss = false) => ({
            gold: Math.round((isBoss ? 20 : 10) + Math.random() * 10 * difficulty),
            xp: Math.round((isBoss ? 20 : 10) + Math.random() * 10 * difficulty),
            rankPoints: Math.round(1 * difficulty * (0.5 + (level*0.5))),
        })

        let numStages = Math.floor(Math.random() * 6 + 2)
        let stages = []

        let stageMulEnabled = Math.random() > 0.5

        for (let i = 0; i < numStages; i++) {
            let isBoss = i === numStages - 1
            let stageMultiplier = 1 + (i * 0.20)
            if (!stageMulEnabled) {
                stageMultiplier = 1
            }
            let enemies = pickRandom(["st", "aoe"], isBoss ? [0.8, 0.2] : [0.4, 0.6])

            let dpsMultiplier = enemies === "aoe" ? 2 : 1
            let timer = 30 + Math.random() * (isBoss ? 40 : 20)
            let dpsRng = 0.9 + (Math.random()/5)
            let dtpsRng = 0.9 + (Math.random() / 5)
            stages.push({
                dpsReq: this.getDungVal(level, 3, 3) * dpsRng * difficulty * stageMultiplier * dpsMultiplier * (isBoss ? 1.3 : 1), 
                enemies: enemies,
                dtpsReq: this.getDungVal(level, 0.75, 0.75) * dtpsRng * difficulty * stageMultiplier * (isBoss ? 1.3 : 1), 
                damageType: pickRandom(["physical", "magic"]),
                aoeDtpsReq: Math.floor(Math.random()*5), 
                stageSpeed: 1,
                timer: timer,
                timerMax: timer,
                reward: generateStageReward(difficulty, isBoss)
            })
        }

        let rewards = {
            rankPoints: 5 * difficulty * level,
            gold: Math.round(10 + (Math.random() * 50 * difficulty * level)),
            xp: Math.round(10 + (Math.random() * 50 * difficulty * level))
        }

        return { stages, rewards }
    }

}

let dungeonControllers = []

