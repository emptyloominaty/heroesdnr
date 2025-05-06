function btnActivate(element, targetClass) {
    const parent = element.parentElement
    let buttons = Array.from(parent.querySelectorAll("."+targetClass))
    buttons.forEach(el => {
        el.classList.remove(targetClass);
    })
    element.classList.add(targetClass)
}



function setGameSpeed(val, el) {
    if (gamePaused) {
        gamePaused = false
    }
    gameSpeed = val
    btnActivate(el,"button_activated")   
}


function pauseGame(val, el) {
    gamePaused = !gamePaused 
    btnActivate(el, "button_activated")
}