let dungeonLogsLength = 0
let dungeonLogsLength2 = 0
let dungeonLogsId = 0
let open_dungeonlogs = function (btn_el = undefined, reload = false, update = false,id = false) {
    let windowId = 7
    let dontClose = false
    if (id !== false) {
        dungeonLogsId = id
        dontClose = true
    }

    if (update) {
        let runs = dungeonControllers[dungeonLogsId].runsHistory
        let runs2 = dungeonControllers[dungeonLogsId].currentRuns
        if (runs.length === dungeonLogsLength && runs2.length === dungeonLogsLength2) {
            for (let i = 0; i < runs.length; i++) {
                let run = runs[i]
                let stageLogs = run.log
                let stagesResult = stageLogs.map(obj => obj.stageResult[0]).join(" ")
                elementsWindow.dlo_finished[i].textContent = getTime2(run.timeFinished)
                elementsWindow.dlo_time[i].textContent = getTime(run.timeFinished - run.timeStarted)
                elementsWindow.dlo_stage[i].textContent = run.stage + "/" + run.dungeon.stages.length
                elementsWindow.dlo_result[i].textContent = stagesResult
            }
            for (let i = 0; i < runs2.length; i++) {
                let run = runs2[i]
                let stageLogs = run.log
                let stagesResult = stageLogs.map(obj => obj.stageResult[0]).join(" ")
                elementsWindow.dloc_stage[i].textContent = run.stage + "/" + run.dungeon.stages.length
                elementsWindow.dloc_result[i].textContent = stagesResult
            }
            return
        }
    }


    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("List of Dungeon runs", windowId,btn_el)
    }
    if (currentWindow[windowId] === "dungeonlogs" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "dungeonlogs"



    let html = ""
    html += "<div style='display:flex; flex-wrap:wrap;'>"
    html += `<div style='overflow:auto;width:100%;'><table><tr class='heroListFirstRow'>
        <th class="statsHeaderTh" onclick="sortTable('type',${windowId})" data-sortkey='type'>Name</th>
        <th class="statsHeaderTh" onclick="sortTable('level',${windowId})" data-sortkey='level'>Level</th>    
        <th class="statsHeaderTh" onclick="sortTable('tank',${windowId})" data-sortkey='Tanks'>Tanks</th>
        <th class="statsHeaderTh" onclick="sortTable('healer',${windowId})" data-sortkey='Healers'>Healers</th>
        <th class="statsHeaderTh" onclick="sortTable('dps',${windowId})" data-sortkey='dps'>Dpses</th>  

        <th class="statsHeaderTh" onclick="sortTable('started',${windowId})" data-sortkey='started'>Started</th>  
        <th class="statsHeaderTh" onclick="sortTable('finished',${windowId})" data-sortkey='finished'>Finished</th>  
        <th class="statsHeaderTh" onclick="sortTable('time',${windowId})" data-sortkey='time'>Time</th>  

        <th class="statsHeaderTh" onclick="sortTable('stage',${windowId})" data-sortkey='stage'>Stage</th>              
        <th class="statsHeaderTh" onclick="sortTable('result',${windowId})" data-sortkey='result'>Result</th></tr>`
    let runs = dungeonControllers[dungeonLogsId].currentRuns
    for (let i = 0; i < runs.length; i++) {
        let run = runs[i]
        let tankHeroes = run.heroes.filter(h => h.role === 'tank').map(h =>
            `<span style="color:${colors[h.characterClass]}">${h.name}</span>`
        ).join(" ")
        let healerHeroes = run.heroes.filter(h => h.role === 'healer').map(h =>
            `<span style="color:${colors[h.characterClass]}">${h.name}</span>`
        ).join(" ")
        let dpsHeroes = run.heroes.filter(h => h.role === 'dps').map(h =>
            `<span style="color:${colors[h.characterClass]}">${h.name}</span>`
        ).join(" ")
        let stageLogs = run.log
        let stagesResult = ""
        stagesResult = stageLogs.map(obj => obj.stageResult[0]).join(" ")
        html += "<tr class='heroListRow' onclick='open_dungeonlogsinfo(undefined,false,false," + i + ",false)'>" + 
            "<td data-sortkey='type' id='dloc_type" + i + "'>" + runs[i].type + "</td><td data-sortkey='level' id='dloc_level" + i + "'>" + run.level + "</td><td data-sortkey='tank' id='dloc_tank" + i + "'>" + tankHeroes + "</td>" +
            "<td data-sortkey='healer' id='dloc_healer" + i + "'>" + healerHeroes + "</td><td data-sortkey='dps' id='dloc_dps" + i + "'>" + dpsHeroes + "</td>" +
            "<td data-sortkey='started' id='dloc_started" + i + "'>" + getTime2(run.timeStarted) + "</td><td data-sortkey='finished' id='dloc_finished" + i + "'></td>" +

            "<td data-sortkey='time' id='dloc_time" + i + "'> </td><td data-sortkey='stage' id='dloc_stage" + i + "'>" + run.stage + "/" + run.dungeon.stages.length + "</td>" +
            "<td data-sortkey='result' id='dloc_result" + i + "'>" + stagesResult + "</td></tr>"
    }
    runs = dungeonControllers[dungeonLogsId].runsHistory
    for (let i = 0; i < runs.length; i++) {
        let run = runs[i]
        let tankHeroes = run.heroes.filter(h => h.role === 'tank').map(h =>
            `<span style="color:${colors[h.characterClass]}">${h.name}</span>`
        ).join(" ")
        let healerHeroes = run.heroes.filter(h => h.role === 'healer').map(h =>
            `<span style="color:${colors[h.characterClass]}">${h.name}</span>`
        ).join(" ")
        let dpsHeroes = run.heroes.filter(h => h.role === 'dps').map(h =>
            `<span style="color:${colors[h.characterClass]}">${h.name}</span>`
        ).join(" ")
        let stageLogs = run.log
        let stagesResult = ""
        stagesResult = stageLogs.map(obj => obj.stageResult[0]).join(" ")
        html += "<tr class='heroListRow' onclick='open_dungeonlogsinfo(undefined,false,false," + i +",true)'>"+
            "<td data-sortkey='type' id='dlo_type" + i + "'>" + runs[i].type + "</td><td data-sortkey='level' id='dlo_level" + i + "'>" + run.level + "</td><td data-sortkey='tank' id='dlo_tank" + i + "'>" + tankHeroes + "</td>" +
            "<td data-sortkey='healer' id='dlo_healer" + i + "'>" + healerHeroes + "</td><td data-sortkey='dps' id='dlo_dps" + i + "'>" + dpsHeroes + "</td>" +
            "<td data-sortkey='started' id='dlo_started" + i + "'>" + getTime2(run.timeStarted) + "</td><td data-sortkey='finished' id='dlo_finished" + i + "'>" + getTime2(run.timeFinished) + "</td>" +

            "<td data-sortkey='time' id='dlo_time" + i + "'>" + getTime(run.timeFinished-run.timeStarted) + "</td><td data-sortkey='stage' id='dlo_stage"+i+"'>" + run.stage+"/"+run.dungeon.stages.length + "</td>"+
            "<td data-sortkey='result' id='dlo_result" + i + "'>" + stagesResult + "</td></tr>"
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.dlo_type = []
    elementsWindow.dlo_tank = []
    elementsWindow.dlo_healer = []
    elementsWindow.dlo_dps = []
    elementsWindow.dlo_stage = []
    elementsWindow.dlo_level = []
    elementsWindow.dlo_result = []
    elementsWindow.dlo_started = []
    elementsWindow.dlo_finished = []
    elementsWindow.dlo_time = []

    elementsWindow.dloc_type = []
    elementsWindow.dloc_tank = []
    elementsWindow.dloc_healer = []
    elementsWindow.dloc_dps = []
    elementsWindow.dloc_stage = []
    elementsWindow.dloc_level = []
    elementsWindow.dloc_result = []
    elementsWindow.dloc_started = []
    elementsWindow.dloc_finished = []
    elementsWindow.dloc_time = []


    for (let i = 0; i < dungeonControllers[dungeonLogsId].runsHistory.length; i++) {
        elementsWindow.dlo_type.push(document.getElementById("dlo_type"+i))
        elementsWindow.dlo_tank.push(document.getElementById("dlo_tank"+i))
        elementsWindow.dlo_healer.push(document.getElementById("dlo_healer"+i))
        elementsWindow.dlo_dps.push(document.getElementById("dlo_dps"+i))
        elementsWindow.dlo_stage.push(document.getElementById("dlo_stage" + i))
        elementsWindow.dlo_level.push(document.getElementById("dlo_level" + i))
        elementsWindow.dlo_result.push(document.getElementById("dlo_result" + i))
        elementsWindow.dlo_started.push(document.getElementById("dlo_started" + i))
        elementsWindow.dlo_finished.push(document.getElementById("dlo_finished" + i))
        elementsWindow.dlo_time.push(document.getElementById("dlo_time" + i))
    }

    for (let i = 0; i < dungeonControllers[dungeonLogsId].currentRuns.length; i++) {
        elementsWindow.dloc_type.push(document.getElementById("dloc_type" + i))
        elementsWindow.dloc_tank.push(document.getElementById("dloc_tank" + i))
        elementsWindow.dloc_healer.push(document.getElementById("dloc_healer" + i))
        elementsWindow.dloc_dps.push(document.getElementById("dloc_dps" + i))
        elementsWindow.dloc_stage.push(document.getElementById("dloc_stage" + i))
        elementsWindow.dloc_level.push(document.getElementById("dloc_level" + i))
        elementsWindow.dloc_result.push(document.getElementById("dloc_result" + i))
        elementsWindow.dloc_started.push(document.getElementById("dloc_started" + i))
        elementsWindow.dloc_finished.push(document.getElementById("dloc_finished" + i))
        elementsWindow.dloc_time.push(document.getElementById("dloc_time" + i))
    }

    dungeonLogsLength = dungeonControllers[dungeonLogsId].runsHistory.length
    dungeonLogsLength2 = dungeonControllers[dungeonLogsId].currentRuns.length
}

