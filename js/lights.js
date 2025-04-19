const lightCanvas = lights2d.canvasElement
const lightCtx = lights2d.canvas

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