let statsChartsMode = "income"
let open_statisticsCharts = function (btn_el = undefined, reload = false) {
    let windowId = 5
    let dontClose = false
    if (!reload) {
        open_window(windowId, btn_el)
        drawHeader("Statistics", windowId,btn_el)
    }
    if (currentWindow[windowId] === "statisticsCharts" && !reload && !dontClose) {
        close_window(windowId, btn_el)
        return
    } else {
        elements["windowBody" + windowId].innerHTML = ""
    }
    currentWindow[windowId] = "statisticsCharts"
    let html = ""
    html += "<div class='statistics' style='display:flex; flex-wrap:wrap;'>"
    html += `<button class="button_activated" id="sch_btn_income" onclick="statsChartsMode = 'income'; open_statisticsCharts(undefined,true)">Income</button>`

    html += `<button class="button_activated" id="sch_btn_age" onclick="statsChartsMode = 'age'; open_statisticsCharts(undefined,true)">Age</button>`
    html += `<button class="button_activated" id="sch_btn_rank" onclick="statsChartsMode = 'rank'; open_statisticsCharts(undefined,true)">Rank</button>`
    html += `<button class="button_activated" id="sch_btn_guilds" onclick="statsChartsMode = 'guilds'; open_statisticsCharts(undefined,true)">Guilds</button>`
    html += `<button class="button_activated" id="sch_btn_level" onclick="statsChartsMode = 'level'; open_statisticsCharts(undefined,true)">Level</button>`
    html += `<button class="button_activated" id="sch_btn_adventurousness" onclick="statsChartsMode = 'adventurousness'; open_statisticsCharts(undefined,true)">Adventurousness</button>`
    html += `<button class="button_activated" id="sch_btn_competitiveness" onclick="statsChartsMode = 'competitiveness'; open_statisticsCharts(undefined,true)">Competitiveness</button>`
    html += `<button class="button_activated" id="sch_btn_intelligence" onclick="statsChartsMode = 'intelligence'; open_statisticsCharts(undefined,true)">Intelligence</button>`
    html += `<button class="button_activated" id="sch_btn_sociability" onclick="statsChartsMode = 'sociability'; open_statisticsCharts(undefined,true)">Sociability</button>`
    html += `<button class="button_activated" id="sch_btn_tanks" onclick="statsChartsMode = 'tanks'; open_statisticsCharts(undefined,true)">Tanks</button>`
    html += `<button class="button_activated" id="sch_btn_damagedealers" onclick="statsChartsMode = 'damagedealers'; open_statisticsCharts(undefined,true)">Damage Dealers</button>`
    html += `<button class="button_activated" id="sch_btn_healers" onclick="statsChartsMode = 'healers'; open_statisticsCharts(undefined,true)">Healers</button>`
    html += `<button class="button_activated" id="sch_btn_gold" onclick="statsChartsMode = 'gold'; open_statisticsCharts(undefined,true)">Gold</button>`
    html += `<button class="button_activated" id="sch_btn_heroes" onclick="statsChartsMode = 'heroes'; open_statisticsCharts(undefined,true)">Heroes</button>`


    html += "<span style='width:100%;'></span>" //next row


    html += `<div id="sch_chart"></div>`

    html += "</div>"
    elements["windowBody" + windowId].innerHTML = html

    elementsWindow["chart" + windowId] = document.getElementById("sch_chart")
    elementsWindow["sch_btn_income"] = document.getElementById("sch_btn_income")
    elementsWindow["sch_btn_age"] = document.getElementById("sch_btn_age")
    elementsWindow["sch_btn_rank"] = document.getElementById("sch_btn_rank")
    elementsWindow["sch_btn_guilds"] = document.getElementById("sch_btn_guilds")
    elementsWindow["sch_btn_level"] = document.getElementById("sch_btn_level")
    elementsWindow["sch_btn_adventurousness"] = document.getElementById("sch_btn_adventurousness")
    elementsWindow["sch_btn_competitiveness"] = document.getElementById("sch_btn_competitiveness")
    elementsWindow["sch_btn_intelligence"] = document.getElementById("sch_btn_intelligence")
    elementsWindow["sch_btn_sociability"] = document.getElementById("sch_btn_sociability")
    elementsWindow["sch_btn_tanks"] = document.getElementById("sch_btn_tanks")
    elementsWindow["sch_btn_damagedealers"] = document.getElementById("sch_btn_damagedealers")
    elementsWindow["sch_btn_healers"] = document.getElementById("sch_btn_healers")
    elementsWindow["sch_btn_gold"] = document.getElementById("sch_btn_gold")
    elementsWindow["sch_btn_heroes"] = document.getElementById("sch_btn_heroes")

    /*
     statistics.age.shift()
        statistics.rank.shift()
        statistics.guilds.shift()
        statistics.level.shift()
        statistics.adventurousness.shift()
        statistics.competitiveness.shift()
        statistics.intelligence.shift()
        statistics.sociability.shift()
        statistics.tanks.shift()
        statistics.damagedealers.shift()
        statistics.healers.shift()
        statistics.gold.shift()
        statistics.heroes.shift()
        statistics.income.shift()
    */


    let logX = []
    let x = realtime
    for (let i = 0; i < statistics.income.length; i++) {
        logX.unshift(x / 720)
        x -= 720
    }

    if (statsChartsMode === "income") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 10, color1: '#99DD99', color2: '#DD9999', colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.income, chartConfig)
        elementsWindow["sch_btn_income"].classList.add('button_activated')
    } else if (statsChartsMode === "age") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.age, chartConfig)
        elementsWindow["sch_btn_age"].classList.add('button_activated')
    } else if (statsChartsMode === "rank") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.rank, chartConfig)
        elementsWindow["sch_btn_rank"].classList.add('button_activated')
    } else if (statsChartsMode === "guilds") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.guilds, chartConfig)
        elementsWindow["sch_btn_guilds"].classList.add('button_activated')
    } else if (statsChartsMode === "level") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.level, chartConfig)
        elementsWindow["sch_btn_level"].classList.add('button_activated')
    } else if (statsChartsMode === "adventurousness") {
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.adventurousness, chartConfig)
        elementsWindow["sch_btn_adventurousness"].classList.add('button_activated')
    } else if (statsChartsMode === "competitiveness") {
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.competitiveness, chartConfig)
        elementsWindow["sch_btn_competitiveness"].classList.add('button_activated')
    } else if (statsChartsMode === "intelligence") {
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.intelligence, chartConfig)
        elementsWindow["sch_btn_intelligence"].classList.add('button_activated')
    } else if (statsChartsMode === "sociability") {
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.sociability, chartConfig)
        elementsWindow["sch_btn_sociability"].classList.add('button_activated')
    } else if (statsChartsMode === "heroes") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.heroes, chartConfig)
        elementsWindow["sch_btn_heroes"].classList.add('button_activated')
    } else if (statsChartsMode === "tanks") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#9999DD', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.tanks, chartConfig)
        elementsWindow["sch_btn_tanks"].classList.add('button_activated')
    } else if (statsChartsMode === "damagedealers") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DD9999', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.damagedealers, chartConfig)
        elementsWindow["sch_btn_damagedealers"].classList.add('button_activated')
    } else if (statsChartsMode === "healers") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#99DD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.healers, chartConfig)
        elementsWindow["sch_btn_healers"].classList.add('button_activated')
    } else if (statsChartsMode === "gold") {
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, color1: '#DDDD99', color2: false, colorVal: 0, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], logX, statistics.gold, chartConfig)
        elementsWindow["sch_btn_gold"].classList.add('button_activated')
    }



    const buttons = [
        elementsWindow.sch_btn_income, elementsWindow.sch_btn_age, elementsWindow.sch_btn_rank, elementsWindow.sch_btn_guilds, elementsWindow.sch_btn_level, elementsWindow.sch_btn_adventurousness
        , elementsWindow.sch_btn_competitiveness, elementsWindow.sch_btn_intelligence, elementsWindow.sch_btn_heroes
        , elementsWindow.sch_btn_sociability, elementsWindow.sch_btn_tanks, elementsWindow.sch_btn_damagedealers, elementsWindow.sch_btn_healers, elementsWindow.sch_btn_gold
    ]
    buttons.forEach(button => button.classList.remove('button_activated'))

}
