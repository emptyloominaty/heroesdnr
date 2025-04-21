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
    }

    const promises = Object.entries(imageMap).map(([key, path]) =>
        loadImage(path).then(img => [key, img])
    )

    return Promise.all(promises).then(entries => Object.fromEntries(entries))
}