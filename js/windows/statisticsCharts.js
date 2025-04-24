//TODO:  level charts, dps charts, hps charts, dtps charts, age chart, skill charts
let open_statisticsCharts = function (reload = false, update = false) {
    let windowId = 2
    let dontClose = false
    if (!reload) {
        open_window(windowId)
        drawHeader("Statistics", windowId)
    }
    if (update) {
      //TODO:

        return
    }
    if (currentWindow[windowId] === "statisticsCharts" && !reload && !dontClose) {
        close_window(windowId)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "statisticsCharts"
    let html = ""
    html += "<div class='statistics' style='display:flex;width:80vw; flex-wrap:wrap;'>"




    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}
