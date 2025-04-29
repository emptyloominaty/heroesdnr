let raceMaxAge = {
    human: 100,
    elf: 10000,
    darkElf: 10000,
    dwarf: 200,
    orc: 120,
    goblin: 100
}

let races = {
    human: {chance: 100, maxAge: 90, relations:{human:1, elf:0.85, darkElf:0.5, dwarf: 0.85, orc: 0.15, goblin: 0.1}, banned:false},
    elf: {chance: 1, maxAge: 10000, relations:{human:0.85, elf:1, darkElf:0.1, dwarf: 0.4, orc: 0.05, goblin: 0.05}, banned:false},
    darkElf: {chance: 1, maxAge: 10000, relations:{human:0.5, elf:0.1, darkElf:1, dwarf: 0.3, orc: 0.5, goblin: 0.5}, banned:true},
    dwarf: {chance: 10, maxAge: 200, relations:{human:0.85, elf:0.1, darkElf:0.3, dwarf: 1, orc: 0.1, goblin: 0.1}, banned:false},
    orc: {chance: 14, maxAge: 120, relations:{human:0.15, elf:0.05, darkElf:0.5, dwarf: 0.1, orc: 1, goblin: 0.95}, banned:true},
    goblin: {chance: 10, maxAge: 100, relations:{human:0.1, elf:0.05, darkElf:0.5, dwarf: 0.1, orc: 0.95, goblin: 1}, banned:true},
}

let spawnChances2 = {
    human: {
        Warrior: { tank: 14.65, dps: 10.76 },
        Rogue: { dps: 14.71 },
        Ranger: { dps: 14.71 },
        Mage: { dps: 2.47 },
        Priest: { healer: 6.88, dps: 2.94 },
        Druid: { healer: 1.53, dps: 0.94, tank: 0.9 },
        Monk: { dps: 5.88, healer: 2.41 },
        Paladin: { healer: 3.94, dps: 4.94, tank: 3.94 },
        Warlock: { dps: 1.48 },
        Shaman: { dps: 2.18, healer: 2.28 }
    }, dwarf: {
        Warrior: { tank: 18, dps: 12 },
        Rogue: { dps: 10 },
        Ranger: { dps: 8 },
        Mage: { dps: 1.2 },
        Priest: { healer: 1, dps: 1.5 },
        Druid: { healer: 0, dps: 0, tank: 0 },
        Monk: { dps: 4, healer: 1.5 },
        Paladin: { healer: 3.5, dps: 5, tank: 5.5 },
        Warlock: { dps: 1 },
        Shaman: { dps: 4, healer: 4.5 }
    }, elf: {
        Warrior: { tank: 4, dps: 5 },
        Rogue: { dps: 14 },
        Ranger: { dps: 18 },
        Mage: { dps: 6.5 },
        Priest: { healer: 10, dps: 4 },
        Druid: { healer: 7, dps: 4, tank: 1 },
        Monk: { dps: 0.4, healer: 0.8 },
        Paladin: { healer: 2.0, dps: 1, tank: 1 },
        Warlock: { dps: 0 },
        Shaman: { dps: 0, healer: 0 }
    }, darkElf: {
        Warrior: { tank: 6, dps: 7 },
        Rogue: { dps: 18 },
        Ranger: { dps: 11 },
        Mage: { dps: 4 },
        Priest: { healer: 3, dps: 6 },
        Druid: { healer: 0, dps: 0, tank: 0 },
        Monk: { dps: 2, healer: 2 },
        Paladin: { healer: 0, dps: 0, tank: 0 },
        Warlock: { dps: 6 },
        Shaman: { dps: 0, healer: 0 }
    }, orc: {
        Warrior: { tank: 20, dps: 14 },
        Rogue: { dps: 1.5 },
        Ranger: { dps: 6 },
        Mage: { dps: 0.2 },
        Priest: { healer: 0, dps: 0 },
        Druid: { healer: 0, dps: 0, tank: 0 },
        Monk: { dps: 5, healer: 2 },
        Paladin: { healer: 0, dps: 0, tank: 0 },
        Warlock: { dps: 2.5 },
        Shaman: { dps: 7, healer: 14 }
    }, goblin: {
        Warrior: { tank: 4, dps: 5 },
        Rogue: { dps: 20 },
        Ranger: { dps: 12 },
        Mage: { dps: 0.3 },
        Priest: { healer: 0, dps: 0 },
        Druid: { healer: 0, dps: 0, tank: 0 },
        Monk: { dps: 1.3, healer: 0.8 },
        Paladin: { healer: 0, dps: 0, tank: 0 },
        Warlock: { dps: 4 },
        Shaman: { dps: 7, healer: 5.0 }
    }
}

