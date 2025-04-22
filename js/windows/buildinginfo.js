let window_buildingId = 0
let open_buildinginfo = function (reload = false, update = false, id = false) {
    let dontClose = false
    if (id!==false) {
        window_buildingId = id
        dontClose = true
    }
    if (!reload) {
        drawHeader(buildings[window_buildingId].name,3)
    }
    if (update) {
        return
    }
    if (currentWindow[3] === "buildinginfo" && !reload && !dontClose) {
        close_window(3)
        return
    } else {
        elements.windowBody3.innerHTML = ""
    }
    currentWindow[3] = "buildinginfo"

    /*TODO: let html = ""
    html += "<div class='heroinfo' style='display:flex;width:70vw; flex-wrap:wrap;'>"
    let hero = heroes[window_heroId]


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



