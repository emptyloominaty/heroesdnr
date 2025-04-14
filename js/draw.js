let elements = {
    "gold": document.getElementById("gold"),
    "income": document.getElementById("income"),
    "heroes": document.getElementById("heroes"),
    "travelers": document.getElementById("travelers"),
}


function draw() {
    elements["gold"].textContent = Math.round(gold2)

    if (income >= 0) {
        elements["income"].textContent = "+"+Math.round(income * 10) / 10
    } else {
        elements["income"].textContent = Math.round(income * 10) / 10
    }

    elements["heroes"].textContent = heroes.length + "/" + heroesMax


}