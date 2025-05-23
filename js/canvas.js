class Canvas {
    constructor(name) {
        this.canvasElement = document.getElementById(name)
        this.canvas = this.canvasElement.getContext("2d")
        this.canvasW = this.canvasElement.getBoundingClientRect().width
        this.canvasH = this.canvasElement.getBoundingClientRect().height
    }

    reset() {
        const dpr = window.devicePixelRatio || 1
        this.canvasW = window.innerWidth * dpr
        this.canvasH = window.innerHeight * dpr
        this.canvasElement.width  = this.canvasW
        this.canvasElement.height = this.canvasH
        this.canvas.clearRect(0,0,this.canvasW,this.canvasH)
    }

    drawPlayerDirection(x,y,length,width,color,direction) {
        this.canvas.save()
        this.canvas.beginPath()
        this.canvas.translate( this.canvasW/2, (this.canvasH)/2)
        this.canvas.rotate(((360-direction)+225) * Math.PI / 180)
        this.canvas.moveTo(x, y)
        this.canvas.lineTo(x+length, y+length)
        this.canvas.lineWidth = width
        this.canvas.strokeStyle = color
        this.canvas.stroke()
        this.canvas.closePath()
        this.canvas.restore()
    }

    drawTargetDirection(x,y,length,width,color,direction) {
        this.canvas.save()
        this.canvas.beginPath()
        this.canvas.translate(x, y)
        this.canvas.rotate(((360-direction)+225) * Math.PI / 180)
        this.canvas.moveTo(0, 0)
        this.canvas.lineTo(length, length)
        this.canvas.lineWidth = width
        this.canvas.strokeStyle = color
        this.canvas.stroke()
        this.canvas.closePath()
        this.canvas.restore()
    }

    drawQuadrilateral(x,y,x1,y1,x2,y2,x3,y3,x4,y4,color,angle) {
        this.canvas.fillStyle = color
        this.canvas.save()
        this.canvas.beginPath()
        this.canvas.translate(x, y)
        this.canvas.rotate(((360-angle)+180) * Math.PI / 180)
        this.canvas.moveTo(x1, y1)
        this.canvas.lineTo(x2,y2)
        this.canvas.lineTo(x3, y3)
        this.canvas.lineTo(x4, y4)
        this.canvas.closePath()
        this.canvas.fill()
        this.canvas.restore()
    }

    drawRect(x,y,w,h,color) {
        this.canvas.fillStyle = color
        this.canvas.fillRect(x,y,w,h)
    }

    drawRectStroke(x,y,w,h,color,lineWidth = 1) {
        this.canvas.lineWidth = lineWidth
        this.canvas.strokeStyle = color
        this.canvas.strokeRect(x,y,w,h)
    }

    drawCircle(x,y,radius,color) {
        this.canvas.beginPath()
        this.canvas.fillStyle = color
        this.canvas.arc(x, y, radius, 0, 2 * Math.PI, false)
        this.canvas.fill()
        this.canvas.closePath()
    }

    drawImage(x, y, size, color, image, gco = "lighter", alpha = 1.0, angle = 0) {
        size = size * 10
        let xx = size / 2
        let yy = xx

        /*if (this.canvas.globalAlpha !== alpha) this.canvas.globalAlpha = alpha
        if (this.canvas.globalCompositeOperation !== gco) this.canvas.globalCompositeOperation = gco*/
        this.canvas.globalAlpha = alpha
        this.canvas.globalCompositeOperation = gco

        this.canvas.save()
        this.canvas.translate(x, y)
        this.canvas.rotate(angle)
        this.canvas.drawImage(image, -xx, -yy, size, size)
        this.canvas.restore()

        this.canvas.globalCompositeOperation = "source-over"
        this.canvas.globalAlpha = 1.0
    }

    setParticleGlow(blurSize,blurColor) {
        if (settings.particleGlow) {
            this.canvas.shadowColor = blurColor
            this.canvas.shadowBlur = blurSize*zoom
        }
    }

    drawCircleStroke(x,y,radius,color,lineWidth = 1) {
        this.canvas.beginPath()
        this.canvas.strokeStyle = color
        this.canvas.lineWidth = lineWidth
        this.canvas.arc(x, y, radius, 0, 2 * Math.PI, false)
        this.canvas.stroke()
        this.canvas.closePath()
    }

    drawText(x,y,text,font,color,align) {
        this.canvas.textAlign = align
        this.canvas.font = font //"16px Courier New"
        this.canvas.fillStyle = color
        this.canvas.fillText(text,x,y)
    }

    drawLine(x1,y1,x2,y2,lineWidth,color) {
        this.canvas.beginPath()
        this.canvas.moveTo(x1, y1)
        this.canvas.lineTo(x2, y2)
        this.canvas.lineWidth = lineWidth
        this.canvas.strokeStyle = color
        this.canvas.stroke()
        this.canvas.closePath()
    }

    drawLineRotate(x,y,width,height,angle,color) {
        this.canvas.save()
        this.canvas.translate( x, y)
        this.canvas.rotate(angle * Math.PI / 180)
        this.canvas.beginPath()
        this.canvas.moveTo(0, 0)
        this.canvas.lineTo(width, height)
        this.canvas.lineWidth = width
        this.canvas.strokeStyle = color
        this.canvas.stroke()
        this.canvas.closePath()
        this.canvas.restore()
    }

}

let game2d = new Canvas("canvasGame")
let terrain2d = new Canvas("canvasTerrain")
let lights2d = new Canvas("canvasLights")
let particles2d = new Canvas("canvasParticles")
terrain2d.reset()