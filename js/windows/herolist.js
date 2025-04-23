let open_heroeslist = function (reload = false, update = false) {
    let windowId = 0
    if (update) {
        for (let i = 0; i < heroes.length; i++) {
            let hero = heroes[i]
            elementsWindow.hl_role[i].textContent = hero.role
            elementsWindow.hl_class[i].textContent = hero.characterClass
            elementsWindow.hl_name[i].textContent = hero.name
            elementsWindow.hl_status[i].textContent = hero.getStatus()
            
            elementsWindow.hl_level[i].textContent = hero.level
            elementsWindow.hl_dps[i].textContent = getNumberString(hero.dps)
            elementsWindow.hl_hps[i].textContent = getNumberString(hero.hps)
            elementsWindow.hl_dtps[i].textContent = getNumberString(hero.dtps)
            elementsWindow.hl_age[i].textContent = Math.round(hero.age*10)/10
            elementsWindow.hl_gold[i].textContent = getNumberString(hero.inventory.gold)
            elementsWindow.hl_hunger[i].textContent = Math.round(hero.hunger)
            elementsWindow.hl_fatigue[i].textContent = Math.round(hero.fatigue)
            elementsWindow.hl_location[i].textContent = Math.round(hero.location.x) + " - " + Math.round(hero.location.y)
            elementsWindow.hl_destination[i].textContent = Math.round(hero.destination.x) + " - " + Math.round(hero.destination.y)

        }
        return
    }


    if (!reload) {
        open_window(windowId)
        drawHeader("List of Heroes", windowId)
    }
    if (currentWindow[windowId] === "heroeslist" && !reload) {
        close_window(windowId)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "heroeslist"
    let html = ""
    html += "<div style='display:flex;justify-content: space-between;width:70vw;'>"
    html += "<div style='overflow:auto;width:100%;'><table> <tr class='heroListFirstRow'><th>Role</th><th>Class</th><th>Name</th><th style='min-width: 150px' >Status</th><th>Level</th><th>Dps</th><th>Hps</th><th>Dtps</th><th>Gold</th><th>Fatigue</th><th>Hunger</th><th>Age</th><th>Location</th><th>Destination</th></tr> "
    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i]
        html += "<tr class='heroListRow' onclick='open_heroinfo(false,false,"+i+")'><td id='hl_role"+i+"'>" + hero.role + "</td><td id='hl_class"+i+"'>" + hero.characterClass + "</td><td id='hl_name"+i+"'>>" + hero.name + "</td><td  id='hl_status"+i+"'>>" + hero.getStatus() + "</td><td id='hl_level"+i+"'>>" + hero.level + "</td><td id='hl_dps"+i+"'>>" + getNumberString(hero.dps) + "</td><td  id='hl_hps"+i+"'>>" + getNumberString(hero.hps) + "</td><td id='hl_dtps"+i+"'>>" + getNumberString(hero.dtps) + "</td><td id='hl_gold"+i+"'>>" + getNumberString(hero.inventory.gold) + "</td><td id='hl_fatigue"+i+"'>>" + Math.round(hero.fatigue) + "</td><td id='hl_hunger"+i+"'>" + Math.round(hero.hunger) + "</td><td  id='hl_age"+i+"'>>" + Math.round(hero.age*10)/10 + "</td><td  id='hl_location"+i+"'>> " + Math.round(hero.location.x) + " - " + Math.round(hero.location.y) + "</td><td  id='hl_destination"+i+"'>> " + Math.round(hero.destination.x) + " - " + Math.round(hero.destination.y) + "</td></tr >"
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.hl_role = []
    elementsWindow.hl_class = []
    elementsWindow.hl_name = []
    elementsWindow.hl_status = []
    elementsWindow.hl_level = []
    elementsWindow.hl_dps = []
    elementsWindow.hl_hps = []
    elementsWindow.hl_dtps = []
    elementsWindow.hl_age = []
    elementsWindow.hl_gold = []
    elementsWindow.hl_hunger = []
    elementsWindow.hl_fatigue = []
    elementsWindow.hl_location = []
    elementsWindow.hl_destination = []
    for (let i = 0; i < heroes.length; i++) {
        elementsWindow.hl_role.push(document.getElementById("hl_role"+i))
        elementsWindow.hl_class.push(document.getElementById("hl_class"+i))
        elementsWindow.hl_name.push(document.getElementById("hl_name"+i))
        elementsWindow.hl_status.push(document.getElementById("hl_status"+i))
        elementsWindow.hl_level.push(document.getElementById("hl_level"+i))
        elementsWindow.hl_dps.push(document.getElementById("hl_dps"+i))
        elementsWindow.hl_hps.push(document.getElementById("hl_hps"+i))
        elementsWindow.hl_dtps.push(document.getElementById("hl_dtps"+i))
        elementsWindow.hl_age.push(document.getElementById("hl_age"+i))
        elementsWindow.hl_gold.push(document.getElementById("hl_gold"+i))
        elementsWindow.hl_hunger.push(document.getElementById("hl_hunger"+i))
        elementsWindow.hl_fatigue.push(document.getElementById("hl_fatigue"+i))
        elementsWindow.hl_location.push(document.getElementById("hl_location"+i))
        elementsWindow.hl_destination.push(document.getElementById("hl_destination"+i))
    }
}

