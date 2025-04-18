let open_heroeslist = function (reload = false) {
    if (!reload) {
        drawHeader("List of Heroes",0)
    }
    if (currentWindow[0] === "heroeslist" && !reload) {
        close_window(0)
        return
    } else {
        elements.windowBody0.innerHTML = ""
    }
    currentWindow[0] = "heroeslist"
    let html = ""
    html += "<div style='display:flex;justify-content: space-between;width:70vw;'>"
    html += "<div style='overflow:auto;width:100%;'><table> <tr><th>Role</th><th>Class</th><th>Name</th><th style='min-width: 150px' >Status</th><th>Level</th><th>Dps</th><th>Hps</th><th>Dtps</th><th>Gold</th><th>Fatigue</th><th>Hunger</th><th>Health</th><th>Location</th><th>Destination</th></tr> "
    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i]
        html += "<tr><td>" + hero.role + "</td><td>" + hero.characterClass + "</td><td>" + hero.name + "</td><td>" + hero.status + "</td><td>" + hero.level + "</td><td>" + getNumberString(hero.dps) + "</td><td>" + getNumberString(hero.hps) + "</td><td>" + getNumberString(hero.dtps) + "</td><td>" + getNumberString(hero.inventory.gold) + "</td><td >" + Math.round(hero.fatigue) + "</td><td>" + Math.round(hero.hunger) + "</td><td>" + getNumberString(hero.health) + "</td><td> " + Math.round(hero.location.x) + " - " + Math.round(hero.location.y) + "</td><td> " + Math.round(hero.destination.x) + " - " + Math.round(hero.destination.y) + "</td></tr >"
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements.windowBody0.innerHTML = html
}

