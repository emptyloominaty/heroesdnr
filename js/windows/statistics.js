let statRanges = {}
let heatMapcolorMode = false
let open_statistics = function (btn_el = undefined, reload = false, update = false, resetColors = false) {
    let windowId = 2
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Statistics", windowId,btn_el)
    }
    if (update) {
      //TODO:

        return
    }
    if (resetColors) {
        elementsWindow.btn_heatMode.textContent = `HeatMap: ${heatMapcolorMode ? 'ON' : 'OFF'}`
        const tds = elements["windowBody" + windowId].querySelectorAll("div > div > table > tbody > tr > td")
        tds.forEach(td => td.classList.toggle("no-heatmap-bg"))
        return
    }

    if (currentWindow[windowId] === "statistics" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "statistics"
    let html = ""
    html += "<div class='statistics' style='display:flex;width:80vw; flex-wrap:wrap;'>"

    html += `<button id="btn_heatMode" onclick="heatMapcolorMode = !heatMapcolorMode; open_statistics(undefined,false,false,true)">HeatMap: ${heatMapcolorMode ? 'ON' : 'OFF'}</button>`

    
    html += "<span style='width:100%;'></span>" //next row
    
    let classCounts = heroes.reduce((acc, h) => {
        acc[h.characterClass] = (acc[h.characterClass] || 0) + 1
        return acc
    }, {})

    let combinedData = {}
    heroes.forEach(h => {
        let key = `${h.characterClass} - ${h.characterSpec}`
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
    })


    let sortedKeys = Object.keys(combinedData).sort((a, b) => {
        return combinedData[b].dps - combinedData[a].dps
    })

    html += "<div style='overflow:auto'><table>"
    html += `
<tr class="statsHeader">
    <th class="statsHeaderTh" onclick="sortTable('className',${windowId})" data-sortkey="className">Class</th>
    <th class="statsHeaderTh" onclick="sortTable('specName',${windowId})" data-sortkey="specName">Spec</th>
    <th class="statsHeaderTh" onclick="sortTable('count',${windowId})" data-sortkey="count">Count</th>
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
</tr>`
//----------------
    const colorStats = ["count", "dps", "stDps", "aoeDps", "hps", "stHps", "aoeHps", "dtps", "dtpsM", "dtpsP", "ms"]
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
        statRanges[stat] = { min, avg, max }
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
        <td data-sortkey="count" style="background-color:${getHeatColor(data.count, 'count',statRanges)};position:relative;">${data.count}<div class="gradientWow2"></div></td>
        <td data-sortkey="dps" style="background-color:${getHeatColor(data.dps / c, 'dps',statRanges)};position:relative;">${getNumberString(data.dps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="stDps" style="background-color:${getHeatColor(data.stDps / c, 'stDps',statRanges)};position:relative;">${getNumberString(data.stDps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="aoeDps" style="background-color:${getHeatColor(data.aoeDps / c, 'aoeDps',statRanges)};position:relative;">${getNumberString(data.aoeDps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="hps" style="background-color:${getHeatColor(data.hps / c, 'hps',statRanges)};position:relative;">${getNumberString(data.hps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="stHps" style="background-color:${getHeatColor(data.stHps / c, 'stHps',statRanges)};position:relative;">${getNumberString(data.stHps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="aoeHps" style="background-color:${getHeatColor(data.aoeHps / c, 'aoeHps',statRanges)};position:relative;">${getNumberString(data.aoeHps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtps" style="background-color:${getHeatColor(data.dtps / c, 'dtps',statRanges)};position:relative;">${getNumberString(data.dtps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtpsM" style="background-color:${getHeatColor(data.dtpsM / c, 'dtpsM',statRanges)};position:relative;">${getNumberString(data.dtpsM / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtpsP" style="background-color:${getHeatColor(data.dtpsP / c, 'dtpsP',statRanges)};position:relative;">${getNumberString(data.dtpsP / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="ms" style="background-color:${getHeatColor(data.ms / c, 'ms',statRanges)};position:relative;">${Math.round(data.ms / c*100)/100}<div class="gradientWow2"></div></td>
    </tr>`
    })

    html += "</table></div>"


    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.btn_heatMode = document.getElementById("btn_heatMode")



    //hide heat map if false
    open_statistics(undefined, false, false, true, true)
}


let currentSort = []
for (let i = 0; i<16; i++) {
    currentSort.push({key: null,order: 'asc'})
}

function sortTable(sortKey,id,refresh = false) {
    const table = elements["windowBody" + id].querySelector("div > div table tbody")
    const rows = Array.from(table.querySelectorAll('tr:nth-child(n+2)'))


    if (currentSort[id].key === sortKey && !refresh) {
        currentSort[id].order = (currentSort[id].order === 'asc') ? 'desc' : 'asc'
    } else {
        currentSort[id].key = sortKey
        currentSort[id].order = 'desc'
    }

    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelector(`[data-sortkey="${sortKey}"]`).textContent.trim()
        const cellB = rowB.querySelector(`[data-sortkey="${sortKey}"]`).textContent.trim()

        const valA = parseSortableValue(cellA)
        const valB = parseSortableValue(cellB)

        if (valA < valB) return currentSort[id].order === 'asc' ? -1 : 1
        if (valA > valB) return currentSort[id].order === 'asc' ? 1 : -1
        return 0
    })

    rows.forEach(row => table.appendChild(row))
    updateHeaderSort(sortKey)
}

function updateHeaderSort(sortKey) {
    const headers = document.querySelectorAll('.statsHeaderTh')
    headers.forEach(header => header.classList.remove('statsHeaderThSort'))

    const sortedHeader = document.querySelector(`[data-sortkey="${sortKey}"]`)
    if (sortedHeader) {
        sortedHeader.classList.add('statsHeaderThSort')
    }
}

function parseSortableValue(str) {
    str = str.trim().toLowerCase()

    const durationMatch = str.match(/^(\d+)y\s+(\d+)d\s+(\d{1,2}):(\d{2})$/)
    if (durationMatch) {
        const years = parseInt(durationMatch[1], 10)
        const days = parseInt(durationMatch[2], 10)
        const hours = parseInt(durationMatch[3], 10)
        const minutes = parseInt(durationMatch[4], 10)

        return (years * 365 * 24 * 60) + (days * 24 * 60) + (hours * 60) + minutes
    }

   
    if (/^\d+\s*h$/.test(str) || /^\d+h$/.test(str)) {
        const hours = parseInt(str.replace(/[^\d]/g, '').trim())
        return hours
    }

    if (/^\d+(\.\d+)?[kmb]?$/.test(str)) {
        if (str.endsWith('k')) {
            return parseFloat(str) * 1000
        } else if (str.endsWith('m')) {
            return parseFloat(str) * 1000000
        } else if (str.endsWith('b')) {
            return parseFloat(str) * 1000000000
        }
        return parseFloat(str)
    }
    return str
}



//----------------
function getHeatColor(value, stat, statRanges, invertColors = false) {
    let { min, avg, max } = statRanges[stat]
    if (max === min) return "yellow"

    if (!invertColors) {
        if (value >= avg) {
            let ratio = (value - avg) / (max - avg)
            return blendColors("yellow", "green", ratio)
        } else {
            let ratio = (value - min) / (avg - min)
            return blendColors("red", "yellow", ratio)
        }
    } else {
        if (value <= avg) {
            let ratio = (value - min) / (avg - min)
            return blendColors("green", "yellow", ratio)
        } else {
            let ratio = (value - avg) / (max - avg)
            return blendColors("yellow", "red", ratio)
        }
    }
}

function blendColors(c1, c2, ratio) {
    const colorMap = {
        red: [150, 0, 0],
        yellow: [160, 160, 0],
        green: [0, 160, 0]
    }

    let [r1, g1, b1] = colorMap[c1]
    let [r2, g2, b2] = colorMap[c2]

    let r = Math.round(r1 + (r2 - r1) * ratio)
    let g = Math.round(g1 + (g2 - g1) * ratio)
    let b = Math.round(b1 + (b2 - b1) * ratio)

    return `rgb(${r},${g},${b})`
}