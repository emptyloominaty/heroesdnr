let window_heroId = 0
let open_heroinfo = function (reload = false, update = false) {
    if (!reload) {
        drawHeader("Hero - "+heroes[window_heroId].name,1)
    }
    if (currentWindow[1] === "heroinfo" && !reload) {
        close_window(1)
        return
    } else {
        elements.windowBody1.innerHTML = ""
    }
    currentWindow[1] = "heroinfo"
    let html = ""
    html += "<div style='display:flex;justify-content: space-between;width:70vw;'>"
    let hero = heroes[window_heroId]
    //dps,hps,dtps
    html += "<div style='overflow:auto;width:25%;'><table> <tr><th>Dps Avg</th><th>Dps ST</th><th>Dps Aoe</th>"

    html += `  
    <tr>
      <td contenteditable="true">${getNumberString(hero.dps)}</td>
      <td contenteditable="true">${getNumberString(hero.stDps)}</td>
      <td contenteditable="true">${getNumberString(hero.aoeDps)}</td>
    </tr>
`

    html += "</table></div>"

    html += "</div>"
    html += "</div>"
    elements.windowBody1.innerHTML = html
}

