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
        dps:    {dpsSt: 1.0, dpsAoe: 1.4, hpsSt:0.0, hpsAoe:0.0, dtpsP:1.2, dtpsM:0.2, speed: 1.1, hMul: 1.25, fMul: 1.2, femaleR:[50,1]},
        tank:   {dpsSt: 0.5, dpsAoe: 0.65, hpsSt:0.0, hpsAoe:0.0, dtpsP:5.3, dtpsM:3, speed: 0.9, hMul: 1.3, fMul: 1.2, femaleR:[100,1]}},
    Rogue: {
        dps:    {dpsSt: 1.9, dpsAoe: 1.0, hpsSt:0.0, hpsAoe:0.0, dtpsP:0.65, dtpsM:0.8, speed: 1.2, hMul: 1.0, fMul: 1.0, femaleR:[5,1]}},
    Ranger: {
        dps:    {dpsSt: 1.85, dpsAoe: 0.95, hpsSt:0.02, hpsAoe:0.0, dtpsP:0.6, dtpsM:0.6, speed: 1.15, hMul: 1.1, fMul: 0.95, femaleR:[4,1]}},
    Mage: {
        dps:    {dpsSt: 1.3, dpsAoe: 1.9, hpsSt: 0.05, hpsAoe: 0.05, dtpsP: 0.3, dtpsM: 2.5, speed: 0.9, hMul: 0.8, fMul: 0.85, femaleR: [2, 1]}},
    Druid: {
        dps:    {dpsSt: 0.8, dpsAoe: 1.8, hpsSt: 0.1, hpsAoe: 0.2, dtpsP: 0.6, dtpsM: 2.3, speed: 1.35, hMul: 0.85, fMul: 0.9, femaleR: [1, 1]},
        healer: {dpsSt: 0.1, dpsAoe: 0.4, hpsSt: 1.1, hpsAoe: 1.2, dtpsP: 0.6, dtpsM: 1.0, speed: 1.35, hMul: 0.85, fMul: 0.9, femaleR: [1, 2]},
        tank:   {dpsSt: 0.7, dpsAoe: 0.9, hpsSt: 0.1, hpsAoe: 0.2, dtpsP: 3.5, dtpsM: 4.0, speed: 1.35, hMul: 0.95, fMul: 0.9, femaleR: [1, 1]}},
    Monk: {
        dps:    {dpsSt: 1.2, dpsAoe: 1.55, hpsSt: 0.15, hpsAoe: 0.0, dtpsP: 0.7, dtpsM: 1.0, speed: 1.25, hMul: 0.75, fMul: 0.75, femaleR: [120, 1]},
        healer: {dpsSt: 0.55, dpsAoe: 0.9, hpsSt: 1.0, hpsAoe: 1.15, dtpsP: 0.7, dtpsM: 1.0, speed: 1.25, hMul: 0.75, fMul: 0.75, femaleR: [80, 1]}},
    Priest: {
        dps:    {dpsSt: 1.2, dpsAoe: 1.5, hpsSt: 0.25, hpsAoe: 0.25, dtpsP: 0.3, dtpsM: 1.3, speed: 0.95, hMul: 0.9, fMul: 1.0, femaleR: [1.5, 1]},
        healer: {dpsSt: 0.1, dpsAoe: 0.2, hpsSt: 1.2, hpsAoe: 1.2, dtpsP: 0.3, dtpsM: 1.0, speed: 0.95, hMul: 0.9, fMul: 1.0, femaleR: [1, 1.5]}},
    Paladin: {
        dps:    {dpsSt: 1.2, dpsAoe: 1.5, hpsSt: 0.2, hpsAoe: 0.1, dtpsP: 2.0, dtpsM: 1.8, speed: 0.95, hMul: 1.15, fMul: 1.2, femaleR: [35, 1]},
        healer: {dpsSt: 0.4, dpsAoe: 0.6, hpsSt: 1.4, hpsAoe: 1.0, dtpsP: 2.0, dtpsM: 1.0, speed: 0.95, hMul: 1.15, fMul: 1.2, femaleR: [30, 1]},
        tank:   {dpsSt: 0.55, dpsAoe: 0.8, hpsSt: 0.5, hpsAoe: 0.1, dtpsP: 4.0, dtpsM: 4.0, speed: 0.9, hMul: 1.2, fMul: 1.25, femaleR: [80, 1]}},
    Warlock: {
        dps:    {dpsSt: 1.7, dpsAoe: 1.8, hpsSt: 0.0, hpsAoe: 0.0, dtpsP: 0.3, dtpsM: 1.5, speed: 0.9, hMul: 0.95, fMul: 0.9, femaleR: [1, 1]}},
    Shaman: {
        dps:    {dpsSt: 1.2, dpsAoe: 1.7, hpsSt: 0.05, hpsAoe: 0.25, dtpsP: 0.6, dtpsM: 2.0, speed: 0.95, hMul: 1.0, fMul: 0.95, femaleR: [1, 1]},
        healer: {dpsSt: 0.1, dpsAoe: 0.2, hpsSt: 1.0, hpsAoe: 1.35, dtpsP: 0.6, dtpsM: 1.2, speed: 0.95, hMul: 1.0, fMul: 0.95, femaleR: [1, 1]}}

}