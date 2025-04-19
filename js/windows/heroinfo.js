let window_heroId = 0
let open_heroinfo = function (reload = false, update = false, id = false) {
    let dontClose = false
    if (id!==false) {
        window_heroId = id
        dontClose = true
    }
    if (!reload) {
        drawHeader(heroes[window_heroId].name+" - "+ heroes[window_heroId].role.charAt(0).toUpperCase() + heroes[window_heroId].role.slice(1)+" "+heroes[window_heroId].characterClass+" Level "+heroes[window_heroId].level,1)
    }
    if (update) {
        let hero = heroes[window_heroId]
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

        elementsWindow.gold.textContent = hero.inventory.gold
        elementsWindow.weapon.textContent = hero.inventory.weaponLevel
        elementsWindow.armor.textContent = hero.inventory.armorLevel

        elementsWindow.xp.textContent = getNumberString2(hero.xp)
        elementsWindow.xpNeed.textContent = getNumberString2(hero.xpNeed)

        return
    }
    if (currentWindow[1] === "heroinfo" && !reload && !dontClose) {
        close_window(1)
        return
    } else {
        elements.windowBody1.innerHTML = ""
    }
    currentWindow[1] = "heroinfo"
    let html = ""
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
      <td id="hi_gold" class="heroinfoInv2">${hero.inventory.gold}</td>
    </tr>
    <tr>
      <td class="heroinfoInv1"><strong>Weapon lvl</strong></td>
      <td id="hi_weapon" class="heroinfoInv2">${hero.inventory.weaponLevel}</td>
    </tr>
    <tr>
      <td class="heroinfoInv1"><strong>Armor lvl</strong></td>
      <td id="hi_armor" class="heroinfoInv2">${hero.inventory.armorLevel}</td>
    </tr>

`
    html += "</table></div>"




    //TODO:  statistics,

    html += "</div>"
    html += "</div>"
    elements.windowBody1.innerHTML = html


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
}



