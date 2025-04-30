let open_logs = function (btn_el = undefined, reload = false, update = false) {
    let windowId = 8
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Logs", windowId,btn_el)
    }
    if (update) {
      //TODO:

        return
    }
    if (currentWindow[windowId] === "logs" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "logs"
    let html = ""
    html += "<div class='statistics' style='display:flex; flex-wrap:wrap;'>"

    let logText = ""
    for (let i = logs.heroes.length - 1; i >= 0; i--) {
        let log = logs.heroes[i]
        logText += "<span style='color:" + colors.logTime + "'>" + getTime2(log.time) + "</span>: " + log.message + "<br>"
    }
    html += `<div id="mainlog">${logText}</div> `


    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}
