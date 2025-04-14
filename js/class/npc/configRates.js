function CharactergetHungerRate(characterClass) {
    switch (characterClass) {
        case "warrior":
            return 1.3
        default:
            return 1.0
    }
}

function CharactergetFatigueRate(characterClass) {
    switch (characterClass) {
        case "mage":
            return 1.3
        default:
            return 1.0
    }
}