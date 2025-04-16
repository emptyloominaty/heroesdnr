let close_window = function () {
    elements.windowHeader.innerHTML = ""
    elements.windowBody.innerHTML = ""
    currentWindow = ""
}

let currentWindow = ""

let drawHeader = function(name) {
    elements.windowHeader.innerHTML = "<div class='windowHeader'><span id='windowHeaderName' style='padding:2px;'>"+name+"</span> <div style='padding:0 3px 0 3px;font-size:20px;' onclick='close_window()'>x</div></div>"
}


let windowsUpdate = function () {
    if (currentWindow === "") {
        return
    } else if (currentWindow === "heroeslist") {
        //TODO:
        open_heroeslist(true) 
    }
}

let offsetX = 0
let offsetY = 0
let isDragging = false

elements.window.addEventListener("mousedown", (e) => {
    isDragging = true
    offsetX = e.clientX - elements.window.offsetLeft
    offsetY = e.clientY - elements.window.offsetTop
})

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        elements.window.style.left = `${e.clientX - offsetX}px`
        elements.window.style.top = `${e.clientY - offsetY}px`
    }
})

document.addEventListener("mouseup", () => {
    isDragging = false
})