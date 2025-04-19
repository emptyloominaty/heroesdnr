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
    constructor(id,x,y,radius,color,life ) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.id = id
        this.life = life
    }
    update() {
        if (this.life>0) {
                this.life -= progress
            if (this.life<=0) {
                lights[this.id] = undefined
            }
        }
    }
}

//add test light
addLight(50,45,100,'rgba(255, 160, 80, 1)',-1)
addLight(200,200,100,'rgba(255,191,109,1)',-1)
addLight(50,200,100,'rgb(255,216,164)',-1)
addLight(200,45,100,'rgb(255,171,62)',-1)

let R = 255, G = 255, B = 255
let shadowAlpha = 0.1
let sunDir = 0

function updateLighting() {
    let timeSpeed = 10* gameSpeed
    sunDir =  (((time + 240) % 720) / 2)

    // NIGHT
    if (sunDir < 90 || sunDir > 300) {
        if (R > 16) R -= (timeSpeed * 15) / fps;
        if (G > 28) G -= (timeSpeed * 5) / fps;
        if (B < 48) B += (timeSpeed * 5) / fps;
        if (shadowAlpha > 0.1) shadowAlpha -= 0.001 * timeSpeed / fps;
    }

    // SUNRISE
    if (sunDir > 90 && sunDir < 110) {
        if (R < 20) R += (timeSpeed * 15) / fps;
        if (G < 164) G += (timeSpeed * 5) / fps;
        if (B < 211) B += (timeSpeed * 5) / fps;
        if (shadowAlpha < 0.2) shadowAlpha += 0.001 * timeSpeed / fps;
    }

    // NOON TRANSITION
    if (sunDir > 110 && sunDir < 120) {
        if (R < 250) R += (timeSpeed * 15) / fps;
        if (G > 107) G -= (timeSpeed * 5) / fps;
        if (B > 12) B -= (timeSpeed * 5) / fps;
        if (shadowAlpha < 0.6) shadowAlpha += 0.001 * timeSpeed / fps;
    }

    // DAY
    if (sunDir > 120 && sunDir < 230) {
        if (R < 255) R += (timeSpeed * 15) / fps;
        if (G < 255) G += (timeSpeed * 5) / fps;
        if (B < 255) B += (timeSpeed * 5) / fps;
        if (shadowAlpha < 0.5) shadowAlpha += 0.001* timeSpeed / fps;
    }

    // SUNSET
    if (sunDir > 230 && sunDir < 280) {
        if (R < 200) R += (timeSpeed * 15) / fps;
        if (G < 200) G += (timeSpeed * 5) / fps;
        if (B < 200) B += (timeSpeed * 5) / fps;
        if (shadowAlpha < 0.5) shadowAlpha += 0.001* timeSpeed / fps;
    }

    // DUSK TRANSITION
    if (sunDir > 280 && sunDir < 300) {
        if (R > 250) R -= (timeSpeed * 15) / fps;
        if (G > 107) G -= (timeSpeed * 5) / fps;
        if (B > 12) B -= (timeSpeed * 5) / fps;
        if (shadowAlpha < 0.6) shadowAlpha += 0.001* timeSpeed / fps;
    }

    // Clamp values
    R = Math.max(0, Math.min(255, R));
    G = Math.max(0, Math.min(255, G));
    B = Math.max(0, Math.min(255, B));
    shadowAlpha = Math.max(0.1, Math.min(1, shadowAlpha));
}