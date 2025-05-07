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
        const top5 = Object.entries(guildmaster.friendships)
            .filter(([id, _]) => id in charactersMap)
            .sort((a, b) => b[1] - a[1])   
            .slice(0, 5)     
            .map(([id, _]) => id)   

        for (let i = 0; i < top5.length; i++) {
            this.officers.push(charactersMap[top5[i]].id)
        }
        guildmaster.guildId = this.id
        guildmaster.inGuild = true
        for (let i = 0; i < heroes.length; i++) {
            if (heroes[i]!==undefined) {
                heroes[i].guildId = this.id
                heroes[i].inGuild = true
                this.heroes.push(heroes[i].id)
            }
            
        } 
    }

    updateDay() {
        for (let i = 0; i < this.heroes.length; i++) {
            if (charactersMap[this.heroes[i]] === undefined) {
                this.heroes.splice(i, 1)
            }
        }
        let o = 0
        for (let i = 0; i < this.officers.length; i++) {
            if (charactersMap[this.officers[i]] === undefined) {
                this.officers.splice(i, 1) 
            } else {
                o++
            }
        }
        if (charactersMap[this.guildmaster] === undefined) {
            this.guildmaster = this.officers[0]
            this.officers.splice(0, 1) 
        }
        if (o < 5) {
            const needed = 5 - o
            const available = this.heroes.filter(h => !this.officers.includes(h))
            for (let i = 0; i < needed && available.length > 0; i++) {
                const index = Math.floor(Math.random() * available.length)
                const chosen = available.splice(index, 1)[0]
                this.officers.push(chosen)
            }
        }


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


    gainRankPoints(val) {
        this.rankPoints += Number(val)
        if (this.rankPoints < 0) {
            this.rankPoints = 0
        }
    }

}