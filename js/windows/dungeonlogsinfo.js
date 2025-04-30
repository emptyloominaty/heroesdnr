let dungeonLogsInfoId = 0
let open_dungeonlogsinfo = function (btn_el = undefined, reload = false, update = false, id = false, oldRuns = false) {
    let windowId = 1
    let dontClose = false
    if (id !== false) {
        dungeonLogsInfoId = id
        dontClose = true
    }

    let run
    if (oldRuns) {
        if (dungeonControllers[dungeonLogsId] && dungeonControllers[dungeonLogsId].runsHistory && dungeonControllers[dungeonLogsId].runsHistory[dungeonLogsInfoId]) {
            run = dungeonControllers[dungeonLogsId].runsHistory[dungeonLogsInfoId]
        }
    } else {
        if (dungeonControllers[dungeonLogsId] && dungeonControllers[dungeonLogsId].currentRuns && dungeonControllers[dungeonLogsId].currentRuns[dungeonLogsInfoId]) {
            run = dungeonControllers[dungeonLogsId].currentRuns[dungeonLogsInfoId]
        }
    }



    if (update) {
        //DONT
    }

    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Dungeon run", windowId,btn_el)
    }
    if (currentWindow[windowId] === "dungeonlogsinfo" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }

    if (!run) {
        return false
    }

    currentWindow[windowId] = "dungeonlogsinfo"
    let html = ""
    html += "<div style='display:flex; flex-wrap:wrap;'><div  style='overflow:auto;width:100%;'>"
    html += "<div><table >"
    html += "<tr>"
    html += "<th>Hero Name</th>"
    html += "<th></th>"
    html += "<th>Role</th>"
    html += "<th>Level</th>"
    html += "<th>DPS</th>"
    html += "<th>ST DPS</th>"
    html += "<th>AOE DPS</th>"
    html += "<th>HPS</th>"
    html += "<th>ST HPS</th>"
    html += "<th>AOE HPS</th>"
    html += "<th>DTPS</th>"
    html += "<th>DTPS P</th>"
    html += "<th>DTPS M</th>"
    html += "<th>Rank Points</th>"
    html += "<th>Rank</th>"
    html += "</tr>"

    for (let i = 0; i < run.heroes.length; i++) {
        let hero = run.heroes[i]
        let classColor = colors[hero.characterClass] || "#FFFFFF"
        let bgColor = pSBC(0.55, classColor, "#111111")
        let roleColor = colors.roles[hero.role] || "#FFFFFF"

        let rank = getRank(hero.rankPoints)
        let rankC = rank
        if (isMythicPlusNumber(rankC)) {
            rankC = "Mythic I"
        }

        html += "<tr class='heroListRow' style='background-color:" + bgColor + ";'>"
        html += "<td>" + hero.name + "</td>"
        html += "<td>" + hero.sex.charAt(0).toUpperCase() + " " + Math.floor(hero.age) + "</td>"
        html += "<td style='color:" + roleColor + ";'>" + hero.role + "</td>"
        html += "<td>" + hero.level + "</td>"
        html += "<td>" + getNumberString(hero.dps) + "</td>"
        html += "<td>" + getNumberString(hero.stDps) + "</td>"
        html += "<td>" + getNumberString(hero.aoeDps) + "</td>"
        html += "<td>" + getNumberString(hero.hps) + "</td>"
        html += "<td>" + getNumberString(hero.stHps) + "</td>"
        html += "<td>" + getNumberString(hero.aoeHps) + "</td>"
        html += "<td>" + getNumberString(hero.dtps) + "</td>"
        html += "<td>" + getNumberString(hero.dtpsP) + "</td>"
        html += "<td>" + getNumberString(hero.dtpsM) + "</td>"
        html += "<td>" + getNumberString(hero.rankPoints) + "</td>"
        html += "<td style='color:" + colors.ranks[rankC] + "'>" + rank + "</td>"

        html += "<td colspan='12' style='width: 0;padding:0;margin:0;border:0;'><div class='gradientWow2'></div></td></tr>"
    }

    html += "</table></div>"

    html += "<span style='width:100%;'></span>" //next row

    //dungeonSpeed, dungeon.rewards.gold, dungeon.rewards.xp, dungeon.rewards.rankPoints

    //table 
    for (let i = 0; i < run.dungeon.stages.length; i++) {
        let stage = run.dungeon.stages[i]
        let log = run.log[i]
        //log._dps, log._dpsNeeded, stage.enemies, log._dtps, log._dtpsNeeded, stage.damageType, stage.stageSpeed, log.stageResult, stage.reward.gold, stage.reward.xp
    }

    html += '<div style="padding-top:1vw"><table><thead><tr><th>Stage</th><th>DPS</th><th>DPS Needed</th><th>Enemies</th><th>DTPS</th><th>DTPS Needed</th><th>Damage Type</th><th>Speed</th><th>Result</th><th>Time</th><th>Gold</th><th>XP</th><th>Rank Points</th><th>S/E/F/C (D) %</th></tr></thead><tbody>';

    for (let i = 0; i < run.dungeon.stages.length; i++) {
        let stage = run.dungeon.stages[i];
        let log = run.log[i];
        if (!log) {
            log = {_dps: "", _dpsNeeded: "", _dtps: "", _dtpsNeeded:"",stageResult:""}
        }


        html += `<tr>
                <td>${i + 1}</td>
                <td>${getNumberString(log._dps)}</td>
                <td>${getNumberString(log._dpsNeeded)+"/"+getNumberString(stage.dpsReq)}</td>
                <td>${stage.enemies}</td>
                <td>${getNumberString(log._dtps)}</td>
                <td>${getNumberString(log._dtpsNeeded)+"/"+getNumberString(stage.dtpsReq)}</td>
                <td>${stage.damageType}</td>
                <td>${Math.round(stage.stageSpeed*100)/100}</td>
                <td style="color:${colors[log.stageResult]}">${log.stageResult}</td>
                <td>${getTime(stage.timerMax/stage.stageSpeed/run.dungeonSpeed)}</td>
                <td>${Math.round(stage.reward.gold)}</td>
                <td>${Math.round(stage.reward.xp)}</td>
                <td>${Math.round(stage.reward.rankPoints*10)/10}</td>
                <td><span style="color:#4fef4f">${stage.chances.success}</span>/<span style="color:#eee044">${stage.chances.escape}</span>/<span style="color:#ee9944">${stage.chances.failure}</span>/<span style="color:#ff4444">${stage.chances.criticalFailure}</span> <span style="color:#b01616">(${stage.chances.death})</span></td>
              </tr>`;
    }

    //TODO: dungeon rewards + dungeons info?

    html += '</tbody></table></div>';



    html += "</div></div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}

