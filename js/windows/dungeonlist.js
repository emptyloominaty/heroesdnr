let dungeonListLength = 0
let open_dungeonlist = function (btn_el = undefined, reload = false, update = false) {
    let windowId = 6
    if (update) {
        if (dungeonControllers.length === dungeonListLength) {
            for (let i = 0; i < dungeonControllers.length; i++) {
                let dungeon = dungeonControllers[i]
                elementsWindow.dl_dungeonName[i].textContent = dungeon.name
                elementsWindow.dl_currentRuns[i].textContent = dungeon.currentRuns.length
                elementsWindow.dl_totalRuns[i].textContent = getNumberString(dungeon.runCount.total)
                elementsWindow.dl_runs[i].textContent = getNumberString(dungeon.runCount.success) + "/" + getNumberString(dungeon.runCount.escape) + "/" + getNumberString(dungeon.runCount.failure) + "/" + getNumberString(dungeon.runCount.criticalFailure)

                elementsWindow.dl_level[i].textContent = dungeon.minlvl + "-" + dungeon.maxlvl

                elementsWindow.dl_location[i].textContent = "x:" + Math.round(dungeon.location.x) + " y:" + Math.round(dungeon.location.y)
            }
            return
        }
    }


    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("List of Dungeons", windowId, btn_el)
    }
    if (currentWindow[windowId] === "dungeonlist" && !reload) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "dungeonlist"



    let html = ""
    html += "<div style='display:flex; flex-wrap:wrap;width:100%;'>"
    html += `<div style='overflow:auto;width:100%;'><table><tr class='heroListFirstRow'>
        <th class="statsHeaderTh" onclick="sortTable('dungeonName',${windowId})" data-sortkey='dungeonName'>Name</th>
        <th class="statsHeaderTh" onclick="sortTable('currentRuns',${windowId})" data-sortkey='currentRuns'>Current runs</th>
        <th class="statsHeaderTh" onclick="sortTable('totalRuns',${windowId})" data-sortkey='totalRuns'>Total runs</th>
        
        <th class="statsHeaderTh" onclick="sortTable('runs',${windowId})" data-sortkey='runs'>Success/Escape/Failure/Critical Failure</th>    
        <th class="statsHeaderTh" onclick="sortTable('level',${windowId})" data-sortkey='level'>Level</th>              
        <th class="statsHeaderTh" onclick="sortTable('location',${windowId})" data-sortkey='location'>Location</th></tr>`
    for (let i = 0; i < dungeonControllers.length; i++) {
        let dungeon = dungeonControllers[i]
        let runs = dungeon.runCount.success + "/" + dungeon.runCount.escape + "/" + dungeon.runCount.failure + "/" + dungeon.runCount.criticalFailure
        html += "<tr class='heroListRow' onclick='open_dungeonlogs(undefined,false,false," + i + ")'>" +
            "<td data-sortkey='dungeonName' id='dl_dungeonName" + i + "'>" + dungeon.name + "</td><td data-sortkey='currentRuns' id='dl_currentRuns" + i + "'>" + dungeon.currentRuns.length + "</td>" +
            "<td data-sortkey='totalRuns' id='dl_totalRuns" + i + "'>>" + dungeon.runCount.total + "</td><td data-sortkey='runs' id='dl_runs" + i + "'>>" + runs + "</td>" +
            "<td data-sortkey='level' id='dl_level" + i + "'>>" + dungeon.minlvl + "-" + dungeon.maxlvl + "</td>" +
            "<td data-sortkey='location' id='dl_location" + i + "'>x:" + Math.round(dungeon.location.x) + " y:" + Math.round(dungeon.location.y) + "</td></tr>"
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.dl_dungeonName = []
    elementsWindow.dl_currentRuns = []
    elementsWindow.dl_totalRuns = []
    elementsWindow.dl_runs = []
    elementsWindow.dl_level = []
    elementsWindow.dl_location = []
    for (let i = 0; i < heroes.length; i++) {
        elementsWindow.dl_dungeonName.push(document.getElementById("dl_dungeonName" + i))
        elementsWindow.dl_currentRuns.push(document.getElementById("dl_currentRuns" + i))
        elementsWindow.dl_totalRuns.push(document.getElementById("dl_totalRuns" + i))
        elementsWindow.dl_runs.push(document.getElementById("dl_runs" + i))
        elementsWindow.dl_level.push(document.getElementById("dl_level" + i))
        elementsWindow.dl_location.push(document.getElementById("dl_location" + i))
    }
    dungeonListLength = dungeonControllers.length
}



