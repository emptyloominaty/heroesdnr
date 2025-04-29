let getRank = function(points) {
	const tiers = ["Bronze", "Silver", "Gold", "Diamond", "Legendary", "Mythic"]
	const divisions = ["V", "IV", "III", "II", "I"]
	const curve = 1.6
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
		division = "+"+Math.ceil((points-mythicPlus)/1000)
	}

	return `${tier} ${division}`
}

function generateRankRanges() {
	const tiers = ["Bronze", "Silver", "Gold", "Diamond", "Legendary", "Mythic"]
	const divisions = ["V", "IV", "III", "II", "I"]
	const curve = 1.6
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
		})
		console.log(tier + " " + division + " " + ranges[i].min + "-" + ranges[i].max)
	}
	return ranges
}

function isMythicPlusNumber(str) {
	return /^Mythic \+\d+$/.test(str)
}