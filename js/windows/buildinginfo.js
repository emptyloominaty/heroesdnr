let window_buildingId = 0
let open_buildinginfo = function (reload = false, update = false, id = false) {
    let windowId = 3
    let dontClose = false
    if (id!==false) {
        window_buildingId = id
        dontClose = true
    }
    if (!reload) {
        open_window(windowId)
        drawHeader(buildings[window_buildingId].name, windowId)
    }
    let building = buildingsMap[window_buildingId]
    if (update) {
        return
    }
    if (currentWindow[windowId] === "buildinginfo" && !reload && !dontClose) {
        close_window(windowId)
        return
    } else {
        elements["windowBody"+windowId].innerHTML = ""
    }
    currentWindow[windowId] = "buildinginfo"

    /*TODO: let html = ""
    html += "<div class='heroinfo' style='display:flex;width:70vw; flex-wrap:wrap;'>"



    html += "<div class='heroinfoText'></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Xp</th><th>Next Level</th></tr>"
    html += `  
    <tr>
      <td id="hi_xp">${getNumberString2(hero.xp)}</td>
      <td id="hi_xpNeed">${getNumberString2(hero.xpNeed)}</td>
    </tr>`

    html += "</table></div>"

    html += "</div>"
    html += "</div>"
    elements.windowBody3.innerHTML = html*/
}



