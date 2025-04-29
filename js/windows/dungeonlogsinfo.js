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
    html += "<div style='display:flex; flex-wrap:wrap;width:100%;'>"
    html += "<table style='width:100%;'>"
    html += "<tr>"
    html += "<th>Hero Name</th>"
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
        let rank = getRank(hero.rankPoints)
        let rankC = rank
        if (isMythicPlusNumber(rankC)) {
            rankC = "Mythic I"
        }

        let hero = run.heroes[i]
        let classColor = colors[hero.characterClass] || "#FFFFFF"
        let bgColor = pSBC(0.55, classColor, "#111111")
        let roleColor = colors.roles[hero.role] || "#FFFFFF"

        html += "<tr class='heroListRow' style='background-color:" + bgColor + ";'>"
        html += "<td>" + hero.name + "</td>"
        html += "<td style='color:" + roleColor + ";'>" + hero.role + "</td>"
        html += "<td>" + hero.level + "</td>"
        html += "<td>" + hero.dps + "</td>"
        html += "<td>" + hero.stDps + "</td>"
        html += "<td>" + hero.aoeDps + "</td>"
        html += "<td>" + hero.hps + "</td>"
        html += "<td>" + hero.stHps + "</td>"
        html += "<td>" + hero.aoeHps + "</td>"
        html += "<td>" + hero.dtps + "</td>"
        html += "<td>" + hero.dtpsP + "</td>"
        html += "<td>" + hero.dtpsM + "</td>"
        html += "<td>" + hero.rankPoints + "</td>"
        html += "<td style='color:" + colors.ranks[rankC] +"'>" + rank + "</td>"
        html += "<td colspan='12' style='width: 0;padding:0;margin:0;border:0;'><div class='gradientWow2'></div></td></tr>"
    }

    html += "</table>"


    html += "<span style='width:100%;'></span>" //next row



    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}

