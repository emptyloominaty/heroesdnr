function btnActivate(element, targetClass) {
    const parent = element.parentElement
    let buttons = Array.from(parent.querySelectorAll("."+targetClass))
    buttons.forEach(el => {
        el.classList.remove(targetClass);
    })
    element.classList.add(targetClass)
}



function setGameSpeed(val, el) {
    gameSpeed = val
    btnActivate(el,"button_activated")   
}