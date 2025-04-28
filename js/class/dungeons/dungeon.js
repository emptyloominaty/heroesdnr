class DungeonController {
    currentRuns = []
    runsHistory = []
    location = {x: -500,y: 30}
    maxHistory = 100
    name = "Dungeon"
    runCount =  {success:0, escape:0, failure:0, criticalFailure: 0, total:0}

    minlvl = 1
    maxlvl = 10

    startDungeon(heroes,type = "solo") {
        let dungeonSpeed = 1
        let c = 0
        for (let i = 0; i < heroes.length; i++) {
            c+= heroes[i].speed 
        }
        dungeonSpeed = c/heroes.length
        
        this.currentRuns.push({type: type, heroes: heroes, stage: 0, dungeon: this.generateDungeon(type, 1), log: [], dungeonSpeed: dungeonSpeed})
        let run = this.currentRuns[this.currentRuns.length-1]
        this.updateStagesSpeed(run)

    }

    updateStagesSpeed(run) {
        for (let a = 0; a<run.dungeon.stages.length; a++) {
            let dps = 0
            for (let i = 0; i < run.heroes.length; i++) {
                if (run.dungeon.stages[a].enemies === "aoe") {
                    dps += run.heroes[i].aoeDps
                } else if (run.dungeon.stages[a].enemies === "st") {
                    dps += run.heroes[i].stDps
                }
            }
            run.dungeon.stages.stageSpeed = 0.25 + (dps / run.dungeon.stages[a].dpsReq)
        }
    }


    endDungeon(heroes,type,run,fail) {
        this.runCount.total++
        if (fail) {
            return
        }
        this.runCount.success++
        for (let i=0; i<heroes.length; i++) {
            heroes[i].gainGold(run.dungeon.rewards.gold)
            heroes[i].gainXp(run.dungeon.rewards.xp)
            heroes[i].gainRankPoints(run.dungeon.rewards.rankPoints)
            if (type==="solo") {
                heroes[i].statistics.dungeonSoloRuns.success++
                heroes[i].addLog(messages.heroLog.dungeonSuccess("dungeon"))
            } else if (type==="group") {
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
        let dpsChance
        let dtpsChance
        let dpsSt = 0
        let dpsAoe = 0
        let dtpsM = 0
        let dtpsP = 0
        let dpsDeficit = 0
        let dtpsDeficit = 0
        let escapeSuccess
        let criticalFailure
        let dpsMissingRatio
        let dtpsMissingRatio
        let dtpsNeededMultiplier = 1
        let dpsNeededMultiplier = 1
        let dpsMultiplier = 1
        let dtpsMultiplier = 1
        let _dps
        let _dtps
        let _dpsNeeded
        let _dtpsNeeded

        let stageResult = ""

        if (run.type==="solo") {
            dpsSt = run.heroes[0].stDps
            dpsAoe = run.heroes[0].aoeDps
            dtpsM = run.heroes[0].dtpsM + run.heroes[0].stHps
            dtpsP = run.heroes[0].dtpsP + run.heroes[0].stHps

            _dpsNeeded = stage.dpsReq
            _dtpsNeeded = stage.dtpsReq

            if (stage.enemies==="st") {
                dpsChance = (dpsSt / stage.dpsReq)
                _dps = dpsSt
            } else if (stage.enemies==="aoe") {
                dpsChance = (dpsAoe / stage.dpsReq)
                _dps = dpsAoe
            }
      
            if (stage.damageType==="magic") {
                dtpsChance = (dtpsM / stage.dtpsReq)
                _dtps = dtpsM
            } else if (stage.damageType==="physical") {
                dtpsChance = (dtpsP / stage.dtpsReq)
                _dtps = dtpsP
            }

            dpsDeficit = Math.max(0, stage.dpsReq - (dpsChance * stage.dpsReq))
            dtpsDeficit = Math.max(0, stage.dtpsReq - (dtpsChance * stage.dtpsReq))

            dpsMissingRatio = dpsDeficit / (stage.dpsReq - dpsDeficit)
            dtpsMissingRatio = dtpsDeficit / (stage.dtpsReq - dtpsDeficit)

            if (dpsChance >= 1 || dtpsChance >= 1) {
                if (dpsChance < 1) {
                    dpsMultiplier = Math.max(1, (stage.dtpsReq / dtpsChance))
                }

                if (dtpsChance < 1) {
                    dtpsMultiplier = Math.max(1, (stage.dpsReq / dpsChance))
                }
            }

            if (dtpsDeficit > 0) {
                dpsNeededMultiplier = dpsMultiplier * (1 + dtpsMissingRatio)
            } else {
                dpsNeededMultiplier = dpsMultiplier
            }

            if (dpsDeficit > 0) {
                dtpsNeededMultiplier = dtpsMultiplier * (1 + dpsMissingRatio)
            } else {
                dtpsNeededMultiplier = dtpsMultiplier
            }

            _dpsNeeded = _dpsNeeded * dpsNeededMultiplier
            _dtpsNeeded = _dtpsNeeded * dtpsNeededMultiplier

            let rngDps = 0.6 + (Math.random() / 2) //TODO:???
            if ((_dps / _dpsNeeded) > rngDps) {
                dpsSuccess = true
            }
            let rngDtps = 0.6 + (Math.random() / 2) //TODO:???
            if ((_dtps / _dtpsNeeded) > rngDtps) {
                dtpsSuccess = true
            }

            if ((dpsSuccess || dtpsSuccess)) {
                run.heroes[0].gainGold(stage.reward.gold)
                run.heroes[0].gainXp(stage.reward.xp)
                stageResult = "Success"
            } else {
                escapeChance = Math.min(1, 0.3 + (1 - dpsDeficit / stage.dpsReq) * 0.2 + (1 - dtpsDeficit / stage.dtpsReq) * 0.2)
                criticalFailureChance = Math.min(1, 0.1 + (dpsDeficit / stage.dpsReq) * 0.4 + (dtpsDeficit / stage.dtpsReq) * 0.4)

                escapeSuccess = Math.random() < escapeChance
                criticalFailure = Math.random() < criticalFailureChance

                if (escapeSuccess) {
                    stageResult = "Escape"
                    run.heroes[0].statistics.dungeonSoloRuns.escape++
                    run.heroes[0].gainRankPoints(run.dungeon.rewards.rankPoints/10)
                    this.runCount.escape++
                } else if (criticalFailure) {
                    stageResult = "Critical failure" //TODO: -skill,  50% death
                    run.heroes[0].statistics.dungeonSoloRuns.criticalFailure++
                    run.heroes[0].gainRankPoints(run.dungeon.rewards.rankPoints/5)
                    this.runCount.criticalFailure++
                } else {
                    stageResult = "Failure" //TODO: -skill
                    run.heroes[0].statistics.dungeonSoloRuns.failure++
                    run.heroes[0].gainRankPoints(run.dungeon.rewards.rankPoints/2)
                    this.runCount.failure++
                }
            }
        }
        
       
        return {
            dpsMultiplier: dpsMultiplier, dtpsMultiplier: dtpsMultiplier, dpsMissingRatio: dpsMissingRatio, dtpsMissingRatio: dtpsMissingRatio,
            dtpsNeededMultiplier: dtpsNeededMultiplier, dpsNeededMultiplier: dpsNeededMultiplier, escapeChance: escapeChance, criticalFailureChance: criticalFailureChance,
            dpsSuccess: dpsSuccess, dtpsSuccess: dtpsSuccess, dpsChance: dpsChance, dtpsChance: dtpsChance, dpsSt: dpsSt,
            dpsAoe: dpsAoe, dtpsM: dtpsM, dtpsP: dtpsP, dpsDeficit: dpsDeficit, dtpsDeficit: dtpsDeficit, escapeSuccess: escapeSuccess,
            criticalFailure: criticalFailure, _dps: _dps, _dtps: _dtps, _dpsNeeded: _dpsNeeded, _dtpsNeeded: _dtpsNeeded,stageResult:stageResult
        }

    }



    update() {
        for (let i = 0; i<this.currentRuns.length; i++) {
            let stages = this.currentRuns[i].dungeon.stages
                if (stages[this.currentRuns[i].stage].timer > 0) {
                    stages[this.currentRuns[i].stage].timer -= progress * this.currentRuns[i].dungeonSpeed * stages[this.currentRuns[i].stage].stageSpeed
                } else {
                  if (stages.length>this.currentRuns[i].stage) {
                      let log = this.finishStage(this.currentRuns[i])
                      this.currentRuns[i].log.push(log)
                      this.currentRuns[i].stage++
                      let fail = false
                      if (log.stageResult === "Escape" || log.stageResult === "Critical failure" || log.stageResult === "Failure") {
                          this.currentRuns[i].stage = stages.length
                          fail = true
                      }
                      if (stages.length===this.currentRuns[i].stage) {
                          this.endDungeon(this.currentRuns[i].heroes,this.currentRuns[i].type,this.currentRuns[i],fail)
                          for (let j = 0; j < this.currentRuns[i].heroes.length; j++) {

                              this.currentRuns[i].heroes[j].isInDungeon = false
                              this.currentRuns[i].heroes[j].status = ""
                          }
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

    generateDungeon(type,difficulty) {
        //TODO:type
        /*let numStages = Math.floor(Math.random() * 3) + 2
        let stages = []
        for (let i = 0; i < numStages; i++) {
            let enemies = i % 2 === 0 ? "aoe" : "st" //TODO:rng
            let damageType = i % 2 === 0 ? "physical" : "magic" //TODO:rng
            stages.push({
                dpsReq: 10 * difficulty, //TODO:rng
                enemies: enemies,
                dtpsReq: 4 * difficulty, //TODO:rng
                damageType: damageType,
                timer: 10 * (Math.random() * 5) //TODO: more rng + table
            })
        }*/

        let stages = [{dpsReq:4*difficulty,enemies:"aoe",dtpsReq:1*difficulty,damageType: "physical",stageSpeed:1,timer:30*(Math.random()*20),reward:{gold:Math.round(10+(Math.random()*10*difficulty)),xp:Math.round(10+(Math.random()*10*difficulty))}},
            {dpsReq:6*difficulty,enemies:"st",dtpsReq:2*difficulty,damageType: "magic",stageSpeed:1,timer:20*(Math.random()*20),reward:{gold:Math.round(10+(Math.random()*10*difficulty)),xp:Math.round(10+(Math.random()*10*difficulty))},}]
        let rewards = {rankPoints:5*difficulty,gold:Math.round(10+(Math.random()*50*difficulty)),xp: Math.round(10+(Math.random()*50*difficulty))} //TODO:items
        return {stages:stages,rewards:rewards}
    }

}

let dungeonControllers = [new DungeonController()]