//TODO: hps,dtps   max:dps,hps,dtps    level charts, dps charts, hps charts, dtps charts, age chart, skill charts

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


    html += "<tr><th>Class</th><th>Total</th>"
    allRoles.forEach(role => html += `<th>${role}s</th>`)
    allRoles.forEach(role => html += `<th>${role} DPS</th><th>${role} ST DPS</th><th>${role} AOE DPS</th>`)
    html += "</tr>"

    let sortDps = "dps" //"dps", "stDps"
    //dps sort
    /*const sortedClassNames = Object.keys(classCounts)
        .sort((a, b) => {
            const roleDataA = dpsData[a]?.["dps"]
            const roleDataB = dpsData[b]?.["dps"]
            const avgDpsA = roleDataA ? roleDataA[sortDps] / roleDataA.count : 0
            const avgDpsB = roleDataB ? roleDataB[sortDps] / roleDataB.count : 0
            console.log(avgDpsB +" - "+ avgDpsA)
            return avgDpsB - avgDpsA
        })*/

    //count sort
    /*const sortedClassNames = Object.keys(classCounts)
        .sort((a, b) => {
            const totalA = Object.values(classRoleCounts[a] || {}).reduce((sum, count) => sum + count, 0);
            const totalB = Object.values(classRoleCounts[b] || {}).reduce((sum, count) => sum + count, 0);
            return totalB - totalA;
        })*/

    //default sort
    const sortedClassNames = Object.keys(classCounts).sort()


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



