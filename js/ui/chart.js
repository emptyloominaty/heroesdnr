class Chart {

    xData = []
    yData = []

    parent
    canvas 
    ctx
    chartConfig
    legendEl

    constructor (parentEl, datasets, chartConfig) {
        this.datasets = datasets

        this.parent = parentEl
        this.chartConfig = chartConfig //{xData:[],yData:[],color1:""},color2:false

        if (!parentEl.style.width) parentEl.style.width = "900px"
        if (!parentEl.style.height) parentEl.style.height = "500px"
        parentEl.style.position = "relative"

        this.cssWidth = parentEl.clientWidth
        this.cssHeight = parentEl.clientHeight
        const dpr = window.devicePixelRatio || 1

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.cssWidth * dpr
        this.canvas.height = this.cssHeight * dpr
        this.canvas.style.width = `${this.cssWidth}px`
        this.canvas.style.height = `${this.cssHeight}px`
        this.canvas.className = 'chart-canvas'

        this.legendEl = document.createElement("div")
        this.legendEl.className = "chart-legend"
        this.legendEl.style.display = "flex"
        this.legendEl.style.flexWrap = "wrap"
        this.legendEl.style.gap = "10px"
        this.legendEl.style.font = "12px Consolas"
        this.legendEl.style.alignItems = "center"
        this.legendEl.style.justifyContent = "center"

        this.ctx = this.canvas.getContext('2d')
        this.ctx.scale(dpr, dpr)

        this.parent.appendChild(this.canvas)
        this.parent.appendChild(this.legendEl)

        this.drawChart()
    }


    drawChart() {
        const ctx = this.ctx
        const {datasets, cssHeight, cssWidth} = this
        const cc = this.chartConfig

        ctx.clearRect(0, 0, cssWidth, cssHeight)

        const padding = 60
        const chartWidth = cssWidth - padding * 2
        const chartHeight = cssHeight - padding * 2

        const allX = this.datasets.flatMap(ds => ds.xData)
        const allY = this.datasets.flatMap(ds => ds.yData)
        const minX = Math.min(...allX)
        const maxX = Math.max(...allX)
        const minY = Math.min(...allY)
        const maxY = Math.max(...allY)

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

        const numXTicks = cc.xTicks
        for (let i = 0; i <= numXTicks; i++) {
            const xVal = minX + (i / numXTicks) * (maxX - minX)
            const xPx = xToPx(xVal)

            ctx.beginPath()
            ctx.moveTo(xPx, cssHeight - padding)
            ctx.lineTo(xPx, cssHeight - padding + 5)
            ctx.stroke()

            ctx.fillText(xVal.toFixed(cc.xRounding), xPx, cssHeight - padding + 7)

            ctx.beginPath()
            ctx.moveTo(xPx, padding)
            ctx.lineTo(xPx, cssHeight - padding)

            ctx.stroke()
        }

        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'

        const numYTicks = cc.yTicks
        for (let i = 0; i <= numYTicks; i++) {
            const yVal = minY + (i / numYTicks) * (maxY - minY)
            const yPx = yToPx(yVal)

            ctx.beginPath()
            ctx.moveTo(padding - 5, yPx)
            ctx.lineTo(padding, yPx)
            ctx.stroke()

            ctx.fillText(yVal.toFixed(cc.yRounding), padding - 7, yPx)

            ctx.beginPath()
            ctx.moveTo(padding, yPx)
            ctx.lineTo(cssWidth - padding, yPx)
            ctx.stroke()
        }

        for (const dataset of this.datasets) {
            const {xData, yData, color1, color2, colorVal, lineWidth} = dataset

            if (cc.color2 !== false) {
                for (let i = 1; i < xData.length; i++) {
                    const x1 = xToPx(xData[i - 1])
                    const y1 = yToPx(yData[i - 1])
                    const x2 = xToPx(xData[i])
                    const y2 = yToPx(yData[i])

                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.strokeStyle = yData[i] >= colorVal ? (color1) : color2
                    ctx.lineWidth = lineWidth || cc.lineWidth
                    ctx.stroke()
                }
            } else {
                ctx.beginPath()
                ctx.moveTo(xToPx(xData[0]), yToPx(yData[0]))
                for (let i = 1; i < xData.length; i++) {
                    ctx.lineTo(xToPx(xData[i]), yToPx(yData[i]))
                }
                ctx.strokeStyle = color1
                ctx.lineWidth = lineWidth || cc.lineWidth
                ctx.stroke()
            }
        }



        this.legendEl.innerHTML = ''

        for (const dataset of this.datasets) {
            const color = dataset.color1 || this.chartConfig.color1
            const label = dataset.label || 'Unnamed'

            const item = document.createElement('div')
            item.style.display = 'flex'
            item.style.alignItems = 'center'
            item.style.gap = '5px'

            const colorBox = document.createElement('div')
            colorBox.style.width = '12px'
            colorBox.style.height = '12px'
            colorBox.style.backgroundColor = color
            colorBox.style.borderRadius = '2px'

            const text = document.createElement('span')
            text.textContent = label
            text.style.color = color

            item.appendChild(colorBox)
            item.appendChild(text)
            this.legendEl.appendChild(item)
        }      

       
    }
    


}