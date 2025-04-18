let close_window = function (w = 0) {
    elements["windowHeader"+w].innerHTML = ""
    elements["windowBody"+w].innerHTML = ""
    currentWindow[w] = ""
}

let elementsWindow = {}
let currentWindow = ["","",""]

let drawHeader = function(name, w = 0) {
    elements["windowHeader"+w].innerHTML = "<div class='windowHeader'><span id='windowHeaderName' style='padding:2px;'>"+name+"</span> <div style='padding:0 3px 0 3px;font-size:20px;' onclick='close_window("+w+")'>x</div></div>"
}


let windowsUpdate = function () {
    for (let i = 0; i<currentWindow.length; i++) {
        if (currentWindow[i] === "") {
            continue
        } else if (currentWindow[i] === "heroeslist") {
            //TODO:
            open_heroeslist(true)
        } else if (currentWindow[i] === "heroinfo") {
            open_heroinfo(true,true)
        }
    }

}

let offsetX = [0,0,0]
let offsetY = [0,0,0]
let isDragging = [false,false,false]
for (let i = 0; i<currentWindow.length; i++) {
    elements["windowHeader"+i].addEventListener("mousedown", (e) => {
        isDragging[i] = true
        offsetX[i] = e.clientX - elements["window"+i].offsetLeft
        offsetY[i] = e.clientY - elements["window"+i].offsetTop
    })

    document.addEventListener("mousemove", (e) => {
        if (isDragging[i]) {
            elements["window"+i].style.left = `${e.clientX - offsetX[i]}px`
            elements["window"+i].style.top = `${e.clientY - offsetY[i]}px`
        }
    })

    document.addEventListener("mouseup", () => {
        isDragging[i] = false
    })
}