let spawnChances = {
    Warrior: { tank: 14.65, dps: 10.76 },
    Rogue: { dps: 14.71 },
    Ranger: { dps: 14.71 },
    Mage: { dps: 2.47 },
    Priest: { healer: 6.88, dps: 2.94 },
    Druid: { healer: 2.53, dps: 1.94, tank: 1.35 },
    Monk: { dps: 5.88, healer: 2.41 },
    Paladin: { healer: 3.94, dps: 4.94, tank: 3.94 },
    Warlock: { dps: 1.48 },
    Shaman: { dps: 2.18, healer: 2.28 }
}



let rolesConfig = {
    dps: {dpsSt: 1, dpsAoe: 2, hpsSt:1, hpsAoe:2, dtpsP:1, dtpsM:1},
    healer: {dpsSt: 1, dpsAoe: 2, hpsSt:1, hpsAoe:2, dtpsP:1, dtpsM:1},
    tank: {dpsSt: 1, dpsAoe: 2, hpsSt:1, hpsAoe:2, dtpsP:1, dtpsM:1}
}

let heroesConfig = {
    Warrior: {
        dps:   {dpsSt: 1.0, dpsAoe: 1.4, hpsSt:0.0, hpsAoe:0.0, dtpsP:1.2, dtpsM:0.45, speed: 1.1, hMul: 1.25, fMul: 1.2, escape: 0.2, critFailD: 1.3, femaleR:[50,1]},
        tank:  {dpsSt: 0.5, dpsAoe: 0.65, hpsSt: 0.0, hpsAoe: 0.0, dtpsP: 5.3, dtpsM: 3, speed: 0.9, hMul: 1.3, fMul: 1.2, escape: 0.18, critFailD: 1.3, femaleR:[100,1]}},
    Rogue: {
        dps:   {dpsSt: 1.9, dpsAoe: 1.0, hpsSt: 0.0, hpsAoe: 0.0, dtpsP: 0.65, dtpsM: 0.8, speed: 1.2, hMul: 1.0, fMul: 1.0, escape: 0.4, critFailD: 0.8, femaleR:[5,1]}},
    Ranger: {
        dps:   {dpsSt: 1.85, dpsAoe: 0.95, hpsSt: 0.02, hpsAoe: 0.0, dtpsP: 0.6, dtpsM: 0.6, speed: 1.15, hMul: 1.1, fMul: 0.95, escape: 0.3, critFailD: 0.9, femaleR:[4,1]}},
    Mage: {
        dps:   {dpsSt: 1.3, dpsAoe: 1.9, hpsSt: 0.05, hpsAoe: 0.05, dtpsP: 0.3, dtpsM: 2.5, speed: 0.9, hMul: 0.8, fMul: 0.85, escape: 0.3, critFailD: 0.85, femaleR: [2, 1]}},
    Druid: {
        dps:   {dpsSt: 0.8, dpsAoe: 1.8, hpsSt: 0.1, hpsAoe: 0.2, dtpsP: 0.6, dtpsM: 2.3, speed: 1.35, hMul: 0.85, fMul: 0.9, escape: 0.35, critFailD: 1, femaleR: [1, 1]},
        healer:{dpsSt: 0.1, dpsAoe: 0.4, hpsSt: 1.1, hpsAoe: 1.2, dtpsP: 0.6, dtpsM: 1.0, speed: 1.35, hMul: 0.85, fMul: 0.9, escape: 0.35, critFailD: 1, femaleR: [1, 2]},
        tank:  {dpsSt: 0.7, dpsAoe: 0.9, hpsSt: 0.1, hpsAoe: 0.2, dtpsP: 3.5, dtpsM: 4.0, speed: 1.35, hMul: 0.95, fMul: 0.9, escape: 0.35, critFailD: 1, femaleR: [1, 1]}},
    Monk: {
        dps:   {dpsSt: 1.2, dpsAoe: 1.55, hpsSt: 0.15, hpsAoe: 0.0, dtpsP: 0.7, dtpsM: 1.0, speed: 1.25, hMul: 0.75, fMul: 0.75, escape: 0.35, critFailD: 1, femaleR: [120, 1]},
        healer:{dpsSt: 0.55, dpsAoe: 0.9, hpsSt: 1.0, hpsAoe: 1.15, dtpsP: 0.7, dtpsM: 1.0, speed: 1.25, hMul: 0.75, fMul: 0.75, escape: 0.35, critFailD: 1, femaleR: [80, 1]}},
    Priest: {
        dps:   {dpsSt: 1.2, dpsAoe: 1.5, hpsSt: 0.25, hpsAoe: 0.25, dtpsP: 0.3, dtpsM: 1.3, speed: 0.95, hMul: 0.9, fMul: 1.0, escape: 0.2, critFailD: 1.2, femaleR: [1.5, 1]},
        healer:{dpsSt: 0.1, dpsAoe: 0.2, hpsSt: 1.2, hpsAoe: 1.2, dtpsP: 0.3, dtpsM: 1.0, speed: 0.95, hMul: 0.9, fMul: 1.0, escape: 0.2, critFailD: 1.2, femaleR: [1, 1.5]}},
    Paladin: {
        dps:   {dpsSt: 1.2, dpsAoe: 1.5, hpsSt: 0.2, hpsAoe: 0.1, dtpsP: 2.0, dtpsM: 1.8, speed: 0.92, hMul: 1.15, fMul: 1.2, escape: 0.22, critFailD: 1.5, femaleR: [35, 1]},
        healer:{dpsSt: 0.4, dpsAoe: 0.6, hpsSt: 1.4, hpsAoe: 1.0, dtpsP: 2.0, dtpsM: 1.0, speed: 0.88, hMul: 1.15, fMul: 1.2, escape: 0.26, critFailD: 1.5, femaleR: [30, 1]},
        tank:  {dpsSt: 0.55, dpsAoe: 0.8, hpsSt: 0.5, hpsAoe: 0.1, dtpsP: 4.0, dtpsM: 4.0, speed: 0.85, hMul: 1.2, fMul: 1.25, escape: 0.26, critFailD: 1.6, femaleR: [80, 1]}},
    Warlock: {
        dps:   {dpsSt: 1.7, dpsAoe: 1.8, hpsSt: 0.0, hpsAoe: 0.0, dtpsP: 0.3, dtpsM: 1.5, speed: 0.9, hMul: 0.95, fMul: 0.9, escape: 0.2, critFailD: 0.6, femaleR: [1, 1]}},
    Shaman: {
        dps:   {dpsSt: 1.2, dpsAoe: 1.7, hpsSt: 0.05, hpsAoe: 0.25, dtpsP: 0.6, dtpsM: 2.0, speed: 0.98, hMul: 1.0, fMul: 0.95, escape: 0.2, critFailD: 1, femaleR: [1, 1]},
        healer:{dpsSt: 0.1, dpsAoe: 0.2, hpsSt: 1.0, hpsAoe: 1.35, dtpsP: 0.6, dtpsM: 1.2, speed: 1.0, hMul: 1.0, fMul: 0.95, escape: 0.2, critFailD: 1, femaleR: [1, 1]}},


    RuneKnight: {
        dps: {dpsSt: 1.8, dpsAoe: 1.3, hpsSt: 0.0, hpsAoe: 0.0, dtpsP: 2, dtpsM: 2, speed: 0.8, hMul: 0.5, fMul: 0.5, escape: 0.1, critFailD: 1.5, femaleR:[50,1]},
        tank: {dpsSt: 0.9, dpsAoe: 0.6, hpsSt: 0, hpsAoe: 0.0, dtpsP: 5, dtpsM: 4.5, speed: 0.75, hMul: 0.5, fMul: 0.5, escape: 0.1, critFailD: 1.5, femaleR:[100,1]}},
}