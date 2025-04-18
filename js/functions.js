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


let getNumberString = function(number) {
    if (number>999999) {
        return Math.round((number/1000000)*10)/10+"M"
        //return (number/1000000).toFixed(1)+"M"
    } else if (number>999) {
        return Math.round((number/1000)*10)/10+"K"
        //return (number/1000).toFixed(1)+"K"
    } else {
        return Math.round(number)
    }
}

let getTime = function(number) {
    if (number>3600) {
        return (number/3600).toFixed(0)+"h"
    } else if (number>60) {
        return (number/60).toFixed(0)+"m"
    } else {
        return (number).toFixed(0)+"s"
    }
}