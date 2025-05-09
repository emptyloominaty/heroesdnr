let window_heroId = 0
let open_heroinfo = function (btn_el = undefined, reload = false, update = false, id = false) {
    let windowId = 1
    let dontClose = false
    if (id!==false) {
        window_heroId = id
        dontClose = true
    }
    if (!reload && charactersMap[window_heroId]) {
        open_window(windowId)
        drawHeader(charactersMap[window_heroId].name + " - " + charactersMap[window_heroId].role.charAt(0).toUpperCase() + charactersMap[window_heroId].role.slice(1) + " " + charactersMap[window_heroId].characterClass + " Level " + charactersMap[window_heroId].level,1)
    }
    let hero = charactersMap[window_heroId]
    if (update) {
        elementsWindow.dpsAvg.textContent = getNumberString(hero.dps)
        elementsWindow.dpsST.textContent = getNumberString(hero.stDps)
        elementsWindow.dpsAOE.textContent = getNumberString(hero.aoeDps)

        elementsWindow.hpsAvg.textContent = getNumberString(hero.hps)
        elementsWindow.hpsST.textContent = getNumberString(hero.stHps)
        elementsWindow.hpsAOE.textContent = getNumberString(hero.aoeHps)

        elementsWindow.dtpsAvg.textContent = getNumberString(hero.dtps)
        elementsWindow.dtpsP.textContent = getNumberString(hero.dtpsP)
        elementsWindow.dtpsM.textContent = getNumberString(hero.dtpsM)

        elementsWindow.sk0.textContent = Math.round(hero.skill[0]*100)/100
        elementsWindow.sk1.textContent = Math.round(hero.skill[1]*100)/100
        elementsWindow.sk2.textContent = Math.round(hero.skill[2]*100)/100
        elementsWindow.sk3.textContent = Math.round(hero.skill[3]*100)/100
        elementsWindow.sk4.textContent = Math.round(hero.skill[4]*100)/100
        elementsWindow.sk5.textContent = Math.round(hero.skill[5]*100)/100
        elementsWindow.sk6.textContent = Math.round(hero.skill[6]*100)/100
        elementsWindow.sk7.textContent = Math.round(hero.skill[7]*100)/100
        elementsWindow.sk8.textContent = Math.round(hero.skill[8]*100)/100

        elementsWindow.gold.textContent = getNumberString(hero.inventory.gold)
        elementsWindow.weapon.textContent = hero.inventory.weaponLevel
        elementsWindow.armor.textContent = hero.inventory.armorLevel

        elementsWindow.xp.textContent = getNumberString2(hero.xp)
        elementsWindow.xpNeed.textContent = getNumberString2(hero.xpNeed)

        elementsWindow.age.textContent = Math.floor(hero.age)

        elementsWindow.rankPoints.textContent = getNumberString2(hero.rankPoints)
        let rank = getRank(hero.rankPoints)
        let rankC = rank
        if (isMythicPlusNumber(rankC)) {
            rankC = "Mythic I"
        }
        elementsWindow.rank.innerHTML = "<span style='color:"+colors.ranks[rankC]+";'>"+rank+"</span>"

        elementsWindow.speed.textContent = Math.round(hero.speed * 100) / 100

        return
    }
    if (currentWindow[windowId] === "heroinfo" && !reload && !dontClose) {
        close_window(windowId)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "heroinfo"
    let html = ""
    html += "<div class='heroinfo' style='display:flex;width:70vw; flex-wrap:wrap;'>"


    html += "<div class='heroinfoText'></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Spec</th><th>Class</th></tr>"
    html += `  
    <tr>
      <td id="hi_spec">${hero.characterSpec.charAt(0).toUpperCase() + hero.characterSpec.slice(1)}</td>
      <td id="hi_class">${hero.characterClass}</td>
    </tr>`
    html += "</table></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Age</th><th>Sex</th><th>Race</th></tr>"
    html += `  
    <tr>
      <td id="hi_age">${Math.floor(hero.age)}</td>
      <td id="hi_sex">${hero.sex.charAt(0).toUpperCase() + hero.sex.slice(1)}</td>
      <td id="hi_race">${hero.race.charAt(0).toUpperCase() + hero.race.slice(1)}</td>
    </tr>`
    html += "</table></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Speed</th></tr>"
    html += `  
    <tr>
      <td id="hi_speed">${Math.round(hero.speed*100)/100}</td>
    </tr>`
    html += "</table></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Friends/Knowns/Enemies</th></tr>"
    let friends = 0
    let knownPeople = 0
    let enemies = 0
        Object.keys(hero.friendships).forEach(key => {
            if (hero.friendships[key]>10) {
                friends++
            } else if (hero.friendships[key]<0) {
                enemies++
            } else {
                knownPeople++
            }
        })
    let strKnownPeople =  friends+"/"+knownPeople+"/"+enemies
    html += `  
    <tr>
      <td id="hi_friends">${strKnownPeople}</td>
    </tr>`
    html += "</table></div>"
    html += "<span style='width:100%;'></span>" //next row

    html += "<div class='heroinfoText'></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Xp</th><th>Next Level</th></tr>"
    html += `  
    <tr>
      <td id="hi_xp">${getNumberString2(hero.xp)}</td>
      <td id="hi_xpNeed">${getNumberString2(hero.xpNeed)}</td>
    </tr>`
    html += "</table></div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Rank Points</th><th>Rank</th></tr>"
    html += `  
    <tr>
      <td id="hi_rankPoints">${getNumberString2(hero.rankPoints)}</td>
      <td id="hi_rank">${getRank(hero.rankPoints)}</td>
    </tr>`
    html += "</table></div>"

    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Guild</th><th>Rank</th></tr>"
    let guildName = ""
    let guildRank = ""
    if (hero.inGuild) {
        let guild = guilds[hero.guildId]
        guildName = guild.name
        guildRank = "Member"
        for (let i = 0; i < guild.officers.length; i++) {
            if (guild.officers[i] === hero.id) {
                guildRank = "Officer"
            }
        }
        if (guild.guildmaster === hero.id) {
            guildRank = "Guildmaster"
        }
    }

    html += `  
    <tr>
      <td id="hi_rankPoints">${guildName}</td>
      <td id="hi_rank">${guildRank}</td>
    </tr>`
    html += "</table></div>"

    html += "<span style='width:100%;'></span>" //next row

    html += "<div class='heroinfoText'>Throughput</div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Dps Avg</th><th>Dps ST</th><th>Dps Aoe</th></tr>"
    html += `  
    <tr>
      <td id="hi_dpsAvg">${getNumberString(hero.dps)}</td>
      <td id="hi_dpsST">${getNumberString(hero.stDps)}</td>
      <td id="hi_dpsAOE">${getNumberString(hero.aoeDps)}</td>
    </tr>`
    html += "</table></div>"

    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Hps Avg</th><th>Hps ST</th><th>Hps Aoe</th></tr>"
    html += `  
    <tr>
      <td id="hi_hpsAvg">${getNumberString(hero.hps)}</td>
      <td id="hi_hpsST">${getNumberString(hero.stHps)}</td>
      <td id="hi_hpsAOE">${getNumberString(hero.aoeHps)}</td>
    </tr>`
    html += "</table></div>"

    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>Dtps Avg</th><th>Dtps P</th><th>Dtps M</th></tr>"
    html += `  
    <tr>
      <td id="hi_dtpsAvg">${getNumberString(hero.dtps)}</td>
      <td id="hi_dtpsP">${getNumberString(hero.dtpsP)}</td>
      <td id="hi_dtpsM">${getNumberString(hero.dtpsM)}</td>
    </tr>`
    html += "</table></div>"
    html += "<span style='width:100%;'></span>" //next row

    html += "<div class='heroinfoText'>Skills</div>"
    html += "<div><table class='heroinfoTable'> <tr class='heroListFirstRow'><th>0 DS</th><th>1 DA</th><th>2 HS</th><th>3 HA</th><th>4 DTP</th><th>5 DTM</th><th>6</th><th>7</th><th>8 MS</th></tr>"
    html += `  
    <tr>
      <td id="hi_sk0">${Math.round(hero.skill[0]*100)/100}</td>
      <td id="hi_sk1">${Math.round(hero.skill[1]*100)/100}</td>
      <td id="hi_sk2">${Math.round(hero.skill[2]*100)/100}</td>
      <td id="hi_sk3">${Math.round(hero.skill[3]*100)/100}</td>
      <td id="hi_sk4">${Math.round(hero.skill[4]*100)/100}</td>
      <td id="hi_sk5">${Math.round(hero.skill[5]*100)/100}</td>
      <td id="hi_sk6">${Math.round(hero.skill[6]*100)/100}</td>
      <td id="hi_sk7">${Math.round(hero.skill[7]*100)/100}</td>
      <td id="hi_sk8">${Math.round(hero.skill[8]*100)/100}</td> 
    </tr>`
    html += "</table></div>"
    html += "<span style='width:100%;'></span>" //next row

    html += "<div class='heroinfoText'>Inventory</div>"
    html += "<div><table class='heroinfoTable'>"
    html += `  
     <tr>
      <td class="heroinfoInv1"><strong>Gold</strong></td>
      <td id="hi_gold" class="heroinfoInv2">${getNumberString(hero.inventory.gold)}</td>
    </tr>
    <tr>
      <td class="heroinfoInv1"><strong>Weapon base/mul</strong></td>
      <td id="hi_weapon" class="heroinfoInv2">${getNumberString(hero.itemsBonus.dps.base)}/${getNumberString(hero.itemsBonus.dps.mul)}</td>
    </tr>
    <tr>
      <td class="heroinfoInv1"><strong>Armor base/mul</strong></td>
      <td id="hi_armor" class="heroinfoInv2">${getNumberString(hero.itemsBonus.dtps.base)}/${getNumberString(hero.itemsBonus.dtps.mul)}</td>
    </tr>

`
    html += "</table></div>"
    html += "<span style='width:100%;'></span>" //next row

    html += "<div class='heroinfoText'>Log</div>"
    let logText = ""

    for (let i = hero.log.length - 1; i >= 0; i--) {
        logText += "<span style='color:"+colors.logTime+"'>"+getTime2(hero.log[i].time)+"</span>: "+hero.log[i].message+"<br>"
    }
    html += `<div class="hi_log" id="hi_log">${logText}</div> `

    logText = ""


    Object.entries(hero.friendships).forEach(([key, value]) => {
        if (charactersMap[key]) {
            let color
            if (value > 10) {
                color = colors.log.success
            } else if (value >= 0) {
                color = colors.log.levelUp
            } else {
                color = colors.log.failure
            }
            logText += "<span style='color:" + color + "'>" + charactersMap[key].name + ": " + Math.round(value*10)/10 + "</span><br>"
        }
    })

   
    html += `<div class="hi_log" id="hi_log2">${logText}</div> `

    let groupHtml = ""
    for (let i = 0; i < hero.dungeonGroup.length; i++) {
        groupHtml += `<span style="color:${colors[hero.dungeonGroup[i].characterClass]}">${hero.dungeonGroup[i].name} </span>`
    }
    if (hero.dungeonGroup.length > 1) {
        html += "<span style='width:100%;'></span>" //next row
        html += "<div class='heroinfoText'>Group</div>"
        html += `<div class="hi_log" id="hi_group">${groupHtml}</div> `
    }

    //TODO:  statistics,

    html += "<span style='width:100%;'></span>" //next row
    html += "<div class='heroinfoText'></div>"

    html += `<button onclick="heroLeave(${hero.id},true);open_heroinfo(undefined,false,false)">Banish</button>`
    
    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    let col = window.getComputedStyle(elements["windowHeader" + windowId]).color
    elements["windowHeader" + windowId].style.color = colors[hero.characterClass]

    elementsWindow.dpsAvg = document.getElementById("hi_dpsAvg")
    elementsWindow.dpsST = document.getElementById("hi_dpsST")
    elementsWindow.dpsAOE = document.getElementById("hi_dpsAOE")

    elementsWindow.hpsAvg = document.getElementById("hi_hpsAvg")
    elementsWindow.hpsST = document.getElementById("hi_hpsST")
    elementsWindow.hpsAOE = document.getElementById("hi_hpsAOE")

    elementsWindow.dtpsAvg = document.getElementById("hi_dtpsAvg")
    elementsWindow.dtpsP = document.getElementById("hi_dtpsP")
    elementsWindow.dtpsM = document.getElementById("hi_dtpsM")

    elementsWindow.sk0 = document.getElementById("hi_sk0")
    elementsWindow.sk1 = document.getElementById("hi_sk1")
    elementsWindow.sk2 = document.getElementById("hi_sk2")
    elementsWindow.sk3 = document.getElementById("hi_sk3")
    elementsWindow.sk4 = document.getElementById("hi_sk4")
    elementsWindow.sk5 = document.getElementById("hi_sk5")
    elementsWindow.sk6 = document.getElementById("hi_sk6")
    elementsWindow.sk7 = document.getElementById("hi_sk7")
    elementsWindow.sk8 = document.getElementById("hi_sk8")

    elementsWindow.gold = document.getElementById("hi_gold")
    elementsWindow.weapon = document.getElementById("hi_weapon")
    elementsWindow.armor = document.getElementById("hi_armor")

    elementsWindow.xp = document.getElementById("hi_xp")
    elementsWindow.xpNeed = document.getElementById("hi_xpNeed")

    elementsWindow.age = document.getElementById("hi_age")
    elementsWindow.sex = document.getElementById("hi_sex")

    elementsWindow.spec = document.getElementById("hi_spec")
    elementsWindow.class = document.getElementById("hi_class")

    elementsWindow.rank = document.getElementById("hi_rank")
    elementsWindow.rankPoints = document.getElementById("hi_rankPoints")

    elementsWindow.speed = document.getElementById("hi_speed")
    elementsWindow.log = document.getElementById("hi_log")
    elementsWindow.friends = document.getElementById("hi_friends")
    elementsWindow.group = document.getElementById("hi_group")
}



