statistics_sortMode = {
    dps: "name",
    hps: "name",
    dtps: "name"
}
statistics_psMode = {
    dps: "dps",
    hps: "hps",
    dtps: "dtps"
}
statistics_psModeRole = {
    dps: "dps",
    hps: "dps",
    dtps: "dps"
}
let statistics_setSortMode = function (val, role = "", type = "", table = "dps") {
    statistics_sortMode[table] = val;

    if (role !== "") {
        statistics_psModeRole[table] = role;
    }

    setTimeout(() => {
        open_statistics2(undefined, true, false);

        const headers = document.querySelectorAll(`#stats${table}Header th`);
        headers.forEach(header => {
            header.classList.remove('statsHeaderThSort');
        });

        let newHeader;
        if (role !== "") {
            const sortKey = `${role}_${type}`;
            newHeader = Array.from(headers).find(h => h.dataset.sortkey === sortKey);
        } else {
            newHeader = Array.from(headers).find(h => h.dataset.sortkey === val);
        }

        if (newHeader) {
            newHeader.classList.add('statsHeaderThSort');
        }
    }, 100);
}
let statistics_setPsMode = function (val, table = "dps") {
    statistics_psMode[table] = val
}
let open_statistics2 = function (btn_el = undefined, reload = false, update = false) {
    let windowId = 4
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Statistics2", windowId)
    }
    if (update) {
        //TODO:

        return
    }
    if (currentWindow[windowId] === "statistics2" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "statistics2"
    let html = ""
    html += "<div class='statistics' style='display:flex;width:80vw; flex-wrap:wrap;'>"

    /*
    html += "<span style='width:100%;'></span>" //next row
    */
    let classCounts = heroes.reduce((acc, h) => {
        acc[h.characterClass] = (acc[h.characterClass] || 0) + 1
        return acc
    }, {})

    let classRoleCounts = {}
    let dpsData = {}
    let hpsData = {}
    let dtpsData = {}

    heroes.forEach(h => {
        classRoleCounts[h.characterClass] ??= {}
        classRoleCounts[h.characterClass][h.role] = (classRoleCounts[h.characterClass][h.role] || 0) + 1

        dpsData[h.characterClass] ??= {}
        hpsData[h.characterClass] ??= {}
        dtpsData[h.characterClass] ??= {}
        dpsData[h.characterClass][h.role] ??= { dps: 0, stDps: 0, aoeDps: 0, count: 0 }
        hpsData[h.characterClass][h.role] ??= { hps: 0, stHps: 0, aoeHps: 0, count: 0 }
        dtpsData[h.characterClass][h.role] ??= { dtps: 0, dtpsM: 0, dtpsP: 0, count: 0 }

        dpsData[h.characterClass][h.role].dps += h.dps || 0
        dpsData[h.characterClass][h.role].stDps += h.stDps || 0
        dpsData[h.characterClass][h.role].aoeDps += h.aoeDps || 0

        hpsData[h.characterClass][h.role].hps += h.hps || 0
        hpsData[h.characterClass][h.role].stHps += h.stHps || 0
        hpsData[h.characterClass][h.role].aoeHps += h.aoeHps || 0

        dtpsData[h.characterClass][h.role].dtps += h.dtps || 0
        dtpsData[h.characterClass][h.role].dtpsM += h.dtpsM || 0
        dtpsData[h.characterClass][h.role].dtpsP += h.dtpsP || 0


        dpsData[h.characterClass][h.role].count++
        hpsData[h.characterClass][h.role].count++
        dtpsData[h.characterClass][h.role].count++
    })

    let _table
    let sortPs
    let allRoles = [...new Set(heroes.map(h => h.role))]

    //DPS TABLE
    _table = "dps"
    html += "<div style='overflow:auto'><table>"

    html += `<tr id="statsdpsHeader" class="statsHeader" ><th class="statsHeaderThSort" onclick="statistics_setSortMode('name','','','dps')" data-sortkey="name">Class</th><th onclick="statistics_setSortMode('count','','','dps')" data-sortkey="count">Total</th>`
    allRoles.forEach(role => html += `<th onclick="statistics_setSortMode('roleCount','${role}','count','dps')" data-sortkey="${role}_count">${role}s</th>`)
    allRoles.forEach(role => {
        html += `
        <th onclick="statistics_setSortMode('dps','${role}','dps','dps'); statistics_setPsMode('dps','dps')" data-sortkey="${role}_dps">${role} DPS</th>
        <th onclick="statistics_setSortMode('dps','${role}','stDps','dps'); statistics_setPsMode('stDps','dps')" data-sortkey="${role}_stDps">${role} ST DPS</th>
        <th onclick="statistics_setSortMode('dps','${role}','aoeDps','dps'); statistics_setPsMode('aoeDps','dps')" data-sortkey="${role}_aoeDps">${role} AOE DPS</th>
    `
    })
    html += "</tr>"

    let sortedClassNames
    sortPs = statistics_psMode[_table]
    if (statistics_sortMode[_table] === _table) {
        sortedClassNames = Object.keys(classCounts)
            .sort((a, b) => {
                const roleDataA = dpsData[a]?.[statistics_psModeRole[_table]]
                const roleDataB = dpsData[b]?.[statistics_psModeRole[_table]]
                const avgPsA = roleDataA ? roleDataA[sortPs] / roleDataA.count : 0
                const avgPsB = roleDataB ? roleDataB[sortPs] / roleDataB.count : 0
                return avgPsB - avgPsA
            })
    } else if (statistics_sortMode[_table] === "count") {
        sortedClassNames = Object.keys(classCounts)
            .sort((a, b) => {
                const totalA = Object.values(classRoleCounts[a] || {}).reduce((sum, count) => sum + count, 0);
                const totalB = Object.values(classRoleCounts[b] || {}).reduce((sum, count) => sum + count, 0);
                return totalB - totalA;
            })

    } else if (statistics_sortMode[_table] === "roleCount") {
        sortedClassNames = Object.keys(classCounts)
            .sort((a, b) => {
                const countA = (classRoleCounts[a]?.[statistics_psModeRole[_table]]) || 0;
                const countB = (classRoleCounts[b]?.[statistics_psModeRole[_table]]) || 0;
                return countB - countA;
            })
    } else { //(statistics_sortMode === "name")
        sortedClassNames = Object.keys(classCounts).sort()
    }

    sortedClassNames.forEach(className => {
        let classColor = colors[className] || "#FFFFFF"
        let bgColor = pSBC(0.55, classColor, "#111111")
        html += `<tr style="background-color: ${bgColor}"><td style="position:relative">${className}<div class="gradientWow2"></div></td>`

        const count = classCounts[className]
        html += `<td style="position:relative">${count > 0 ? count : ""}<div class="gradientWow2"></div></td>`

        allRoles.forEach(role => {
            const count = classRoleCounts[className]?.[role]
            html += `<td style="position:relative">${count > 0 ? count : ""}<div class="gradientWow2"></div></td>`
        })

        allRoles.forEach(role => {
            const data = dpsData[className]?.[role]
            if (data && data.count > 0) {
                const avgDps = getNumberString(data.dps / data.count)
                const avgSt = getNumberString(data.stDps / data.count)
                const avgAoe = getNumberString(data.aoeDps / data.count)
                html += `<td style="position:relative">${avgDps}<div class="gradientWow2"></div></td><td style="position:relative">${avgSt}<div class="gradientWow2"></div></td><td style="position:relative">${avgAoe}<div class="gradientWow2"></div></td>`
            } else {
                html += `<td style="position:relative"><div class="gradientWow2"></div></td><td style="position:relative"><div class="gradientWow2"></div></td><td style="position:relative"><div class="gradientWow2"></div></td>`
            }
        })

        html += "</tr>"
    })

    html += "</table></div>"



    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html


}



