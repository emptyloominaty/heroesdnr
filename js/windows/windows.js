let close_window = function () {
    elements.window.innerHTML = ""
    currentWindow = ""
}

let currentWindow = ""


let windowsUpdate = function () {


    if (currentWindow === "") {
        return
    } else if (currentWindow === "heroeslist") {
        open_heroeslist(true)
        //TODO:
    }
}