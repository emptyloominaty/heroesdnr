let guilds = []
let guildIdx = 0

class Guild {
    heroes = []
    name = ""
    id = 0
    guildmaster
    officers = []
    rankPoints = 0 // guild run

    constructor (heroes, guildmaster) {
        this.id = guildIdx
        guildIdx++
        guilds.push(this)
        this.guildmaster = guildmaster.id
        const top5 = Object.entries(guildmaster.friendships) //TODO TEST????????
            .filter(([_, id]) => id in charactersMap) 
            .sort((a, b) => b[1] - a[1])               
            .slice(0, 5)                                
            .map(([key, _]) => key)   

        for (let i = 0; i < top5.length; i++) {
            console.log(top5[i])
            console.log(charactersMap[top5[i]])
            this.officers.push(charactersMap[top5[i]].id)
        }
        guildmaster.guildId = this.id
        guildmaster.inGuild = true
        for (let i = 0; i < heroes.length; i++) {
            heroes[i].guildId = this.id
            heroes[i].inGuild = true
            this.heroes.push(heroes[i].id)
        } 
    }

    updateDay() {

    }

    inviteHero(hero) {
        if (!hero.inGuild) {
            hero.inGuild = true
            hero.guildId = this.id
            this.heroes.push(charactersMap[hero.id])
        }
    }

    kickHero(hero) {
        if (hero.inGuild && hero.guildId === this.id) {
            hero.inGuild = false
            hero.guildId = -1

            for (let i = 0; i < this.heroes.length; i++) {
                if (this.heroes[i] === hero.id) {
                    this.heroes.splice(i, 1)
                    break
                }
            }
        }
    }

}