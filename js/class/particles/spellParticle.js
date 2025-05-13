class SpellParticle {
    constructor(id,xx,yy,direction,type,data) {
        this.x = xx
        this.y = yy

        this.direction = direction
        this.type = type
        this.data = data
        this.id = id
        if (this.data.life) {
            this.maxLife = this.data.life
        }
        this.wait = true
        this.fireSize = 0
        this.texture = textures.particle_fire
        if (this.data.texture) {
            this.texture = this.data.texture
        }
        this.alpha = 1

        this.angle = Math.random() * (2 * Math.PI); 
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1
        this.rotationSpeed = 1+Math.random()*4
    }


    update() {
        let size = this.data.size * zoom
        let color
        if (this.type === "fire") {
            color = this.data.color1
            if (this.data.color > 0.5) {
                color = this.data.color2
            }
        } else if (this.type === "rain") {
            color = this.data.color
            this.direction = getDirection(this,this.data.centre)
            size = (this.data.life*10)*zoom
        }

        if (!this.wait && (this.data.speed>0 || this.data.speed<0)) {
            this.move()
        }

        let xx = (this.x - x) * zoom
        let yy = (this.y - y) * zoom
        let x2d = (game2d.canvasW / 2) + xx
        let y2d = (game2d.canvasH / 2) + yy

        if (this.type !== "rain") {
            this.rotationSpeed -= this.rotationSpeed * progressReal
            this.angle += this.rotationDirection * (Math.random() * this.rotationSpeed) * progressReal

            size += (this.data.size*0.25 * zoom)
            if (this.data.life<0.4 && !this.data.ignoreLifeSize) {
                size = size * (this.data.life*2.5)
            } else {
                this.fireSize += 8 * progressReal
            }
            if (this.data.life < 0.2) {
                this.alpha = this.data.life * 5
            }

            if (!this.wait) {
                particles2d.drawImage(x2d, y2d, size, color, this.texture,undefined,this.alpha,this.angle)
                this.data.speed -= (this.data.speed*6) * progressReal
            }
        } else {
            game2d.setParticleGlow(2,color)
            game2d.drawLineRotate(x2d,y2d,size/3,size,180-this.direction+10, color)
        }

        this.wait = false

        this.data.life -= progressReal
        if (this.data.life <= 0) {
            spellParticles[this.id] = undefined
        }
    }

    move(val = 0) {
        let speed = this.data.speed * progressReal
        if (val > 0 || val < 0) {
            speed = val
        }

        let angleInRadian = (this.direction-180) / 180 * Math.PI

        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        this.x += vx
        this.y += vy
    }

}

let spellParticles = []

let addSpellParticle = function(x,y,direction,type,data) {
    for (let i = 0; i < spellParticles.length; i++) {
        if (spellParticles[i] === undefined) {
            spellParticles[i] = new SpellParticle(i,x,y,direction,type,data)
            return spellParticles[i]
        }
    }
    spellParticles.push(new SpellParticle(spellParticles.length, x, y, direction, type, data))
    return spellParticles[spellParticles.length-1]
}