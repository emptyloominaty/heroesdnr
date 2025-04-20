function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    })
}


function loadFiles() {

    const imagePaths = [
        'textures/terrain/test.png',
        'textures/terrain/test3.png',
    ]

    const imagePromises = imagePaths.map(loadImage)

    return Promise.all(imagePromises)
}