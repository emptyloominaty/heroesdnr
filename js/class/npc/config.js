let hungerMultiplier = {
    Warrior: 1.3,
    Rogue: 1.0,
    Ranger: 1.1,
    Mage: 0.8,
    Druid: 0.85,
    Monk: 0.75,
    Priest: 0.9,
    Paladin: 1.2,
    Warlock: 0.95,
    Shaman: 1.0
}

let fatigueMultiplier = {
    Warrior: 1.2,
    Rogue: 1.0,
    Ranger: 0.95,
    Mage: 0.85,
    Druid: 0.9,
    Monk: 0.75,
    Priest: 1.0,
    Paladin: 1.25,
    Warlock: 0.9,
    Shaman: 0.95
}
let raceChances = {
    human: 100,
    elf: 1,
    dwarf: 10
}

let raceMaxAge = {
    human: 100,
    elf: 10000,
    dwarf: 200
}


let femaleMaleClassRatio = {
    Warrior: [50,1],
    Rogue: [5,1],
    Ranger: [4,1],
    Mage: [2,1],
    Priest: [1,1.5],
    Druid: [1,1],
    Monk: [100,1],
    Paladin: [40,1],
    Warlock: [1,1],
    Shaman: [1,1]
}

let movementSpeedMultiplier = {
    Warrior: 0.95,
    Rogue: 1.2,
    Ranger: 1.15,
    Mage: 0.9,
    Druid: 1.15,
    Monk: 1.25,
    Priest: 0.95,
    Paladin: 0.9,
    Warlock: 0.9,
    Shaman: 0.95,
}

let spawnChances = {
    Warrior: { tank: 14.65, dps: 14.76 },
    Rogue: { dps: 14.71 },
    Ranger: { dps: 14.71 },
    Mage: { dps: 1.47 },
    Priest: { healer: 6.88, dps: 2.94 },
    Druid: { healer: 2.53, dps: 1.94, tank: 1.35 },
    Monk: { dps: 5.88, healer: 2.41 },
    Paladin: { healer: 3.94, dps: 4.94, tank: 3.94 },
    Warlock: { dps: 0.48 },
    Shaman: { dps: 1.18, healer: 1.28 }
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
    Ranger: 1.5,
    Mage: 1,
    Druid: 1.2,
    Monk: 1.2,
    Priest: 1.3,
    Paladin: 1,
    Warlock: 1.7,
    Shaman: 1.2,
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
    Druid: 1.35,
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
    Ranger: 0.85,
    Mage: 2,
    Druid: 1.3,
    Priest: 1.5,
    Monk: 1.4,
    Paladin: 1.2,
    Warlock: 1.8,
    Shaman: 1.7,
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
    Druid: 1.25,
    Paladin: 1.15
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
    Ranger: 0,
    Mage: 0.2,
    Druid: 1,
    Monk: 0.8,
    Priest: 2.5,
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
    Ranger: 0,
    Mage: 0.1,
    Druid: 1.2,
    Monk: 0.5,
    Priest: 4,
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
    Ranger: 0.6,
    Mage: 0.3,
    Druid: 0.6,
    Monk: 0.7,
    Priest: 0.3,
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
    Warrior: 5,
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
    Ranger: 0.6,
    Mage: 2,
    Druid: 1.5,
    Priest: 1,
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
