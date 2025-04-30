class DungeonController {
    currentRuns = []
    runsHistory = []
    location = {x: -500, y: 30}
    maxHistory = settings.maxLogSizeDungeons
    name = "Dungeon"
    runCount = {success: 0, escape: 0, failure: 0, criticalFailure: 0, total: 0}

    minlvl = 1
    maxlvl = 10

    startDungeon(heroes,hero = undefined) {
        if (!heroes || heroes.length===0) {
            console.log("FIX ME!!!!!!: "+hero.name+": "+hero.goingToDungeon+" - "+hero.isInDungeon+" "+hero.groupLeader)
            return false
        }
        //TODO: level
        let level = 1
        let dungeonSpeed = 1
        let c = 0
        for (let i = 0; i < heroes.length; i++) {
            c += heroes[i].speed
        }
        dungeonSpeed = c / heroes.length
        let difficulty = 0.75
        let type
        if (heroes.length>1) {
            type = "group"
            difficulty = 5
        } else {
            type = "solo"
        }

        this.currentRuns.push({type: type, heroes: heroes, level: level, stage: 0, timeStarted: realtime, timeFinished: 0, dungeon: this.generateDungeon(difficulty, level), log: [], dungeonSpeed: dungeonSpeed})
        let run = this.currentRuns[this.currentRuns.length - 1]
        this.updateStagesSpeed(run)
        for (let i = 0; i<run.dungeon.stages.length; i++) {
            run.dungeon.stages[i].chances = this.getChances(run,i) //TODO: if crit/fail>x% leavedungeon
        }
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
            if (type === "solo") {
                heroes[i].statistics.dungeonSoloRuns.success++
                heroes[i].addLog(messages.heroLog.dungeonSuccess("dungeon"))
            } else if (type === "group") {
                heroes[i].statistics.dungeonGroupRuns.success++
                heroes[i].addLog(messages.heroLog.dungeonGroupSuccess("dungeon"))
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
        let dtpsM = 0
        let dtpsP = 0
        let escapeSuccess
        let criticalFailure
        let _dps = 0
        let _dtps = 0
        let _dpsNeeded = 0
        let _dtpsNeeded = 0

        let stageResult = ""

        if (stage.chances.death > 8 && Math.random() > 0.8 - (stage.chances.death/100)) {
            stageResult = "Leave"
            return {
                escapeChance, criticalFailureChance, dpsSuccess, dtpsSuccess, dpsSt, dpsAoe, dtpsM, dtpsP, escapeSuccess, criticalFailure, _dps, _dtps, _dpsNeeded, _dtpsNeeded, stageResult
            }
        }

        for (let i = 0; i<run.heroes.length; i++) {
            dpsSt += run.heroes[i].stDps
            dpsAoe += run.heroes[i].aoeDps
            dtpsM += run.heroes[i].dtpsM + run.heroes[i].stHps
            dtpsP += run.heroes[i].dtpsP + run.heroes[i].stHps
            if (run.heroes.length>1) {
                dtpsM += run.heroes[i].aoeHps
                dtpsP += run.heroes[i].aoeHps
            }
        }


        _dpsNeeded = stage.dpsReq
        _dtpsNeeded = stage.dtpsReq + (stage.aoeDtpsReq * run.heroes.length)

        if (stage.enemies === "st") {
            _dps = dpsSt
        } else if (stage.enemies === "aoe") {
            _dps = dpsAoe
        }

        if (stage.damageType === "magic") {
            _dtps = dtpsM
        } else if (stage.damageType === "physical") {
            _dtps = dtpsP
        }

        if (_dps < _dpsNeeded) {
            _dtpsNeeded *= _dpsNeeded / Math.max(_dps, 0.1)
        }

        if (_dtps < _dtpsNeeded) {
            _dpsNeeded *= _dtpsNeeded / Math.max(_dtps, 0.1)
        }

        let rngDps = 0.7 + (Math.random() / 2)
        if ((_dps / _dpsNeeded) > rngDps) {
            dpsSuccess = true
        }
        let rngDtps = 0.7 + (Math.random() / 2)
        if ((_dtps / _dtpsNeeded) > rngDtps) {
            dtpsSuccess = true
        }

        if ((dpsSuccess || dtpsSuccess)) {
            for (let i = 0; i < run.heroes.length; i++) {
                run.heroes[i].gainGold(stage.reward.gold / run.heroes.length)
                run.heroes[i].gainXp(stage.reward.xp / run.heroes.length)
                run.heroes[i].gainRankPoints(stage.reward.rankPoints / run.heroes.length)
                this.updateFriends(heroes, i, 0.1, 1)
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
                    this.updateFriends(heroes, i, 0.05, 0.5)
                }
                this.runCount.escape++
            } else if (criticalFailure) {
                stageResult = "Critical failure"
                for (let i = 0; i < run.heroes.length; i++) {
                    run.heroes[i].statistics.dungeonSoloRuns.criticalFailure++
                    this.reduceSkills(run.heroes[i], 0.02, 0.05)
                    run.heroes[i].gainRankPoints(-stage.reward.rankPoints / run.heroes.length)
                    if (Math.random() > 1 - 0.25 / Math.pow(Math.max(0.2, run.heroes[i].critFailD), 0.75)) {
                        if (run.heroes.length === 1) {
                            stageResult = "Death"
                        }
                        run.heroes[i].die(undefined, "Dungeon - Critical Failure")
                    } else {
                        this.updateFriends(heroes, i, 0.1, -0.5)
                    }
                }
                this.runCount.criticalFailure++
            } else {
                stageResult = "Failure"
                this.runCount.failure++
                for (let i = 0; i < run.heroes.length; i++) {
                    run.heroes[i].statistics.dungeonSoloRuns.failure++
                    this.reduceSkills(run.heroes[i], 0.01, 0.01)
                    run.heroes[i].gainRankPoints(-stage.reward.rankPoints / 2 / run.heroes.length)
                    if (Math.random() > 0.995) {
                        if (run.heroes.length===1) {
                            stageResult = "Death"
                        }
                        run.heroes[i].die(undefined, "Dungeon - Failure")
                    }
                    this.updateFriends(heroes, i, 0.05, -0.25)
                    
                }
            }
        }


        return {
            escapeChance, criticalFailureChance, dpsSuccess, dtpsSuccess, dpsSt, dpsAoe, dtpsM, dtpsP, escapeSuccess, criticalFailure, _dps, _dtps, _dpsNeeded, _dtpsNeeded, stageResult
        }
    }

    getChances(run,stageId = 0) {
        const stage = run.dungeon.stages[stageId]
        const { dpsReq, dtpsReq, enemies, damageType } = stage
        let escapeHeroesChance = 0
        let dps = 0
        let dtps = 0

        let heroesCritFailD = 0

        for (let i = 0; i<run.heroes.length; i++) {
            const hero = run.heroes[i]
            let dpsH = enemies === "st" ? hero.stDps : hero.aoeDps
            let dtpsH = damageType === "magic" ? hero.dtpsM + hero.stHps : hero.dtpsP + hero.stHps
            dps += dpsH
            dtps += dtpsH
            escapeHeroesChance += hero.escapeChance
            heroesCritFailD += hero.critFailD
            if (run.heroes.length > 1) {
                dtps += run.heroes[i].aoeHps
            }
        }

        escapeHeroesChance = escapeHeroesChance / run.heroes.length
        heroesCritFailD = heroesCritFailD / run.heroes.length

        let _dpsNeeded = dpsReq
        let _dtpsNeeded = dtpsReq  + (stage.aoeDtpsReq * run.heroes.length)

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
            deathChance = (0.25 / Math.pow(Math.max(0.2, heroesCritFailD), 0.75))*criticalFailureChance
        }

        return {
            success: +(successChance * 100).toFixed(1),
            escape: +(escapeChance * 100).toFixed(1),
            failure: +(failureChance * 100).toFixed(1),
            criticalFailure: +(criticalFailureChance * 100).toFixed(1),
            death: +(deathChance * 100).toFixed(1)
        }
    }

    updateFriends(heroes, i, chance, val, fixVal = 0) {
        if (heroes.length > 1) {
            for (let j = 0; j < heroes.length; j++) {
                heroes[i].updateFriendship(heroes[j].id, 0)
                if (heroes[i] !== heroes[j] && Math.random() < chance) {
                    heroes[i].updateFriendship(heroes[j].id, fixVal + Math.random()*val)
                }
            }
        }
    }


    reduceSkills(hero, val, chance) {
        for (let i = 0; i < hero.skill.length; i++) {
            if (Math.random() > chance) {
                hero.skill[i] -= val
                if (hero.skill[i] < 0.05) {
                    hero.skill[i] = 0.05
                }
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

    generateDungeon(difficulty, level) {
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
            let dpsRng = 0.75+(Math.random()/2)
            let dtpsRng = 0.75 + (Math.random() / 2)
            stages.push({
                dpsReq: 8 * dpsRng * difficulty * stageMultiplier * dpsMultiplier * (isBoss ? 1.3 : 1) * (0.5 + (level * 0.5)),
                enemies: enemies,
                dtpsReq: 4 * dtpsRng * difficulty * stageMultiplier * (isBoss ? 1.3 : 1) * (0.5 + (level * 0.5)),
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

let dungeonControllers = [new DungeonController()]