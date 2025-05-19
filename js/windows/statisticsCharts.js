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
    html += `<button class="button_activated" id="sch_btn_levels" onclick="statsChartsMode = 'levels'; open_statisticsCharts(undefined,true)">Levels (ML)</button>`
    html += `<button class="button_activated" id="sch_btn_classes" onclick="statsChartsMode = 'classes'; open_statisticsCharts(undefined,true)">Classes (ML)</button>`
    html += `<button class="button_activated" id="sch_btn_ranks" onclick="statsChartsMode = 'ranks'; open_statisticsCharts(undefined,true)">Ranks (ML)</button>`


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
    elementsWindow["sch_btn_levels"] = document.getElementById("sch_btn_levels")
    elementsWindow["sch_btn_classes"] = document.getElementById("sch_btn_classes")
    elementsWindow["sch_btn_ranks"] = document.getElementById("sch_btn_ranks")

    let logX = []
    let x = realtime
    for (let i = 0; i < statistics.income.length; i++) {
        logX.unshift(x / 720)
        x -= 720
    }

    if (statsChartsMode === "income") {
        let datasets = [{xData: logX, yData: statistics.income, color1: '#99DD99', color2: '#DD9999', colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 10, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_income"].classList.add('button_activated')
    } else if (statsChartsMode === "age") {
        let datasets = [{xData: logX, yData: statistics.age, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_age"].classList.add('button_activated')
    } else if (statsChartsMode === "rank") {
        let datasets = [{xData: logX, yData: statistics.rank, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_rank"].classList.add('button_activated')
    } else if (statsChartsMode === "guilds") {
        let datasets = [{xData: logX, yData: statistics.guilds, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_guilds"].classList.add('button_activated')
    } else if (statsChartsMode === "level") {
        let datasets = [{xData: logX, yData: statistics.level, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_level"].classList.add('button_activated')
    } else if (statsChartsMode === "adventurousness") {
        let datasets = [{xData: logX, yData: statistics.adventurousness, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_adventurousness"].classList.add('button_activated')
    } else if (statsChartsMode === "competitiveness") {
        let datasets = [{xData: logX, yData: statistics.competitiveness, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_competitiveness"].classList.add('button_activated')
    } else if (statsChartsMode === "intelligence") {
        let datasets = [{xData: logX, yData: statistics.intelligence, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_intelligence"].classList.add('button_activated')
    } else if (statsChartsMode === "sociability") {
        let datasets = [{xData: logX, yData: statistics.sociability, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 2, xTicks: 10, yTicks: 10, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_sociability"].classList.add('button_activated')
    } else if (statsChartsMode === "heroes") {
        let datasets = [{xData: logX, yData: statistics.heroes, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_heroes"].classList.add('button_activated')
    } else if (statsChartsMode === "tanks") {
        let datasets = [{xData: logX, yData: statistics.tanks, color1: '#9999DD', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_tanks"].classList.add('button_activated')
    } else if (statsChartsMode === "damagedealers") {
        let datasets = [{xData: logX, yData: statistics.damagedealers, color1: '#DD9999', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_damagedealers"].classList.add('button_activated')
    } else if (statsChartsMode === "healers") {
        let datasets = [{xData: logX, yData: statistics.healers, color1: '#99DD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_healers"].classList.add('button_activated')
    } else if (statsChartsMode === "gold") {
        let datasets = [{xData: logX, yData: statistics.gold, color1: '#DDDD99', color2: false, colorVal: 0}]
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 2}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_gold"].classList.add('button_activated')
    } else if (statsChartsMode === "levels") {
        let datasets = []
        const keys = Object.keys(statistics.levels)
            .map(k => parseInt(k)) 
            .sort((a, b) => a - b)
        for (let i = 0; i < keys.length; i++) {
            const level = statistics.levels[keys[i]]
            let label = Math.floor(keys[i] * 10) + "-" + (Math.floor(keys[i] * 10)+9)
            datasets.push({xData: logX, yData: level, color1: colors.levelStatistics[i], color2: false, colorVal: 0, label: label})
        }
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 1.5}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_levels"].classList.add('button_activated')
    } else if (statsChartsMode === "classes") {
        let datasets = []
        Object.keys(statistics.classes).forEach(key => {
            datasets.push({xData: logX, yData: statistics.classes[key], color1: colors[key], color2: false, colorVal: 0, label: key})
        })
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 1.5}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_classes"].classList.add('button_activated')
    } else if (statsChartsMode === "ranks") {
        let datasets = []
        Object.keys(statistics.ranks).forEach(key => {
            datasets.push({xData: logX, yData: statistics.ranks[key], color1: colors.ranks[key], color2: false, colorVal: 0, label: key})
        })
        let chartConfig = {xRounding: 0, yRounding: 0, xTicks: 10, yTicks: 20, lineWidth: 1.5}
        let chart = new Chart(elementsWindow["chart" + windowId], datasets, chartConfig)
        elementsWindow["sch_btn_ranks"].classList.add('button_activated')
    }



    const buttons = [
        elementsWindow.sch_btn_income, elementsWindow.sch_btn_age, elementsWindow.sch_btn_rank, elementsWindow.sch_btn_guilds, elementsWindow.sch_btn_level, elementsWindow.sch_btn_adventurousness,
        elementsWindow.sch_btn_competitiveness, elementsWindow.sch_btn_intelligence, elementsWindow.sch_btn_heroes,
        elementsWindow.sch_btn_sociability, elementsWindow.sch_btn_tanks, elementsWindow.sch_btn_damagedealers, elementsWindow.sch_btn_healers, elementsWindow.sch_btn_gold, elementsWindow.sch_btn_levels,
        elementsWindow.sch_btn_classes, elementsWindow.sch_btn_ranks
    ]
    buttons.forEach(button => button.classList.remove('button_activated'))

}
