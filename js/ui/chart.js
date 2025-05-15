class Chart {

    xData = []
    yData = []

    parent
    canvas 
    ctx

    constructor (parentEl, xData, yData) {
        this.xData = xData
        this.yData = yData
        this.parent = parentEl

        if (!parentEl.style.width) parentEl.style.width = "900px"
        if (!parentEl.style.height) parentEl.style.height = "500px"
        parentEl.style.position = "relative"

        this.cssWidth = parentEl.clientWidth
        this.cssHeight = parentEl.clientHeight
        const dpr = window.devicePixelRatio || 1

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.cssWidth * dpr
        this.canvas.height = this.cssHeight * dpr
        this.canvas.style.width = `${this.cssWidth}px`;
        this.canvas.style.height = `${this.cssHeight}px`;
        this.canvas.className = 'chart-canvas'


        this.ctx = this.canvas.getContext('2d')
        this.ctx.scale(dpr, dpr)

        this.parent.appendChild(this.canvas)

        this.drawChart()
    }


    drawChart() {
        const ctx = this.ctx
        const {xData, yData, cssHeight, cssWidth} = this

        ctx.clearRect(0, 0, cssWidth, cssHeight)

        const padding = 40
        const chartWidth = cssWidth - padding * 2
        const chartHeight = cssHeight - padding * 2

        const minX = Math.min(...xData)
        const maxX = Math.max(...xData)
        const minY = Math.min(...yData)
        const maxY = Math.max(...yData)

        const xToPx = x => padding + ((x - minX) / (maxX - minX)) * chartWidth
        const yToPx = y => cssHeight - padding - ((y - minY) / (maxY - minY)) * chartHeight

        ctx.strokeStyle = '#111111'
        ctx.fillStyle = colors.text
        ctx.font = '12px Consolas'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'

        ctx.beginPath()
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, cssHeight - padding)
        ctx.lineTo(cssWidth - padding, cssHeight - padding)
        ctx.lineWidth = 1
        ctx.stroke()

        const numXTicks = 5
        for (let i = 0; i <= numXTicks; i++) {
            const xVal = minX + (i / numXTicks) * (maxX - minX)
            const xPx = xToPx(xVal)

            ctx.beginPath()
            ctx.moveTo(xPx, cssHeight - padding)
            ctx.lineTo(xPx, cssHeight - padding + 5)
            ctx.stroke()

            ctx.fillText(xVal.toFixed(0), xPx, cssHeight - padding + 7)

            ctx.beginPath()
            ctx.moveTo(xPx, padding)
            ctx.lineTo(xPx, cssHeight - padding)

            ctx.stroke()
        }

        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'

        const numYTicks = 10
        for (let i = 0; i <= numYTicks; i++) {
            const yVal = minY + (i / numYTicks) * (maxY - minY)
            const yPx = yToPx(yVal)

            ctx.beginPath()
            ctx.moveTo(padding - 5, yPx)
            ctx.lineTo(padding, yPx)
            ctx.stroke()

            ctx.fillText(yVal.toFixed(0), padding - 7, yPx)

            ctx.beginPath()
            ctx.moveTo(padding, yPx)
            ctx.lineTo(cssWidth - padding, yPx)
            ctx.stroke()
        }


        for (let i = 1; i < xData.length; i++) {
            const x1 = xToPx(xData[i - 1])
            const y1 = yToPx(yData[i - 1])
            const x2 = xToPx(xData[i])
            const y2 = yToPx(yData[i])

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = yData[i] >= 0 ? '#99DD99' : '#DD9999' 
            ctx.lineWidth = 2
            ctx.stroke()
        }

        /*
        ctx.beginPath()
        ctx.moveTo(xToPx(xData[0]), yToPx(yData[0]))
        for (let i = 1; i < xData.length; i++) {
            ctx.lineTo(xToPx(xData[i]), yToPx(yData[i]))
        }
        ctx.strokeStyle = '#CCBB77'
        ctx.lineWidth = 2
        ctx.stroke()*/
    }
    


}