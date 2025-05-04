function hideTooltip() {
    elements.tooltip.style.display = "none"
}

function showTooltip() {
    elements.tooltip.style.display = "block"
}

function updateTooltipLocation(msx, msy) {
    elements.tooltip.style.left = (msx + 30) + "px"
    elements.tooltip.style.top = (msy + 15) + "px"
}