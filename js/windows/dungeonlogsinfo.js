let dungeonLogsInfoId = 0
let open_dungeonlogsinfo = function (btn_el = undefined, reload = false, update = false, id = false, oldRuns = false) {
    let run
    if (oldRuns) {
        run = dungeonControllers[dungeonLogsId].runsHistory[dungeonLogsInfoId]
    } else {
        run = dungeonControllers[dungeonLogsId].currentRuns[dungeonLogsInfoId]
    }


    let windowId = 1
    let dontClose = false
    if (id !== false) {
        dungeonLogsInfoId = id
        dontClose = true
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
    currentWindow[windowId] = "dungeonlogsinfo"



    let html = ""
    html += "<div style='display:flex; flex-wrap:wrap;width:100%;'>"


    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}

