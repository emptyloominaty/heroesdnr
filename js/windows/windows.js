let close_window = function (w = 0,el = undefined) {
    elements["windowHeader"+w].innerHTML = ""
    elements["windowBody"+w].innerHTML = ""
    currentWindow[w] = ""
    document.getElementById("window" + w).style.display = "none"
    if (el !== undefined) {
        el.classList.remove("button_activated")
    }
}


let open_window = function (w = 0,el = undefined) {
    document.getElementById("window" + w).style.display = "block"
    if (el !== undefined) {
        el.classList.add("button_activated")
    }
}

let elementsWindow = {}
let currentWindow = ["", "", "", "", "", "", "", "", ""]

let drawHeader = function(name, w = 0, el = undefined) {
    elements["windowHeader"+w].innerHTML = "<div class='windowHeader'><span id='windowHeaderName' style='padding:2px;'>"+name+"</span> <div style='padding:0 3px 0 3px;font-size:20px;' onclick='close_window("+w+","+el+")'>x</div></div>"
}


let windowsUpdate = function () {
    for (let i = 0; i<currentWindow.length; i++) {
        if (currentWindow[i] === "") {
            continue
        } else if (currentWindow[i] === "heroeslist") {
            open_heroeslist(undefined,true,true)
        } else if (currentWindow[i] === "heroinfo") {
            open_heroinfo(undefined,true,true)
        } else if (currentWindow[i] === "dungeonlist") {
            open_dungeonlist(undefined,true,true)
        } else if (currentWindow[i] === "buildinginfo") {
            open_buildinginfo(undefined,true,true)
        } else if (currentWindow[i] === "dungeonlogs") {
            open_dungeonlogs(undefined, true, true)
        }

        
    }
}

let offsetX = [0,0,0]
let offsetY = [0,0,0]
let isDragging = [false,false,false]
for (let i = 0; i<currentWindow.length; i++) {
    elements["windowHeader" + i].addEventListener("mousedown", (e) => {
        isDragging[i] = true
        offsetX[i] = e.clientX - elements["window"+i].offsetLeft
        offsetY[i] = e.clientY - elements["window"+i].offsetTop
    })
    elements["window" + i].addEventListener("mousedown", (e) => {
        bringToTop("window" + i)
    })
    document.addEventListener("mousemove", (e) => {
        if (isDragging[i]) {
            const el = elements["window" + i]
            el.style.left = `${e.clientX - offsetX[i]}px`
            el.style.top = `${e.clientY - offsetY[i]}px`

            const winWidth = window.innerWidth
            const winHeight = window.innerHeight

            //const rect = el.getBoundingClientRect()
            const width = 50 //rect.width
            const height = 20 //rect.height

            let left = parseInt(elements["window" + i].style.left, 10)
            let top = parseInt(elements["window" + i].style.top, 10)

            left = Math.max(0, Math.min(left, winWidth - width))
            top = Math.max(0, Math.min(top, winHeight - height))

            el.style.left = `${left}px`
            el.style.top = `${top}px`
        }
    })

    document.addEventListener("mouseup", () => {
        isDragging[i] = false
    })
}

let zOrder = ["window0", "window1", "window2", "window3", "window4", "window5", "window6", "window7", "window8"]

function bringToTop(targetId) {
    zOrder = zOrder.filter(id => id !== targetId)
    zOrder.push(targetId)

    zOrder.forEach((id, index) => {
        const el = document.getElementById(id)
        if (el) {
            el.style.zIndex = index + 100
        }
    })
}

function makeResizable(windowId) {
    const el = document.getElementById(windowId);
    const resizer = el.querySelector(".resizer");
    const body = el.querySelector(".windowBody");

    resizer.addEventListener("mousedown", function (e) {
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(getComputedStyle(body).width, 10);
        const startHeight = parseInt(getComputedStyle(body).height, 10);

        function doDrag(e) {
            body.style.width = (startWidth + e.clientX - startX) + "px";
            body.style.height = (startHeight + e.clientY - startY) + "px";
        }

        function stopDrag() {
            document.removeEventListener("mousemove", doDrag);
            document.removeEventListener("mouseup", stopDrag);
        }

        document.addEventListener("mousemove", doDrag);
        document.addEventListener("mouseup", stopDrag);
    });
}


zOrder.forEach(makeResizable)