let heroesListLength = 0
let heroesListTableMode = "default"
let open_heroeslist = function (btn_el = undefined, reload = false, update = false,renameTableHeader = false) {
    let windowId = 0
    if (update) {
        if (heroes.length===heroesListLength) {
            for (let i = 0; i < heroes.length; i++) {
                let hero = heroes[i]
                elementsWindow.hl_role[i].textContent = hero.role
                elementsWindow.hl_class[i].textContent = hero.characterClass
                elementsWindow.hl_name[i].textContent = hero.name
                elementsWindow.hl_status[i].textContent = hero.getStatus()
                elementsWindow.hl_age[i].textContent = Math.round(hero.age)
                elementsWindow.hl_level[i].textContent = hero.level

                if (heroesListTableMode==="default") {
                    elementsWindow.hl_dps[i].textContent = getNumberString(hero.dps)
                    elementsWindow.hl_hps[i].textContent = getNumberString(hero.hps)
                    elementsWindow.hl_dtps[i].textContent = getNumberString(hero.dtps)
                    elementsWindow.hl_gold[i].textContent = getNumberString(hero.inventory.gold)
                    elementsWindow.hl_fatigue[i].textContent = Math.round(hero.fatigue)
                    elementsWindow.hl_hunger[i].textContent = Math.round(hero.hunger)
                    elementsWindow.hl_location[i].textContent = Math.round(hero.location.x) + " - " + Math.round(hero.location.y)
                    elementsWindow.hl_destination[i].textContent = Math.round(hero.destination.x) + " - " + Math.round(hero.destination.y)
                } else if (heroesListTableMode==="throughput") {
                    elementsWindow.hl_dps[i].textContent = getNumberString(hero.dps)
                    elementsWindow.hl_hps[i].textContent = getNumberString(hero.stDps)
                    elementsWindow.hl_dtps[i].textContent = getNumberString(hero.aoeDps)
                    elementsWindow.hl_gold[i].textContent = getNumberString(hero.hps)
                    elementsWindow.hl_fatigue[i].textContent = getNumberString(hero.stHps)
                    elementsWindow.hl_hunger[i].textContent = getNumberString(hero.aoeHps)
                    elementsWindow.hl_location[i].textContent = getNumberString(hero.dtpsM)
                    elementsWindow.hl_destination[i].textContent = getNumberString(hero.dtpsP)
                } else if (heroesListTableMode === "statistics") {
                    let rank = getRank(hero.rankPoints)
                    let rankC = rank
                    if (isMythicPlusNumber(rankC)) {
                        rankC = "Mythic I"
                    }
                    elementsWindow.hl_dps[i].textContent = hero.statistics.dungeonSoloRuns.success
                    elementsWindow.hl_hps[i].textContent = hero.statistics.dungeonGroupRuns.success
                    elementsWindow.hl_dtps[i].textContent = hero.statistics.raidRuns.success
                    elementsWindow.hl_gold[i].textContent = hero.statistics.questsCompleted
                    elementsWindow.hl_fatigue[i].textContent = getNumberString(hero.xp)
                    elementsWindow.hl_hunger[i].innerHTML = "<span style='color:" + colors.ranks[rankC] + ";'>" + rank + "</span>"
                    elementsWindow.hl_location[i].textContent = getNumberString(hero.rankPoints)
                    elementsWindow.hl_destination[i].textContent = Math.round(hero.speed*100)/100
                } else if (heroesListTableMode==="inventory") {
                    elementsWindow.hl_dps[i].textContent = getNumberString(hero.ilvl)
                    elementsWindow.hl_hps[i].textContent = "+"+getNumberString(hero.itemsBonus.dps.base)
                    elementsWindow.hl_dtps[i].textContent = getNumberString(hero.itemsBonus.dps.mul)+"x"
                    elementsWindow.hl_gold[i].textContent = "+"+getNumberString(hero.itemsBonus.dtps.base)
                    elementsWindow.hl_fatigue[i].textContent = getNumberString(hero.itemsBonus.dtps.mul)+"x"
                    elementsWindow.hl_hunger[i].textContent = ""
                    elementsWindow.hl_location[i].textContent = ""
                    elementsWindow.hl_destination[i].textContent = getNumberString(hero.inventory.gold)
                } else if (heroesListTableMode === "debug") {
                    elementsWindow.hl_dps[i].textContent = Math.round(hero.talkingTimer * 10) / 10
                    elementsWindow.hl_hps[i].textContent = Math.round(hero.idleTimer * 10) / 10
                    elementsWindow.hl_dtps[i].textContent = Math.round(hero.waitTimer * 10) / 10
                    elementsWindow.hl_age[i].textContent = Math.round(hero.age * 10) / 10
                    elementsWindow.hl_gold[i].textContent = hero.statistics.dungeonSoloRuns.success + "/" + hero.statistics.dungeonSoloRuns.escape + "/" + hero.statistics.dungeonSoloRuns.failure + "/"+hero.statistics.dungeonSoloRuns.criticalFailure
                    elementsWindow.hl_hunger[i].textContent = Math.round(hero.hunger)
                    elementsWindow.hl_fatigue[i].textContent = Math.round(hero.fatigue)
                    elementsWindow.hl_location[i].textContent = Math.round(hero.location.x) + " - " + Math.round(hero.location.y)
                    elementsWindow.hl_destination[i].textContent = Math.round(hero.destination.x) + " - " + Math.round(hero.destination.y)
                }
            }
            return
        }
    }
    if (renameTableHeader) {

        const buttons = [
            elementsWindow.hl_btn_default,
            elementsWindow.hl_btn_throughput,
            elementsWindow.hl_btn_statistics,
            elementsWindow.hl_btn_inventory,
            elementsWindow.hl_btn_debug

        ]
        buttons.forEach(button => button.classList.remove('button_activated'))

        if (heroesListTableMode==="default") {
            elementsWindow.hl_header1.textContent = "Dps"
            elementsWindow.hl_header2.textContent = "Hps"
            elementsWindow.hl_header3.textContent = "Dtps"
            elementsWindow.hl_header4.textContent = "Gold"
            elementsWindow.hl_header5.textContent = "Fatigue"
            elementsWindow.hl_header6.textContent = "Hunger"
            elementsWindow.hl_header7.textContent = "Location"
            elementsWindow.hl_header8.textContent = "Destination"
            elementsWindow.hl_btn_default.classList.add('button_activated')
        } else if (heroesListTableMode==="throughput") {
            elementsWindow.hl_header1.textContent = "DPS"
            elementsWindow.hl_header2.textContent = "ST"
            elementsWindow.hl_header3.textContent = "AOE"
            elementsWindow.hl_header4.textContent = "HPS"
            elementsWindow.hl_header5.textContent = "ST"
            elementsWindow.hl_header6.textContent = "AOE"
            elementsWindow.hl_header7.textContent = "DTPS M"
            elementsWindow.hl_header8.textContent = "DTPS P"
            elementsWindow.hl_btn_throughput.classList.add('button_activated')
        } else if (heroesListTableMode==="statistics") {
            elementsWindow.hl_header1.textContent = "D Solo"
            elementsWindow.hl_header2.textContent = "D Group"
            elementsWindow.hl_header3.textContent = "Raids"
            elementsWindow.hl_header4.textContent = "Quests"
            elementsWindow.hl_header5.textContent = "XP"
            elementsWindow.hl_header6.textContent = "Rank"
            elementsWindow.hl_header7.textContent = "Rank Points"
            elementsWindow.hl_header8.textContent = "Speed"
            elementsWindow.hl_btn_statistics.classList.add('button_activated')
        } else if (heroesListTableMode==="inventory") {
            elementsWindow.hl_header1.textContent = "Item level"
            elementsWindow.hl_header2.textContent = "DPS Base"
            elementsWindow.hl_header3.textContent = "DPS Mul"
            elementsWindow.hl_header4.textContent = "DTPS Base"
            elementsWindow.hl_header5.textContent = "DTPS Mul"
            elementsWindow.hl_header6.textContent = ""
            elementsWindow.hl_header7.textContent = ""
            elementsWindow.hl_header8.textContent = "Gold"
            elementsWindow.hl_btn_inventory.classList.add('button_activated')
        } else if (heroesListTableMode === "debug") {
            elementsWindow.hl_header1.textContent = "T Timer"
            elementsWindow.hl_header2.textContent = "I Timer"
            elementsWindow.hl_header3.textContent = "W Timer"
            elementsWindow.hl_header4.textContent = "Solo: S/E/F/CF"
            elementsWindow.hl_header5.textContent = ""
            elementsWindow.hl_header6.textContent = ""
            elementsWindow.hl_header7.textContent = "Location"
            elementsWindow.hl_header8.textContent = "Destination"
            elementsWindow.hl_btn_debug.classList.add('button_activated')
        }
        return
    }


    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("List of Heroes", windowId,btn_el)
    }
    if (currentWindow[windowId] === "heroeslist" && !reload) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "heroeslist"



    let html = ""
    html += "<div style='display:flex; flex-wrap:wrap;width:100%;'>"
    html += `<button class="button_activated" id="hl_btn_default" onclick="heroesListTableMode = 'default'; open_heroeslist(undefined,false,false,true)">Default</button>`
    html += `<button id="hl_btn_throughput" onclick="heroesListTableMode = 'throughput'; open_heroeslist(undefined,false,false,true)">Throughput</button>`
    html += `<button id="hl_btn_statistics" onclick="heroesListTableMode = 'statistics'; open_heroeslist(undefined,false,false,true)">Statistics</button>`
    html += `<button id="hl_btn_inventory" onclick="heroesListTableMode = 'inventory'; open_heroeslist(undefined,false,false,true)">Inventory</button>`
    html += `<button id="hl_btn_debug" onclick="heroesListTableMode = 'debug'; open_heroeslist(undefined,false,false,true)">Debug</button>`

    html += "<span style='width:100%;'></span>" //next row

    html += `<div style='overflow:auto;width:100%;'><table><tr class='heroListFirstRow'><th class="statsHeaderTh" onclick="sortTable('roleName',${windowId})" data-sortkey='roleName'>Role</th>
        <th class="statsHeaderTh" onclick="sortTable('className',${windowId})" data-sortkey='className'>Class</th>
        <th class="statsHeaderTh" onclick="sortTable('name',${windowId})" data-sortkey='name'>Name</th>
        <th class="statsHeaderTh" onclick="sortTable('status',${windowId})" data-sortkey='status' style='min-width: 150px'>Status</th>    
        <th class="statsHeaderTh" onclick="sortTable('level',${windowId})" data-sortkey='level'>Level</th>
        
        <th class="statsHeaderTh" id="hl_header1" onclick="sortTable('dps',${windowId})" data-sortkey='dps'>Dps</th>
        <th class="statsHeaderTh" id="hl_header2" onclick="sortTable('hps',${windowId})" data-sortkey='hps'>Hps</th>
        <th class="statsHeaderTh" id="hl_header3" onclick="sortTable('dtps',${windowId})" data-sortkey='dtps'>Dtps</th>
        <th class="statsHeaderTh" id="hl_header4" onclick="sortTable('gold',${windowId})" data-sortkey='gold'>Gold</th>
        <th class="statsHeaderTh" id="hl_header5" onclick="sortTable('fatigue',${windowId})" data-sortkey='fatigue'>Fatigue</th>
        <th class="statsHeaderTh" id="hl_header6" onclick="sortTable('hunger',${windowId})" data-sortkey='hunger' >Hunger</th>
        <th class="statsHeaderTh" id="hl_header7" onclick="sortTable('location',${windowId})" data-sortkey='location' >Location</th>
        <th class="statsHeaderTh" id="hl_header8" onclick="sortTable('destination',${windowId})"data-sortkey='destination' >Destination</th>
        
        <th class="statsHeaderTh" onclick="sortTable('sex',${windowId})" data-sortkey='sex'>Sex</th>
        <th class="statsHeaderTh" onclick="sortTable('age',${windowId})" data-sortkey='age'>Age</th></tr>`
    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i]
        let classColor = colors[heroes[i].characterClass] || "#FFFFFF"
        let bgColor = pSBC(0.55, classColor, "#111111")
        let roleColor = colors.roles[hero.role] || "#FFFFFF"
        html += "<tr style='background-color: " + bgColor +"' class='heroListRow' onclick='open_heroinfo(undefined,false,false,"+hero.id+")'>"+
            "<td data-sortkey='roleName' id='hl_role"+i+"' style='color: "+roleColor+"'>" + hero.role + "</td><td data-sortkey='className' id='hl_class"+i+"'>" + hero.characterClass + "</td>"+
            "<td data-sortkey='name' id='hl_name"+i+"'>>" + hero.name + "</td><td data-sortkey='status' id='hl_status"+i+"'>>" + hero.getStatus() + "</td>"+
            "<td data-sortkey='level' id='hl_level"+i+"'>>" + hero.level + "</td><td data-sortkey='dps' id='hl_dps"+i+"'>>" + getNumberString(hero.dps) + "</td>"+
            "<td data-sortkey='hps' id='hl_hps"+i+"'>" + getNumberString(hero.hps) + "</td><td data-sortkey='dtps' id='hl_dtps"+i+"'>>" + getNumberString(hero.dtps) + "</td>"+
            "<td data-sortkey='gold' id='hl_gold"+i+"'>>" + getNumberString(hero.inventory.gold) + "</td><td data-sortkey='fatigue' id='hl_fatigue"+i+"'>" + Math.round(hero.fatigue) + "</td>"+
            "<td data-sortkey='hunger' id='hl_hunger"+i+"'>" + Math.round(hero.hunger) + "</td>"+
            "<td data-sortkey='location' id='hl_location"+i+"'>> " + Math.round(hero.location.x) + " - " + Math.round(hero.location.y) + "</td>"+
            "<td data-sortkey='destination' id='hl_destination"+i+"'>> " + Math.round(hero.destination.x) + " - " + Math.round(hero.destination.y) + "</td>"+
            "<td data-sortkey='sex' id='hl_sex"+i+"'>" + hero.sex.charAt(0).toUpperCase() + "</td><td data-sortkey='age' id='hl_age"+i+"'>" + Math.floor(hero.age*10)/10 + "</td><td colspan='12' style='width: 0;padding:0;margin:0;border:0;'><div class='gradientWow2'></div></td></tr>"
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.hl_header1 = document.getElementById("hl_header1")
    elementsWindow.hl_header2 = document.getElementById("hl_header2")
    elementsWindow.hl_header3 = document.getElementById("hl_header3")
    elementsWindow.hl_header4 = document.getElementById("hl_header4")
    elementsWindow.hl_header5 = document.getElementById("hl_header5")
    elementsWindow.hl_header6 = document.getElementById("hl_header6")
    elementsWindow.hl_header7 = document.getElementById("hl_header7")
    elementsWindow.hl_header8 = document.getElementById("hl_header8")

    elementsWindow.hl_btn_default = document.getElementById("hl_btn_default")
    elementsWindow.hl_btn_throughput = document.getElementById("hl_btn_throughput")
    elementsWindow.hl_btn_statistics = document.getElementById("hl_btn_statistics")
    elementsWindow.hl_btn_inventory = document.getElementById("hl_btn_inventory")
    elementsWindow.hl_btn_debug = document.getElementById("hl_btn_debug")

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
    heroesListLength = heroes.length
    open_heroeslist(undefined,false,false,true)
    //sort on update
    if (currentSort[windowId].key!==null) {
        setTimeout(() => {
            sortTable(currentSort[windowId].key,windowId,true)
        }, progressReal*1000)
    }
}

