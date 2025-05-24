function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    })
}

function loadFiles() {
    const imageMap = {
        terrain_grass: 'textures/terrain/test.png',
        terrain_road: 'textures/terrain/test3.png',
        particle_fire: 'textures/particles/fire.png',
        particle_fire2: 'textures/particles/fire2.png',
        particle_fire3: 'textures/particles/fire3.png',
        particle_fire4: 'textures/particles/fire4.png',
        particle_fire5: 'textures/particles/fire5.png',
        particle_fire6: 'textures/particles/fire6.png',
        particle_fire7: 'textures/particles/fire7.png',
        particle_fire8: 'textures/particles/fire8.png',
        particle_fire9: 'textures/particles/fire9.png',
    }

    const promises = Object.entries(imageMap).map(([key, path]) =>
        loadImage(path).then(img => [key, img])
    )

    return Promise.all(promises).then(entries => Object.fromEntries(entries))
}

function loadGame() {

    buildBuilding("inn", {x: 50, y: 45})
    buildBuilding("inn", {x: -220, y: -105})
    buildBuilding("inn", {x: -350, y: -150})
    buildBuilding("potionShop", {x: -280, y: -80})
    buildBuilding("recruitmentHall", {x: 0, y: -125})
    buildBuilding("blacksmith", {x: -150, y: 75})

    buildBuilding("dungeonController", {x: -530, y: 0}, {minlvl: 1, maxlvl: 25})
    buildBuilding("dungeonController", {x: 50, y: 350}, {minlvl: 20, maxlvl: 50})
    buildBuilding("dungeonController", {x: 450, y: 70}, {minlvl: 40, maxlvl: 100})


    //TEST
    for (let i = 0; i < 5; i++) {
        spawnHeroRandom(1)
    }

}


function reset() {

}