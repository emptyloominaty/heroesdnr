let lights = []

let addLight = function(x,y,radius,color = "rgba(255, 160, 80, 0.9)",life = -1) {
    for (let i = 0; i < lights.length; i++) {
        if (lights[i] === undefined) {
            lights[i] = new Light(i,x,y,radius,color,life)
            return true
        }
    }
    lights.push(new Light(lights.length,x,y,radius,color,life))
}

class Light {
    life = -1
    constructor(id,x,y,radius,color,life, decTimer = 0.2) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.id = id
        this.life = life
        let values = color.slice(5, -1).split(",").map(v => v.trim())
        this.alpha = values[3]
        this.decTimer = decTimer
    }
    update() {
        if (this.life>0) {
            this.life -= progress
            if (this.life < this.decTimer) {
                this.color = decreaseAlpha(this.color,progress*(this.alpha/this.decTimer))
            }
            if (this.life<=0) {
                lights[this.id] = undefined
            }
        }
    }
}

//add test light
addLight(50,45,100,'rgba(255, 160, 80, 1)',-1)

const lightingKeyframes = [
    { angle: 0,   color: [16, 28, 48], alpha: 0.1 }, // Midnight
    { angle: 90,   color: [16, 28, 48], alpha: 0.1 }, // Midnight
    { angle: 105,  color: [20, 164, 211], alpha: 0.2 }, // Sunrise
    { angle: 115, color: [250, 107, 40], alpha: 0.6 }, // Noon transition
    { angle: 125, color: [255, 255, 255], alpha: 0.5 }, // Midday
    { angle: 285, color: [255, 255, 255], alpha: 0.5 }, // Midday
    { angle: 295, color: [250, 140, 50], alpha: 0.4 }, // Sunset
    { angle: 305, color: [20, 60, 100], alpha: 0.2 }, // Dusk transition
    { angle: 320, color: [16, 28, 48], alpha: 0.1 },  // Midnight
    { angle: 360, color: [16, 28, 48], alpha: 0.1 }  // Midnight
]

let R = 255, G = 255, B = 255
let shadowAlpha = 0.1
let sunDir = 0

function lerp(a, b, t) {
    return a + (b - a) * t
}

function lerpColor(c1, c2, t) {
    return [
        lerp(c1[0], c2[0], t),
        lerp(c1[1], c2[1], t),
        lerp(c1[2], c2[2], t)
    ]
}

function updateLighting() {
    sunDir = ((time + 240) % 720) / 2

    let kf1, kf2
    for (let i = 0; i < lightingKeyframes.length - 1; i++) {
        if (sunDir >= lightingKeyframes[i].angle && sunDir <= lightingKeyframes[i + 1].angle) {
            kf1 = lightingKeyframes[i]
            kf2 = lightingKeyframes[i + 1]
            break
        }
    }

    if (!kf1) {
        kf1 = lightingKeyframes[lightingKeyframes.length - 1]
        kf2 = lightingKeyframes[0]
    }

    let angleRange = (kf2.angle - kf1.angle + 360) % 360
    let anglePos = (sunDir - kf1.angle + 360) % 360
    let t = angleRange === 0 ? 0 : anglePos / angleRange

    let color = lerpColor(kf1.color, kf2.color, t)
    R = Math.round(color[0])
    G = Math.round(color[1])
    B = Math.round(color[2])
    shadowAlpha = lerp(kf1.alpha, kf2.alpha, t)
}


/*function updateLighting() {
    let timeSpeed = gameSpeed
    sunDir =  (((time + 240) % 720) / 2)
    // NIGHT
    if (sunDir < 90 || sunDir > 310) {
        if (R > 16) R -= (timeSpeed * 6) / fps;
        if (G > 28) G -= (timeSpeed * 6) / fps;
        if (B > 48) B -= (timeSpeed * 6) / fps;
        if (shadowAlpha > 0.1) shadowAlpha -= 0.02 * timeSpeed / fps;
    }
    // SUNRISE
    if (sunDir > 90 && sunDir < 105) {
        if (R < 20) R += (timeSpeed * 0.5) / fps;
        if (G < 164) G += (timeSpeed * 5) / fps;
        if (B < 211) B += (timeSpeed * 6) / fps;
        if (shadowAlpha < 0.2) shadowAlpha += 0.02 * timeSpeed / fps;
    }
    // NOON TRANSITION
    if (sunDir > 105 && sunDir < 120) {
        if (R < 250) R += (timeSpeed * 10) / fps;
        if (G > 107) G -= (timeSpeed * 2) / fps;
        if (B > 40) B -= (timeSpeed * 4) / fps;
        if (shadowAlpha < 0.6) shadowAlpha += 0.02 * timeSpeed / fps;
    }
    // DAY
    if (sunDir > 120 && sunDir < 280) {
        if (R < 255) R += (timeSpeed * 0.25) / fps;
        if (G < 255) G += (timeSpeed * 5) / fps;
        if (B < 255) B += (timeSpeed * 7) / fps;
        if (shadowAlpha < 0.5) shadowAlpha += 0.02 * timeSpeed / fps;
    }
    // SUNSET
    if (sunDir > 280 && sunDir < 295) {
        if (R > 250) R -= (timeSpeed * 0.25) / fps;
        if (G > 140) G -= (timeSpeed * 5) / fps;
        if (B > 50) B -= (timeSpeed * 6.5) / fps;
        if (shadowAlpha > 0.4) shadowAlpha -= 0.02 * timeSpeed / fps;
    }
    // DUSK TRANSITION
    if (sunDir > 295 && sunDir < 305) {
        if (R > 20) R -= (timeSpeed * 20) / fps;
        if (G > 60) G -= (timeSpeed * 6) / fps;
        if (B < 100) B += (timeSpeed * 6) / fps;
        if (shadowAlpha > 0.2) shadowAlpha -= 0.02 * timeSpeed / fps;
    }

    // Clamp values
    R = Math.max(0, Math.min(255, R));
    G = Math.max(0, Math.min(255, G));
    B = Math.max(0, Math.min(255, B));
    shadowAlpha = Math.max(0.1, Math.min(1, shadowAlpha));
}*/