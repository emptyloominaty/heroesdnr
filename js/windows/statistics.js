//TODO: hps,dtps   max:dps,hps,dtps    level charts, dps charts, hps charts, dtps charts, age chart, skill charts
statistics_sortMode = "name"
statistics_dpsMode = "dps"
statistics_roleDpsMode = "dps"
let statistics_setSortMode = function (val,role = "",type = "") {
    statistics_sortMode = val
    setTimeout(() => {
        if (role !== "") {
            statistics_roleDpsMode = role
        }
        open_statistics(true, false)
        const headers = document.querySelectorAll('#statsDpsHeader th')
        headers.forEach(header => {
            header.classList.remove('statsHeaderThSort')
        })

        let newHeader
        if (role !== "") {
            const sortKey = `${role}_${type}`;
            newHeader = Array.from(headers).find(h => h.dataset.sortkey === sortKey);
        } else {
            newHeader = Array.from(headers).find(h => h.dataset.sortkey === val)
        }
        if (newHeader) {
            newHeader.classList.add('statsHeaderThSort') 
        }
    }, 100)
}
let statistics_setDpsMode = function(val) {
    statistics_dpsMode = val
}
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
    const classCounts = heroes.reduce((acc, h) => {
        acc[h.characterClass] = (acc[h.characterClass] || 0) + 1
        return acc
    }, {})

    const classRoleCounts = {}
    const dpsData = {}

    heroes.forEach(h => {
        classRoleCounts[h.characterClass] ??= {}
        classRoleCounts[h.characterClass][h.role] = (classRoleCounts[h.characterClass][h.role] || 0) + 1

        dpsData[h.characterClass] ??= {}
        dpsData[h.characterClass][h.role] ??= { dps: 0, stDps: 0, aoeDps: 0, count: 0 }

        dpsData[h.characterClass][h.role].dps += h.dps || 0
        dpsData[h.characterClass][h.role].stDps += h.stDps || 0
        dpsData[h.characterClass][h.role].aoeDps += h.aoeDps || 0
        dpsData[h.characterClass][h.role].count++
    })


    const allRoles = [...new Set(heroes.map(h => h.role))]


    html += "<div style='overflow:auto'><table>"


    html += `<tr id="statsDpsHeader" class="statsHeader" ><th class="statsHeaderThSort" onclick="statistics_setSortMode('name')" data-sortkey="name">Class</th><th onclick="statistics_setSortMode('count')" data-sortkey="count">Total</th>`
    allRoles.forEach(role => html += `<th onclick="statistics_setSortMode('roleCount','${role}','count')" data-sortkey="${role}_count">${role}s</th>`)
    allRoles.forEach(role => {
        html += `
        <th onclick="statistics_setSortMode('dps','${role}','dps'); statistics_setDpsMode('dps')" data-sortkey="${role}_dps">${role} DPS</th>
        <th onclick="statistics_setSortMode('dps','${role}','stDps'); statistics_setDpsMode('stDps')" data-sortkey="${role}_stDps">${role} ST DPS</th>
        <th onclick="statistics_setSortMode('dps','${role}','aoeDps'); statistics_setDpsMode('aoeDps')" data-sortkey="${role}_aoeDps">${role} AOE DPS</th>
    `
    })



    html += "</tr>"

    let sortedClassNames
    let sortDps = statistics_dpsMode
    if (statistics_sortMode === "dps") {
        sortedClassNames = Object.keys(classCounts)
            .sort((a, b) => {
                const roleDataA = dpsData[a]?.[statistics_roleDpsMode]
                const roleDataB = dpsData[b]?.[statistics_roleDpsMode]
                const avgDpsA = roleDataA ? roleDataA[sortDps] / roleDataA.count : 0
                const avgDpsB = roleDataB ? roleDataB[sortDps] / roleDataB.count : 0
                return avgDpsB - avgDpsA
            })
    } else if (statistics_sortMode === "count") {
        sortedClassNames = Object.keys(classCounts)
            .sort((a, b) => {
                const totalA = Object.values(classRoleCounts[a] || {}).reduce((sum, count) => sum + count, 0);
                const totalB = Object.values(classRoleCounts[b] || {}).reduce((sum, count) => sum + count, 0);
                return totalB - totalA;
            })

    } else if (statistics_sortMode === "roleCount") {
        sortedClassNames = Object.keys(classCounts)
            .sort((a, b) => {
                const countA = (classRoleCounts[a]?.[statistics_roleDpsMode]) || 0;
                const countB = (classRoleCounts[b]?.[statistics_roleDpsMode]) || 0;
                return countB - countA;
            })
    } else { //(statistics_sortMode === "name")
        sortedClassNames = Object.keys(classCounts).sort()
    }

    sortedClassNames.forEach(className => {
        html += `<tr><td>${className}</td>`



            const count = classCounts[className]
            html += `<td>${count > 0 ? count : ""}</td>`



        allRoles.forEach(role => {
            const count = classRoleCounts[className]?.[role]
            html += `<td>${count > 0 ? count : ""}</td>`
        })



        allRoles.forEach(role => {
            const data = dpsData[className]?.[role]
            if (data && data.count > 0) {
                const avgDps = getNumberString(data.dps / data.count)
                const avgSt = getNumberString(data.stDps / data.count)
                const avgAoe = getNumberString(data.aoeDps / data.count)
                html += `<td>${avgDps}</td><td>${avgSt}</td><td>${avgAoe}</td>`
            } else {
                html += `<td></td><td></td><td></td>`
            }
        })

        html += "</tr>"
    })

    html += "</table></div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}



