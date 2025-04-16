let getSkillRandom = function() {
    const rand = Math.random();
    if (rand < 0.85) {
        let value;
        do {
            const mean = 0.65;
            const stdDev = 0.07;
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            value = mean + z * stdDev;
        } while (value < 0.1 || value > 1.0);
        return value;
    } else {
        return 0.1 + Math.random() * 0.9;
    }
}