class Hero extends Character {
    skill = 1.0 //0.1-1
    dps = 1
    hps = 0
    armor = 1
    statistics = {dungeonSoloRuns: 0, dungeonGroupRuns: 0, raidRuns:0, goldEarned:0 }
    constructor(name, age, id, level, health, characterClass, location) {
        super(name, age, id, level, health, characterClass, location)
        this.name = name;
        this.age = age
        this.id = id
        this.level = level;
        this.health = health;
        this.characterClass = characterClass
        this.location = location
        this.fatigueRate = 0.7 + (Math.random() * 0.6)
        this.hungerRate = 0.95 + (Math.random() * 0.1) 
        this.destination = { x: location.x, y: location.y };
        characters.push(this)
    }

}