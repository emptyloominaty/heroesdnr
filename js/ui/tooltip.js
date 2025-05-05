let tooltipElements = {}
let tooltip = {active:false, type:"hero", obj: undefined}


function hideTooltip() {
    tooltip.active = false
    tooltip.obj = undefined
    elements.tooltip.style.display = "none"
}

function showTooltip(obj, type = "hero") {
    if (!tooltip.active && tooltip.obj === obj) {
        return false
    }
    tooltip.active = true
    elements.tooltip.style.display = "block"
    let html = "<div style='display:flex; flex-direction:column;'>"
    if (type === "hero") {
        tooltip.obj = obj
        tooltip.type = "hero"
        elements.tooltip.style.color = colors[obj.characterClass]
        html += `<h3>${obj.name}</h3>`
        html += `<hr style="width:100%">`
        html += `<span>Level ${obj.level} ${obj.characterSpec} ${obj.characterClass} </span>`
        html += `<span id="tooltip_status">${obj.status}</span>`
    } else if (type === "building") {
        tooltip.obj = obj
        tooltip.type = "building"
        elements.tooltip.style.color = colors.text
        html += `<h3>${obj.name}</h3>`
        html += `<hr style="width:100%">`
        html += `<span>Level ${obj.level} ${obj.type} </span>`
        html += `<span id="tooltip_status"></span>`
    }
    html+="</div>"
    elements.tooltip.innerHTML = html
    elements.tooltip_status = document.getElementById("tooltip_status")
}

function updateTooltipLocation(msx, msy) {
    elements.tooltip.style.left = (msx + 30) + "px"
    elements.tooltip.style.top = (msy + 15) + "px"
}

function updateTooltip() {
    if (!tooltip.active) {
        return false
    }
    if (tooltip.type === "hero") {
        elements.tooltip_status.textContent = tooltip.obj.status
    } else if (tooltip.type === "building") {

    }
}


