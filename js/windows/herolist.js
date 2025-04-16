let open_heroeslist = function(reload = false) {
    if (currentWindow === "heroeslist" && !reload) {
        close_window()
        return
    } else {
        elements.window.innerHTML = ""
    }
    currentWindow = "heroeslist"
    let html = "<div class='windowHeader'><span style='padding:2px;'></span> <div style='padding:0 3px 0 3px;font-size:20px;' onclick='close_window()'>x</div></div>"
    html += "<div style='display:flex;justify-content: space-between;width:50vw;'>"
    html += "<div style='overflow:auto;width:100%;'><table> <tr><th>Name</th><th>Status</th><th>Gold</th><th>Fatigue</th><th>Hunger</th><th>Health</th><th>Location</th><th>Destination</th></tr> "
    //    skill,dps,hps
    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i]
        html += "<tr><td>" + hero.name + "</td><td>" + hero.status + "</td><td>" + Math.round(hero.inventory.gold) + "</td><td >" + Math.round(hero.fatigue) + "</td><td>" + Math.round(hero.hunger) + "</td><td>" + Math.round(hero.health) + "</td><td> x:" + Math.round(hero.location.x) + " y:" + Math.round(hero.location.y) + "</td><td> x:" + Math.round(hero.location.x) + " y:" + Math.round(hero.location.y) + "</td></tr >"
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements.window.innerHTML = html
}

