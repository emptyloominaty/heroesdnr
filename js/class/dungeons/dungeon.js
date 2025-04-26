class DungeonController {
    currentRuns = []
    runsHistory = []
    location = {x: -500,y: 30}
    maxHistory = 100

    startSoloDungeon(hero) {
        let timer = 20 //TODO
        this.currentRuns.push({type:"solo",heroes:[hero],stage:0, dungeon:this.generateDungeon("solo",1)})
    }

    startGroupDungeon(heroes) {
        let timer = 20 //TODO
        this.currentRuns.push({type:"group",heroes:[heroes]})
    }

    endDungeon(heroes,type) {
        //TODO: chance - fail, critical fail, death, escape, success
        if (type==="solo") {
        }
    }

    finishStage(run) {
        let stage = run.dungeon.stages[run.stage]
        if (run.type==="solo") {
            let dpsSt = run.heroes[0].dpsSt
            let dpsAoe = run.heroes[0].dpsAoe
            let dtpsM = run.heroes[0].dtpsM + run.heroes[0].hpsSt
            let dtpsP = run.heroes[0].dtpsP + run.heroes[0].hpsSt

            let escapeChance = 0
            let criticalFailureChance = 0
            let dpsSuccess = false
            let dtpsSuccess = false
            let dpsChance
            if (stage.enemies==="st") {
               dpsChance = (dpsSt/stage.dpsReq)
            } else if (stage.enemies==="aoe") {
                dpsChance = (dpsAoe/stage.dpsReq)
            }
            let rng = 0.6+(Math.random()/2) //TODO:???
            if (dpsChance>rng) {
                dpsSuccess = true
            }

            let dtpsChance
            if (stage.damageType==="magic") {
                dtpsChance = (dtpsM/stage.dtpsReq)
            } else if (stage.damageType==="physical") {
                dtpsChance = (dtpsP/stage.dtpsReq)
            }
            rng = 0.6+(Math.random()/2) //TODO:???
            if (dtpsChance>rng) {
                dtpsSuccess = true
            }
            if (dpsSuccess && dtpsSuccess) {
                run.heroes[0].gainGold(run.rewards.gold)
                run.heroes[0].gainXp(run.rewards.xp)
            } else {
                let dpsDeficit = Math.max(0, stage.dpsReq - dpsChance * stage.dpsReq)
                let dtpsDeficit = Math.max(0, stage.dtpsReq - dtpsChance * stage.dtpsReq)

                escapeChance = Math.min(1, 0.3 + (1 - dpsDeficit / stage.dpsReq) * 0.2 + (1 - dtpsDeficit / stage.dtpsReq) * 0.2)
                criticalFailureChance = Math.min(1, 0.4 + (dpsDeficit / stage.dpsReq) * 0.4 + (dtpsDeficit / stage.dtpsReq) * 0.4)

                let escapeSuccess = Math.random() < escapeChance
                let criticalFailure = Math.random() < criticalFailureChance

                if (escapeSuccess) {

                } else if (criticalFailure) {
                    //TODO:DIE
                } else {
                    //TODO:Failure
                }

            }
        }

    }



    update() {
        for (let i = 0; i<this.currentRuns.length; i++) {
            let stages = this.currentRuns[i].dungeon.stages
                if (stages[this.currentRuns[i].stage].timer > 0) { //TODO:FIX?
                   stages[this.currentRuns[i].stage].timer -= progress
                } else {
                  if (stages.length>this.currentRuns[i].stage) {
                      this.finishStage(this.currentRuns[i])
                      this.currentRuns[i].stage++
                      //??????????????
                      if (stages.length===this.currentRuns[i].stage) {
                          this.endDungeon(this.currentRuns[i].heroes, this.currentRuns[i].type)
                          for (let j = 0; j < this.currentRuns[i].heroes.length; j++) {

                              this.currentRuns[i].heroes[j].isInDungeon = false
                              this.currentRuns[i].heroes[j].status = ""
                          }
                          this.runsHistory.push(this.currentRuns[i])
                          this.runsHistory.splice(i, 1)
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

        let stages = [{dpsReq:10*difficulty,enemies:"aoe",dtpsReq:4*difficulty,damageType: "physical",timer:10*(Math.random()*5)},
            {dpsReq:100*difficulty,enemies:"st",dtpsReq:5*difficulty,damageType: "magic",timer:10*(Math.random()*5)}]
        let rewards = {gold:Math.round(10+(Math.random()*50*difficulty)),xp: Math.round(10+(Math.random()*50*difficulty))} //TODO:items
        return {stages:stages,rewards:rewards}
    }

}

let dungeonController = new DungeonController()