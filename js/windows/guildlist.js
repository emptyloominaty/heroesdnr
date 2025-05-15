let guildListLength = 0
let open_guildList = function (btn_el = undefined, reload = false, update = false) {
    let windowId = 6
    if (update) {
        if (guilds.length === guildListLength) {
            for (let i = 0; i < guilds.length; i++) {
                let guild = guilds[i]
                elementsWindow.gl_guildName[i].textContent = guild.name
            }
            return
        }
    }


    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("List of Guilds", windowId, btn_el)
    }
    if (currentWindow[windowId] === "guildlist" && !reload) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "guildlist"



    let html = ""
    html += "<div style='display:flex; flex-wrap:wrap;width:100%;'>"
    html += `<div style='overflow:auto;width:100%;'><table><tr class='heroListFirstRow'>
        <th class="statsHeaderTh" onclick="sortTable('guildName',${windowId})" data-sortkey='guildName'>Name</th>
        <th class="statsHeaderTh" onclick="sortTable('heroes',${windowId})" data-sortkey='heroes'>Heroes</th>
        <th class="statsHeaderTh" onclick="sortTable('guildmaster',${windowId})" data-sortkey='guildmaster'>Guildmaster</th>
        <th class="statsHeaderTh" onclick="sortTable('rankPoints',${windowId})" data-sortkey='rankPoints'>Rank Points</th>
        <th class="statsHeaderTh" onclick="sortTable('rank',${windowId})" data-sortkey='rank'>Rank</th>
        <th class="statsHeaderTh" onclick="sortTable('created',${windowId})" data-sortkey='created'>Created</th>
          `
    for (let i = 0; i < guilds.length; i++) {
        let guild = guilds[i]
        let rank = getRank(guild.rankPoints)
        let rankC = rank
        if (isMythicPlusNumber(rankC)) {
            rankC = "Mythic I"
        }
        if (charactersMap[guild.guildmaster] === undefined || guild.dead) {
            continue
        }
        html += `<tr class='heroListRow' onclick='open_guildinfo(undefined,false,false,${i})'>
            <td data-sortkey='guildName' id='gl_guildName${i}'>${guild.name}</td>
            <td data-sortkey='heroes' id='gl_heroes${i}'>${guild.heroes.length}</td>
            <td data-sortkey='guildmaster' id='gl_guildmaster${i}'> ${charactersMap[guild.guildmaster].name}</td>
            <td data-sortkey='rankPoints' id='gl_rankPoints${i}'>${getNumberString(guild.rankPoints)}</td>
            <td data-sortkey='rank'  style='color:${colors.ranks[rankC]}' id='gl_rank${i}'>${getRank(guild.rankPoints)}</td>
            <td data-sortkey='created' id='gl_created${i}'>${getTime2(guild.created)}</td>
            `
    }
    html += "</table></div>"
    html += "</div>"
    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow.gl_guildName = []
    for (let i = 0; i < heroes.length; i++) {
        elementsWindow.gl_guildName.push(document.getElementById("gl_guildName" + i))
    }
    guildListLength = guilds.length
}

