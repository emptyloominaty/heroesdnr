//TODO:  level charts, dps charts, hps charts, dtps charts, age chart, skill charts
let open_statisticsCharts = function (btn_el = undefined, reload = false, update = false) {
    let windowId = 5
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Statistics", windowId,btn_el)
    }
    if (update) {
      //TODO:

        return
    }
    if (currentWindow[windowId] === "statisticsCharts" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "statisticsCharts"
    let html = ""
    html += "<div class='statistics' style='display:flex; flex-wrap:wrap;'>"

    html += `<div id="sch_chart"></div>`

    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow["testchart" + windowId] = document.getElementById("sch_chart")

    let incomeLogX = []
    let x = realtime
    for (let i = 0; i < incomeLog.length; i++) {
        incomeLogX.unshift(x / 720)
        x -= 720
    }
    //TODO TEST
    let testChart = new Chart(elementsWindow["testchart" + windowId],incomeLogX, incomeLog)

}
