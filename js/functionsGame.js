let getRank = function(points) {
	const tiers = ["Bronze", "Silver", "Gold", "Diamond", "Legendary", "Mythic"]
	const divisions = ["V", "IV", "III", "II", "I"]
	const curve = 2.3
	let pointsPerDivision = 15

	let totalDivisions = tiers.length * divisions.length
	let scaledPoints = Math.pow(points, 1 / curve)
	let divisionIndex = Math.floor(scaledPoints / pointsPerDivision)
	divisionIndex = Math.min(divisionIndex, totalDivisions - 1)
	let tier = tiers[Math.floor(divisionIndex / divisions.length)]
	let division = divisions[divisionIndex % divisions.length]

	let mythicPlus = Math.pow(pointsPerDivision * (totalDivisions - 1), curve)*1.1
	if (points>mythicPlus) {
		tier = "Mythic"
		division = "+"+Math.ceil((points-mythicPlus)/50000)
	}

	return `${tier} ${division}`
}

function generateRankRanges(consoleLog = false) {
	const tiers = ["Bronze", "Silver", "Gold", "Diamond", "Legendary", "Mythic"]
	const divisions = ["V", "IV", "III", "II", "I"]
	const curve = 2.3
	const pointsPerDivision = 15

	let totalDivisions = tiers.length * divisions.length
	let ranges = []

	for (let i = 0; i < totalDivisions; i++) {
		let scaledMin = i * pointsPerDivision
		let scaledMax = (i + 1) * pointsPerDivision

		let minPoints = Math.pow(scaledMin, curve)
		let maxPoints = Math.pow(scaledMax, curve)

		let tier = tiers[Math.floor(i / divisions.length)]
		let division = divisions[i % divisions.length]

		ranges.push({
			tier,
			division,
			min: Math.round(minPoints),
			max: Math.round(maxPoints - 1),
			color: colors.ranks[tier+" "+division]
		})
		if (consoleLog) {
			console.log(tier + " " + division + " " + ranges[i].min + "-" + ranges[i].max+" | "+ranges[i].color)
		}
	}
	return ranges
}

function isMythicPlusNumber(str) {
	return /^Mythic \+\d+$/.test(str)
}

function heroLeave(id, banish = false) {
	let hero = charactersMap[id]
	logs.heroes.push({time: realtime, message: "<span style='color:" + colors[hero.characterClass] + "'>" + hero.characterClass + "</span> <span style='color:" + colors.log.levelUp +"'>"+ hero.name+" left the town</span>"})
	if (hero.sleepBuildingId !== -1) {
		const heroesList = buildings[hero.sleepBuildingId].heroesList
		const index = heroesList.indexOf(hero)
		if (index !== -1) {
			heroesList.splice(index, 1)
		}
	}

	if (hero.hero) {
		heroes = heroes.filter(h => h !== hero)
	}

	if (hero instanceof Hero) {
		hero.leaveTown()
	}

	hero.destroyUI()
	characters = characters.filter(c => c !== hero)
	delete charactersMap[hero.id]

	let heroNewObj = {
		time: realtime,
		banished: banish,
		id: hero.id,
		sex: hero.sex,
		race: hero.race,
		role: hero.role,
		xp: hero.xp,
		level: hero.level,
		maxAge: hero.maxAge,
		rankPoints: hero.rankPoints,
		age: hero.age,
		name: hero.name,
		characterClass: hero.characterClass,
		characterSpec: hero.characterSpec,
		sociability: hero.sociability,
		skill: [...hero.skill],
		statistics: {
			dungeonSoloRuns: JSON.parse(JSON.stringify(hero.statistics.dungeonSoloRuns)),
			dungeonGroupRuns: JSON.parse(JSON.stringify(hero.statistics.dungeonGroupRuns)),
			raidRuns: JSON.parse(JSON.stringify(hero.statistics.raidRuns)),
			goldEarned: hero.statistics.goldEarned,
			questsCompleted: hero.statistics.questsCompleted
		}
	}
	inactiveHeroes.push(heroNewObj)
	if (inactiveHeroes.length>settings.maxSizeInactiveHeroes) {
		let del = Math.ceil(settings.maxSizeInactiveHeroes/100)
		inactiveHeroes.splice(0, del)
	}
}

function getInviteChance(recruiter, target, base = 0.0001, min = 0.001, max = 0.005) {
	if ((target.rankPoints > guilds[recruiter.guildId].rankPoints * 1.5 || target.rankPoints < guilds[recruiter.guildId].rankPoints / 1.5)
		&& (target.rankPoints > guilds[recruiter.guildId].rankPoints + 100|| target.rankPoints < guilds[recruiter.guildId].rankPoints - 100)) {
		return 0
	}
	return Math.max(min, Math.min(max, base * Math.pow((guilds[recruiter.guildId].rankPoints / guilds[target.guildId].rankPoints), 2.5) * (1 - target.loyalty)))
}

function updateSkill(s, val, low = 0.4, mid = 0.7, high = 1.0) {                       
	if (val > 0) {     
		if (s <= mid) return Math.min(s + val, high)
		const scale = (high - s) / (high - mid)
		return Math.min(s + val * scale, high)

	} else if (val < 0) { 
		if (s >= mid) return Math.max(s + val, low)
		const scale = (s - low) / (mid - low)
		return Math.max(s + val * scale, low)

	}     
	return s
}

function getItemQuality(quality) {
	if (quality === 1) {
		return "Normal"
	} else if (quality === 2) {
		return "Uncommon"
	} else if (quality === 3) {
		return "Rare"
	} else if (quality === 4) {
		return "Epic"
	} else if (quality === 5) {
		return "Legendary"
	} else if (quality === 6) {
		return "Mythic"
	}
	return ""
}