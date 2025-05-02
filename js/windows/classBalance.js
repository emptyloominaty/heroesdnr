let statRangesCB = {}
let heatMapcolorModeCB = false
let open_classBalance = function (btn_el = undefined, reload = false, update = false, resetColors = false) {
    let windowId = 8
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Class Balance", windowId,btn_el)
    }
    if (resetColors) {
        elementsWindow.btn_heatModeCB.textContent = `HeatMap: ${heatMapcolorModeCB ? 'ON' : 'OFF'}`
        const tds = elements["windowBody" + windowId].querySelectorAll("div > div > table > tbody > tr > td")
        tds.forEach(td => td.classList.toggle("no-heatmap-bg"))
        return
    }

    if (currentWindow[windowId] === "classBalance" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "classBalance"
    let html = ""
    html += "<div class='classBalance' style='display:flex;width:95vw; flex-wrap:wrap;'>"

    html += `<button id="btn_heatModeCB" onclick="heatMapcolorModeCB = !heatMapcolorModeCB; open_classBalance(undefined,false,false,true)">HeatMap: ${heatMapcolorModeCB ? 'ON' : 'OFF'}</button>`

    
    html += "<span style='width:100%;'></span>" //next row

    let testHeroes = []
    for (let heroClass in heroesConfig) {
        for (let role in heroesConfig[heroClass]) {
            testHeroes.push(new Hero("", 20, 10, 100, heroClass, role, { x: 0, y: 0 },false,true))
        }
    }

    let combinedData = {}
    testHeroes.forEach(h => {
        let key = `${h.characterClass} - ${h.role}`
        if (!combinedData[key]) {
            combinedData[key] = {
                className: h.characterClass,
                specName: h.characterSpec,
                role: h.role,
                count: 0,
                dps: 0,
                stDps: 0,
                aoeDps: 0,
                hps: 0,
                stHps: 0,
                aoeHps: 0,
                dtps: 0,
                dtpsM: 0,
                dtpsP: 0,
                ms: 0,
                chance: 0,
                fMul: 0,
                hMul: 0,
                escape: 0,
                critFailD: 0,
                femaleR: 0,
                dungDps: 0,
                dungDtps: 0,
                dungValue: 0,
            }
        }

        combinedData[key].count++
        combinedData[key].dps += h.dps || 0
        combinedData[key].stDps += h.stDps || 0
        combinedData[key].aoeDps += h.aoeDps || 0
        combinedData[key].hps += h.hps || 0
        combinedData[key].stHps += h.stHps || 0
        combinedData[key].aoeHps += h.aoeHps || 0
        combinedData[key].dtps += h.dtps || 0
        combinedData[key].dtpsM += h.dtpsM || 0
        combinedData[key].dtpsP += h.dtpsP || 0
        combinedData[key].ms += h.speed || 0

        const totalWeight = Object.values(spawnChances).flatMap(specs => Object.values(specs)).reduce((a, b) => a + b, 0)
        const chance = ((spawnChances[h.characterClass]?.[h.characterSpec] || 0) / totalWeight) * 100
        combinedData[key].chance += Math.round(chance*10)/10 || 0
        combinedData[key].fMul = heroesConfig[h.characterClass][h.characterSpec].fMul
        combinedData[key].hMul = heroesConfig[h.characterClass][h.characterSpec].hMul
        combinedData[key].escape += heroesConfig[h.characterClass][h.characterSpec].escape || 0
        combinedData[key].critFailD += heroesConfig[h.characterClass][h.characterSpec].critFailD || 0

        let fmr = heroesConfig[h.characterClass][h.characterSpec].femaleR
        let total = fmr[0] + fmr[1]
        let femalePercent = total === 0 ? 0 : (fmr[1] / total) * 100
        combinedData[key].femaleR += femalePercent || 0

        combinedData[key].dungDps = (h.stDps + h.aoeDps)/2
        combinedData[key].dungDtps = ((h.dtpsM + h.dtpsP) / 2) + h.stHps + h.aoeHps
        let newDtps = h.stHps + (h.aoeHps/2)
        if (h.role === "tank") {
            newDtps += (h.dtpsM + h.dtpsP) / 2
        }

        let aoeFixDtps = ((h.dtpsM + h.dtpsP) / 2) + h.stHps + (h.aoeHps/2)
        combinedData[key].dungValue = combinedData[key].dungDps + combinedData[key].dungDtps
        combinedData[key].dungValue2 = combinedData[key].dungDps + aoeFixDtps
        combinedData[key].dungValueNew = combinedData[key].dungDps + newDtps

    })


    let sortedKeys = Object.keys(combinedData).sort((a, b) => {
        return combinedData[b].dps - combinedData[a].dps
    })

    html += "<div style='overflow:auto'><table>"
    html += `
<tr class="statsHeader">
    <th class="statsHeaderTh" onclick="sortTable('className',${windowId})" data-sortkey="className">Class</th>
    <th class="statsHeaderTh" onclick="sortTable('specName',${windowId})" data-sortkey="specName">Spec</th>
    <th class="statsHeaderTh" onclick="sortTable('dungValue',${windowId})" data-sortkey="dungValue">DungValue</th>
    <th class="statsHeaderTh" onclick="sortTable('dungValue2',${windowId})" data-sortkey="dungValue2">DValAoeFix</th>
    <th class="statsHeaderTh" onclick="sortTable('dungValueNew',${windowId})" data-sortkey="dungValueNew">DungValueNew</th>
    <th class="statsHeaderTh" onclick="sortTable('chance',${windowId})" data-sortkey="chance">Spawn chance</th>
    <th class="statsHeaderTh" onclick="sortTable('dps',${windowId})" data-sortkey="dps">DPS</th>
    <th class="statsHeaderTh" onclick="sortTable('stDps',${windowId})" data-sortkey="stDps">ST DPS</th>
    <th class="statsHeaderTh" onclick="sortTable('aoeDps',${windowId})" data-sortkey="aoeDps">AOE DPS</th>
    <th class="statsHeaderTh" onclick="sortTable('hps',${windowId})" data-sortkey="hps">HPS</th>
    <th class="statsHeaderTh" onclick="sortTable('stHps',${windowId})" data-sortkey="stHps">ST HPS</th>
    <th class="statsHeaderTh" onclick="sortTable('aoeHps',${windowId})" data-sortkey="aoeHps">AOE HPS</th>
    <th class="statsHeaderTh" onclick="sortTable('dtps',${windowId})" data-sortkey="dtps">DTPS</th>
    <th class="statsHeaderTh" onclick="sortTable('dtpsM',${windowId})" data-sortkey="dtpsM">DTPS (M)</th>
    <th class="statsHeaderTh" onclick="sortTable('dtpsP',${windowId})" data-sortkey="dtpsP">DTPS (P)</th>
    <th class="statsHeaderTh" onclick="sortTable('ms',${windowId})" data-sortkey="ms">Speed</th>
    <th class="statsHeaderTh" onclick="sortTable('fMul',${windowId})" data-sortkey="fMul">fMul</th>
    <th class="statsHeaderTh" onclick="sortTable('hMul',${windowId})" data-sortkey="hMul">hMul</th>
    <th class="statsHeaderTh" onclick="sortTable('escape',${windowId})" data-sortkey="escape">escape</th>
    <th class="statsHeaderTh" onclick="sortTable('critFailD',${windowId})" data-sortkey="hMul">cfD</th>
    <th class="statsHeaderTh" onclick="sortTable('femaleR',${windowId})" data-sortkey="femaleR">female</th>

</tr>`
//----------------
    const colorStats = ["count", "dps", "stDps", "aoeDps", "hps", "stHps", "aoeHps", "dtps", "dtpsM", "dtpsP", "ms", "chance", "fMul", "hMul", "escape", "critFailD", "femaleR", "dungDps", "dungDtps", "dungValue","dungValueNew","dungValue2"]
    colorStats.forEach(stat => {
        let values = sortedKeys.map(key => {
            let data = combinedData[key]
            let c = data.count || 1
            let value = stat === "count" ? data.count : data[stat] / c
            return value ?? 0
        })
        let min = Math.min(...values)
        let max = Math.max(...values)
        let avg = values.reduce((a, b) => a + b, 0) / values.length
        statRangesCB[stat] = { min, avg, max }
    })
//----------------

    sortedKeys.forEach(key => {
        let data = combinedData[key]
        let c = data.count || 1
        let [classText, specText] = key.split(' - ')
        let classColor = colors[classText] || "#FFFFFF"
        let roleColor = colors.roles[data.role] || "#FFFFFF"
        let bgColor = pSBC(0.55, classColor, "#111111")

        html += `<tr class="statistics_tr_row" style="background-color:${bgColor}">
        <td data-sortkey="className" style="position:relative;">${classText}<div class="gradientWow2"></div></td>
        <td data-sortkey="specName" style="position:relative;color:${roleColor}">${specText}<div class="gradientWow2"></div></td>
        <td data-sortkey="dungValue" style="background-color:${getHeatColor(data.dungValue / c, 'dungValue', statRangesCB)};position:relative;">${getNumberString(data.dungValue / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dungValue2" style="background-color:${getHeatColor(data.dungValue2 / c, 'dungValue2', statRangesCB)};position:relative;">${getNumberString(data.dungValue2 / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dungValueNew" style="background-color:${getHeatColor(data.dungValueNew / c, 'dungValueNew', statRangesCB)};position:relative;">${getNumberString(data.dungValueNew / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="chance" style="background-color:${getHeatColor(data.chance, 'chance',statRangesCB)};position:relative;">${data.chance}<div class="gradientWow2"></div></td>
        <td data-sortkey="dps" style="background-color:${getHeatColor(data.dps / c, 'dps',statRangesCB)};position:relative;">${getNumberString(data.dps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="stDps" style="background-color:${getHeatColor(data.stDps / c, 'stDps',statRangesCB)};position:relative;">${getNumberString(data.stDps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="aoeDps" style="background-color:${getHeatColor(data.aoeDps / c, 'aoeDps',statRangesCB)};position:relative;">${getNumberString(data.aoeDps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="hps" style="background-color:${getHeatColor(data.hps / c, 'hps',statRangesCB)};position:relative;">${getNumberString(data.hps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="stHps" style="background-color:${getHeatColor(data.stHps / c, 'stHps',statRangesCB)};position:relative;">${getNumberString(data.stHps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="aoeHps" style="background-color:${getHeatColor(data.aoeHps / c, 'aoeHps',statRangesCB)};position:relative;">${getNumberString(data.aoeHps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtps" style="background-color:${getHeatColor(data.dtps / c, 'dtps',statRangesCB)};position:relative;">${getNumberString(data.dtps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtpsM" style="background-color:${getHeatColor(data.dtpsM / c, 'dtpsM',statRangesCB)};position:relative;">${getNumberString(data.dtpsM / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtpsP" style="background-color:${getHeatColor(data.dtpsP / c, 'dtpsP',statRangesCB)};position:relative;">${getNumberString(data.dtpsP / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="ms" style="background-color:${getHeatColor(data.ms / c, 'ms',statRangesCB)};position:relative;">${Math.round(data.ms / c*100)/100}<div class="gradientWow2"></div></td>
        <td data-sortkey="fMul" style="background-color:${getHeatColor(data.fMul / c, 'fMul',statRangesCB,true)};position:relative;">${data.fMul}<div class="gradientWow2"></div></td>
        <td data-sortkey="hMul" style="background-color:${getHeatColor(data.hMul / c, 'hMul',statRangesCB,true)};position:relative;">${data.hMul}<div class="gradientWow2"></div></td>
        <td data-sortkey="escape" style="background-color:${getHeatColor(data.escape / c, 'escape',statRangesCB)};position:relative;">${data.escape}<div class="gradientWow2"></div></td>
        <td data-sortkey="critFailD" style="background-color:${getHeatColor(data.critFailD / c, 'critFailD',statRangesCB)};position:relative;">${data.critFailD}<div class="gradientWow2"></div></td>
        <td data-sortkey="femaleR" style="background-color:${getHeatColor(data.femaleR / c, 'femaleR',statRangesCB)};position:relative;">${Math.round(data.femaleR*10)/10}<div class="gradientWow2"></div></td>
        </tr>`
    })

    html += "</table></div>"


    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.btn_heatModeCB = document.getElementById("btn_heatModeCB")



    //hide heat map if false
    open_classBalance(undefined, false, false, true, true)
}


