let open_statistics = function (reload = false, update = false) {
    let windowId = 2
    let dontClose = false
    if (!reload) {
        open_window(windowId)
        drawHeader("Statistics", windowId)
    }
    if (update) {
      //TODO:

        return
    }
    if (currentWindow[windowId] === "statistics" && !reload && !dontClose) {
        close_window(windowId)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "statistics"
    let html = ""
    html += "<div class='statistics' style='display:flex;width:80vw; flex-wrap:wrap;'>"

    /*
    html += "<span style='width:100%;'></span>" //next row
    */
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
    <th class="statsHeaderTh" onclick="sortTable('className')" data-sortkey="className">Class</th>
    <th class="statsHeaderTh" onclick="sortTable('specName')" data-sortkey="specName">Spec</th>
    <th class="statsHeaderTh" onclick="sortTable('count')" data-sortkey="count">Count</th>
    <th class="statsHeaderTh" onclick="sortTable('dps')" data-sortkey="dps">DPS</th>
    <th class="statsHeaderTh" onclick="sortTable('stDps')" data-sortkey="stDps">ST DPS</th>
    <th class="statsHeaderTh" onclick="sortTable('aoeDps')" data-sortkey="aoeDps">AOE DPS</th>
    <th class="statsHeaderTh" onclick="sortTable('hps')" data-sortkey="hps">HPS</th>
    <th class="statsHeaderTh" onclick="sortTable('stHps')" data-sortkey="stHps">ST HPS</th>
    <th class="statsHeaderTh" onclick="sortTable('aoeHps')" data-sortkey="aoeHps">AOE HPS</th>
    <th class="statsHeaderTh" onclick="sortTable('dtps')" data-sortkey="dtps">DTPS</th>
    <th class="statsHeaderTh" onclick="sortTable('dtpsM')" data-sortkey="dtpsM">DTPS (M)</th>
    <th class="statsHeaderTh" onclick="sortTable('dtpsP')" data-sortkey="dtpsP">DTPS (P)</th>
        <th class="statsHeaderTh" onclick="sortTable('ms')" data-sortkey="ms">Speed</th>
</tr>`


    sortedKeys.forEach(key => {
        let data = combinedData[key]
        let c = data.count || 1
        let [classText, specText] = key.split(' - ')
        let classColor = colors[classText] || "#FFFFFF"
        let roleColor = colors.roles[data.role] || "#FFFFFF"
        let bgColor = pSBC(0.65, classColor, "#111111")

        html += `<tr class="statistics_tr_row" style="background-color:${bgColor}">
        <td data-sortkey="className" style="position:relative;">${classText}<div class="gradientWow2"></div></td>
        <td data-sortkey="specName" style="position:relative;color:${roleColor}">${specText}<div class="gradientWow2"></div></td>
        <td data-sortkey="count" style="position:relative;">${data.count}<div class="gradientWow2"></div></td>
        <td data-sortkey="dps" style="position:relative;">${getNumberString(data.dps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="stDps" style="position:relative;">${getNumberString(data.stDps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="aoeDps" style="position:relative;">${getNumberString(data.aoeDps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="hps" style="position:relative;">${getNumberString(data.hps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="stHps" style="position:relative;">${getNumberString(data.stHps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="aoeHps" style="position:relative;">${getNumberString(data.aoeHps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtps" style="position:relative;">${getNumberString(data.dtps / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtpsM" style="position:relative;">${getNumberString(data.dtpsM / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="dtpsP" style="position:relative;">${getNumberString(data.dtpsP / c)}<div class="gradientWow2"></div></td>
        <td data-sortkey="ms" style="position:relative;">${Math.round(data.ms / c*100)/100}<div class="gradientWow2"></div></td>
    </tr>`
    })

    html += "</table></div>"


    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}


let currentSort = {
    key: null, 
    order: 'asc',
}

function sortTable(sortKey) {
    const table = document.querySelector("table")
    const rows = Array.from(table.querySelectorAll('tr:nth-child(n+2)'))

    if (currentSort.key === sortKey) {
        currentSort.order = (currentSort.order === 'asc') ? 'desc' : 'asc'
    } else {
        currentSort.key = sortKey
        currentSort.order = 'asc'
    }

    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelector(`[data-sortkey="${sortKey}"]`).textContent.trim()
        const cellB = rowB.querySelector(`[data-sortkey="${sortKey}"]`).textContent.trim()

        const valA = parseFloat(cellA) || cellA
        const valB = parseFloat(cellB) || cellB

        if (valA < valB) return currentSort.order === 'asc' ? -1 : 1
        if (valA > valB) return currentSort.order === 'asc' ? 1 : -1
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