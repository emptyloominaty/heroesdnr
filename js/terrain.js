const grassImage = new Image()
const roadImage = new Image()

let imagesLoaded = 0

grassImage.src = 'textures/terrain/test.png'
roadImage.src = 'textures/terrain/test3.png'

grassImage.onload = onImageLoad
roadImage.onload = onImageLoad

function onImageLoad() {
    imagesLoaded++
    if (imagesLoaded === 2) {
        drawTerrain(true)
    }
}

let grassPattern, roadPattern;
function initPatterns() {
    grassPattern = terrain2d.canvas.createPattern(grassImage, 'repeat');
    let grassPatternTransform = new DOMMatrix();
    grassPatternTransform.a = 0.0625;
    grassPatternTransform.d = 0.0625;
    grassPattern.setTransform(grassPatternTransform);

    roadPattern = terrain2d.canvas.createPattern(roadImage, 'repeat');
    let roadPatternTransform = new DOMMatrix();
    roadPatternTransform.a = 0.0625;
    roadPatternTransform.d = 0.0625;
    roadPattern.setTransform(roadPatternTransform);
}


function drawTerrain(firstFrame = false) {
    if (firstFrame) {
        initPatterns()
    }

    const ctx = terrain2d.canvas
    ctx.resetTransform()
    ctx.clearRect(0, 0, terrain2d.canvasElement.width, terrain2d.canvasElement.height)

    ctx.setTransform(zoom, 0, 0, zoom,
        (terrain2d.canvasElement.width / 2) - x * zoom,
        (terrain2d.canvasElement.height / 2) - y * zoom)

    let pattern = ctx.createPattern(grassImage, 'repeat')
    let patternTransform = new DOMMatrix()
    patternTransform.a = 0.0625
    patternTransform.d = 0.0625
    pattern.setTransform(patternTransform)
    ctx.fillStyle = pattern
    ctx.fillRect(-10000, -10000, 20000, 20000)

    pattern = ctx.createPattern(roadImage, 'repeat')
    patternTransform = new DOMMatrix()
    patternTransform.a = 0.0625
    patternTransform.d = 0.0625
    pattern.setTransform(patternTransform)
    ctx.fillStyle = pattern
    ctx.fillRect(100, 100, 50, 200)



    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, 50, 50)
}




/*
const terrainCache = document.createElement('canvas')
terrainCache.width = 8000
terrainCache.height = 6000
const terrainCtx = terrainCache.getContext('2d')
*/
/*function drawTerrain() {

    let ctx = terrainCtx

    ctx.resetTransform()
    ctx.clearRect(0, 0, terrainCache.width, terrainCache.height)


    let pattern = ctx.createPattern(grassImage, 'repeat')

    let patternTransform = new DOMMatrix()
    patternTransform.a = 0.0625
    patternTransform.d = 0.0625
    pattern.setTransform(patternTransform)

    ctx.fillStyle = pattern
    ctx.fillRect(-400, -400, 8000, 6000)

    pattern = ctx.createPattern(roadImage, 'repeat')
    patternTransform = new DOMMatrix()
    patternTransform.a = 0.0625
    patternTransform.d = 0.0625
    pattern.setTransform(patternTransform)
    ctx.fillStyle = pattern
    ctx.fillRect(200, 100, 100, 400)

    ctx.fillRect(0,0,50,50)

    ctx.fillRect(-50,-50,50,50)
}*/


/*function drawTerrainScreen() {
    const ctx = terrain2d.canvas

    ctx.setTransform(zoom, 0, 0, zoom,
        (terrain2d.canvasElement.width / 2) - x * zoom,
        (terrain2d.canvasElement.height / 2) - y * zoom
    )


    ctx.drawImage(terrainCache, 0, 0)
}*/
