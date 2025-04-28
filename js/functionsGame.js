let getRank = function(points) {
	const tiers = ["Bronze", "Silver", "Gold", "Diamond", "Legendary", "Mythic"]
	const divisions = ["V", "IV", "III", "II", "I"]
	const curve = 1.4

	let totalDivisions = tiers.length * divisions.length
	let scaledPoints = Math.pow(points, 1 / curve)
	let pointsPerDivision = 25;
	let divisionIndex = Math.floor(scaledPoints / pointsPerDivision)
	divisionIndex = Math.min(divisionIndex, totalDivisions - 1)
	let tier = tiers[Math.floor(divisionIndex / divisions.length)]
	let division = divisions[divisionIndex % divisions.length]

	let mythicPlus = Math.pow(pointsPerDivision * (totalDivisions - 1), curve)*1.1
	if (points>mythicPlus) {
		tier = "Mythic I "
		division = "+"+Math.ceil((points-mythicPlus)/1000)
	}

	return `${tier} ${division}`
}