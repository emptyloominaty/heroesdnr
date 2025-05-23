class SpellVisualEffect {
    constructor(id,xx,yy,direction,type,data,light = undefined) {
        this.x = xx
        this.y = yy

        this.direction = direction
        this.type = type //projectile, hot/dot, glow(target), area
        this.data = data
        this.id = id
        this.duration = -9999
        if (data.duration) {
            this.duration = data.duration
        }
        if (data.onRun.texture === undefined) {
            this.data.onRun.texture = textures.particle_fire
        }
        this.timer = 0

        if (light !== undefined) {
            this.light = addLight(xx,yy,light.radius,light.color,light.duration,light.decTimer)
        }

        this.particleTimer = 0.025
    }
    update() {
        if (settings.particleVisuals!==-1) {
            this.timer += progress
            if (this.type==="projectile") { //--------------------------------------Projectile
                let size = this.data.size * zoom
                this.direction = getDirection(this,this.data.target)

                if (this.data.speed>0) {
                    this.move()
                }


                let xx = (this.x - x)*zoom
                let yy = (this.y - y)*zoom
                let x2d = (game2d.canvasW/2)+xx
                let y2d = (game2d.canvasH/2)+yy

                if (this.data.quadrilateral) {
                    let d = this.data.polygonData
                    let g = zoom
                    game2d.drawQuadrilateral(x2d,y2d,d.x1*g,d.y1*g,d.x2*g,d.y2*g,d.x3*g,d.y3*g,d.x4*g,d.y4*g,this.data.color,this.direction)
                } else {
                    game2d.drawCircle(x2d,y2d,size,this.data.color)
                }

                if (settings.particleVisuals>1) {
                    if (this.data.onRun.name==="fire") {
                        let life = this.data.onRun.life
                        let zSize = this.data.size * zoom
                        for (let i = 0; i<(settings.particleVisuals-1)*gameSpeedP; i++) {
                            addSpellParticle(this.x-(zSize/4)+(Math.random()*(zSize/2)), this.y-(zSize/2)+(Math.random()*(zSize)), (this.direction-(182-(Math.random()*4))),
                                "fire", {ignoreLifeSize: this.data.onRun.ignoreLifeSize, size:this.data.size/4,speed:-this.data.speed,life:life,color:Math.random(),color1:this.data.onRun.color1, color2:this.data.onRun.color2})
                        }
                    }
                }

                if (getDistance(this,this.data.target)<0.8) {
                    this.end()
                    spellVisualEffects[this.id] = undefined
                }
            } else if (this.type==="rain") {//--------------------------------------Rain
                let tt = performance.now()
                this.x = x
                this.y = y
                for (let i = 0; i<settings.particleVisuals*3*gameSpeedP*(this.data.size/80); i++) {
                    let radius = this.data.size
                    let pt_angle = Math.random() * 2 * Math.PI
                    let pt_radius_sq = Math.random() * radius * radius
                    while (pt_radius_sq < 500) {
                        pt_radius_sq = Math.random() * radius * radius;
                    }
                    let xx = this.x-Math.sqrt(pt_radius_sq) * Math.cos(pt_angle)
                    let yy = this.y-Math.sqrt(pt_radius_sq) * Math.sin(pt_angle)


                    addSpellParticle(xx, yy, 0,
                        "rain", {ignoreLifeSize: false, size: 1.5, speed: this.data.speed/3, life: 0.3,maxLife:0.3, color: this.data.color,centre:{x:x ,y:y},timeCreated:tt})
                }
                if (this.duration > -9999) {
                    this.duration -= progress
                    if (this.duration <= 0) {
                        spellVisualEffects[this.id] = undefined
                    }
                }
            } else if (this.type==="fire") {
                let size = this.data.size * zoom
                this.direction = getDirection(this,this.data.target)
                let xx = (this.x - x)*zoom
                let yy = (this.y - y)*zoom
                let x2d = (game2d.canvasW/2)+xx
                let y2d = (game2d.canvasH/2)+yy


                game2d.drawCircle(x2d,y2d,size,this.data.color)


                if (settings.particleVisuals > 0) {  
                    if (this.data.onRun.name === "fire") {
                        let skip = true
                        this.particleTimer -= progressReal
                        if (this.particleTimer <= 0) {
                            skip = false
                            this.particleTimer = settings.particleTimer
                        }
                        if (!skip) {
                            let life = this.data.onRun.life
                            let tt = performance.now()
                            let area = this.data.onRun.area
                            for (let i = 0; i < (settings.particleVisuals); i++) {
                                let dir = (Math.random() * 360)
                                if (this.data.onRun.dirToCentre) {
                                    dir = 360 - dir
                                }
                                let pp = addSpellParticle(this.x - (area / 2) + (Math.random() * (area)), this.y - (area / 2) + (Math.random() * (area)), dir,
                                    "fire", {ignoreLifeSize: this.data.onRun.ignoreLifeSize, texture: this.data.onRun.texture, size: this.data.onRun.size, speed: this.data.onRun.speed, life: life, color: 0, color1: this.data.onRun.color1, color2: this.data.onRun.color2, color3: this.data.onRun.color3, timeCreated: tt})
                                if (this.data.onRun.dirToCentre) {
                                    pp.move(-1.5)
                                }

                            }
                        }

                    }
                } else if (this.data.onRun.texture !== undefined) {
                    particles2d.drawImage(x2d, y2d, this.data.onRun.size*zoom*3, this.data.onRun.color1, this.data.onRun.texture, undefined, 1, 0)
                }
                if (this.duration > -9999) {
                    this.duration -= progress
                    if (this.duration <= 0) {
                        spellVisualEffects[this.id] = undefined
                    }
                }


            }
            //-----------------------------------------------------------End
        } else if (this.duration > -9999) {
            this.end()
            spellVisualEffects[this.id] = undefined
        }
    }

    end() {
        lights[this.light.id] = undefined
        //if (settings.spellVisuals>1) {
            //if (this.data.onEnd==="explode") {

            //}
        //}
    }

    move() {
        let speed = (this.data.speed) * progress
        let angleInRadian = (this.direction-180) / 180 * Math.PI


        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        this.x += vx
        this.y += vy
    }

}

let spellVisualEffects = []

let addSpellVisualEffects = function(x,y,direction,type,data,light = undefined) {
    for (let i = 0; i < spellVisualEffects.length; i++) {
        if (spellVisualEffects[i] === undefined) {
            spellVisualEffects[i] = new SpellVisualEffect(i,x,y,direction,type,data,light)
            return true
        }
    }
    spellVisualEffects.push(new SpellVisualEffect(spellVisualEffects.length,x,y,direction,type,data,light))
}

//rain test
//addSpellVisualEffects(0,0,0,"rain",{size:1000,speed:100,target:{x:0, y:0},color:"rgba(144,158,161,0.52)",onEnd:{name:"",size:1},onRun:{name:"",size:1}})


/*addSpellVisualEffects(0, 0, 90, "fire", {size: 0, speed: 0, target: {x: 50, y: -85}, color: "#ffd876", onEnd: {name: "explode", size: 1}, onRun: {dirToCentre: false,ignoreLifeSize: false, name: "fire", size: 0.1, life: 0.6, speed: 3, area: 0.01, color1: "#ffe784", color2: "#ffce5a", color3: "rgba(255, 139, 118, 0.1)"}},
{radius:100,color:'rgba(255, 160, 80, 1)',duration:-1,decTimer:0.2})*/


//addLight(0,0,100,'rgba(255, 160, 80, 1)',-1)