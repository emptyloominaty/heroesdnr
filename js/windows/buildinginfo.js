let window_buildingId = 0
let open_buildinginfo = function (btn_el = undefined, reload = false, update = false, id = false) {
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
        //TODO:
        return
    }
    if (currentWindow[windowId] === "buildinginfo" && !reload && !dontClose) {
        close_window(windowId)
        return
    } else {
        elements["windowBody"+windowId].innerHTML = ""
    }
    currentWindow[windowId] = "buildinginfo"

    let html = ""
    html += "<div class='heroinfo' style='display:flex;width:70vw; flex-wrap:wrap;'>"



    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Type</th><th>Level</th></tr>"
    html += `  
    <tr>
      <td id="bi_type">${building.type}</td>
      <td id="bi_level">${building.level}</td>
    </tr>`
    html += "</table></div>"

    let cost = "-"
    if (building.level!==building.upgradeCost.length) {
        cost = `${building.upgradeCost[building.level]}g`
    }
    html += `<div><button style="width:100%; height:100%; margin:0;" onclick="buildingsMap[${window_buildingId}].upgrade();open_buildinginfo(undefined,true)">Upgrade ${cost}</button></div>`
    html += "<span style='width:100%;'></span>" //next row
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Level</th><th>Upgrade</th><th>Daily</th><th>+</th></tr>"

    for (let i = 0; i<building.upgradeCost.length; i++) {
        let bgColor = "#342b1b"
        if (building.level===i+1) {
            bgColor = "#493e27" //TODO:
        }

        html += `  
    <tr style="background-color:${bgColor}">
      <td id="bi_type">${i+1}</td>
      <td id="bi_upgradeCost">${building.upgradeCost[i]}g</td>
      <td id="bi_dailyCost">${building.dailyCost[i]}g</td>
      <td id="bi_level">${building.getVal(i)}</td>
    </tr>`
    }

    html += "</table></div>"


    html += "</div>"
    html += "</div>"
    elements.windowBody3.innerHTML = html
}



