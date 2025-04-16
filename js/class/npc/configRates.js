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

let spawnChances = {
    Warrior: 40,
    Rogue: 17,
    Archer: 35,
    Mage: 0.1,
    Priest: 3,
    Druid: 0.599,
    Monk: 1.4,
    Paladin: 2,
    Warlock: 0.01,
    Shaman: 0.9
}

//ST DPS
let roleMultipliersDpsST = {
    dps: 1,
    tank: 0.5,
    healer: 0.4
}
let classDpsMultipliersDpsST = {
    Warrior: 1,
    Rogue: 1.5,
    Archer: 1.5,
    Mage: 1,
    Druid: 1.2,
    Monk: 1.4,
    Paladin: 1,
    Warlock: 1.2,
    Shaman: 1.1,
}
let classHealerMultipliersDpsST = {
    Priest: 0.6,
    Druid: 1,
    Monk: 1.5,
    Paladin: 1.4,
    Shaman: 0.5
}
let classTankMultipliersDpsST = {
    Warrior: 1,
    Druid: 1.2,
    Paladin: 1.1
}

// AOE DPS
let roleMultipliersDpsAOE = {
    dps: 2,
    tank: 1.2,
    healer: 0.6
}
let classDpsMultipliersDpsAOE = {
    Warrior: 1.2,
    Rogue: 0.95,
    Archer: 0.85,
    Mage: 2,
    Druid: 1.3,
    Monk: 1.2,
    Paladin: 1.2,
    Warlock: 1.8,
    Shaman: 1.6,
}
let classHealerMultipliersDpsAOE = {
    Priest: 0.6,
    Druid: 1,
    Monk: 1.5,
    Paladin: 1.4,
    Shaman: 0.5
}
let classTankMultipliersDpsAOE = {
    Warrior: 1.2,
    Druid: 1.2,
    Paladin: 1.1
}
//ST HPS
let roleMultipliersHpsST = {
    dps: 0.1,
    tank: 0.2,
    healer: 1
}
let classDpsMultipliersHpsST = {
    Warrior: 0,
    Rogue: 0,
    Archer: 0,
    Mage: 0.2,
    Druid: 1,
    Monk: 0.8,
    Paladin: 2,
    Warlock: 0,
    Shaman: 0.5,
}
let classHealerMultipliersHpsST = {
    Priest: 1.2,
    Druid: 1.1,
    Monk: 1,
    Paladin: 1,
    Shaman: 1.1
}
let classTankMultipliersHpsST = {
    Warrior: 0,
    Druid: 1,
    Paladin: 2.5
}
//AOE HPS
let roleMultipliersHpsAOE = {
    dps: 0.2,
    tank: 0.1,
    healer: 2
}
let classDpsMultipliersHpsAOE = {
    Warrior: 0,
    Rogue: 0,
    Archer: 0,
    Mage: 0.1,
    Druid: 1.2,
    Monk: 0.5,
    Paladin: 3,
    Warlock: 0,
    Shaman: 0.6,
}
let classHealerMultipliersHpsAOE = {
    Priest: 1.2,
    Druid: 1.1,
    Monk: 1.05,
    Paladin: 1.2,
    Shaman: 1.1
}
let classTankMultipliersHpsAOE = {
    Warrior: 0,
    Druid: 1,
    Paladin: 2.5
}
//DTPS Physical
let roleMultipliersDtpsP = {
    dps: 1,
    tank: 1,
    healer: 1
}
let classDpsMultipliersDtpsP = {
    Warrior: 1.2,
    Rogue: 0.65,
    Archer: 0.6,
    Mage: 0.3,
    Druid: 0.6,
    Monk: 0.7,
    Paladin: 2,
    Warlock: 0.3,
    Shaman: 0.6,
}
let classHealerMultipliersDtpsP = {
    Priest: 0.3,
    Druid: 0.6,
    Monk: 0.65,
    Paladin: 1.5,
    Shaman: 0.6
}
let classTankMultipliersDtpsP = {
    Warrior: 4,
    Druid: 3.5,
    Paladin: 4
}
//DTPS Magic
let roleMultipliersDtpsM = {
    dps: 1,
    tank: 1,
    healer: 1
}
let classDpsMultipliersDtpsM = {
    Warrior: 0.2,
    Rogue: 0.8,
    Archer: 0.6,
    Mage: 2,
    Druid: 1.5,
    Monk: 1,
    Paladin: 1.8,
    Warlock: 1.5,
    Shaman: 1.7,
}
let classHealerMultipliersDtpsM = {
    Priest: 1,
    Druid: 1,
    Monk: 0.75,
    Paladin: 1,
    Shaman: 1.2
}
let classTankMultipliersDtpsM = {
    Warrior: 3,
    Druid: 4,
    Paladin: 4
}
