let getDistance = function(target1,target2) {
    let a = target1.x - target2.x
    let b = target1.y - target2.y
    return (Math.sqrt( a*a + b*b))
}

let getDirection = function(target1,target2) {
    return 360-(Math.atan2(target2.y - target1.y, target2.x - target1.x)* (180 / Math.PI)+90)
}

let getNumberString = function (number) {
    if (number === "") {
        return ""
    }
    if (number>999999) {
        return Math.round((number/1000000)*10)/10+"M"
        //return (number/1000000).toFixed(1)+"M"
    } else if (number>999) {
        return Math.round((number/1000)*10)/10+"K"
        //return (number/1000).toFixed(1)+"K"
    } else {
        return Math.round(number)
    }
}
let getNumberString2 = function(number) {
    if (number>999999) {
        return Math.round((number/1000000)*1000)/1000+"M"
    } else if (number>999) {
        return Math.round((number/1000)*1000)/1000+"K"
    } else {
        return Math.round(number)
    }
}

function hexToHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break
            case g: h = ((b - r) / d + 2); break
            case b: h = ((r - g) / d + 4); break
        }
        h /= 6
    }

    return [h, s, l]
}

function hslToRGB(h, s, l) {
    function hue2rgb(p, q, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
    }

    let r, g, b

    if (s === 0) {
        r = g = b = l
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function darkenColor(hex, val) {
    const [h, s, l] = hexToHSL(hex)
    val = Math.min(1, val)
    const newL = Math.max(0, Math.min(1, l * val))
    const [r, g, b] = hslToRGB(h, s, newL)
    return `rgb(${r}, ${g}, ${b})`
}


let getTime = function(number) {
    let totalMinutes = (number / 720) * 1440
    if (totalMinutes >= 60) {
        let hours = Math.floor(totalMinutes / 60)
        return `${hours}h`
    } else if (totalMinutes >= 1) { 
        return `${Math.floor(totalMinutes)}m`
    } else {
        return `${(totalMinutes * 60).toFixed(0)}s`
    }
}

let getTime2 = function (number) {
    return `${Math.floor(number / 262800)}y ${Math.floor((number % 262800 )/ 720)}d ${String(Math.floor((number % 720) / 30)).padStart(2, '0')}:${String(Math.floor((number % 30) * 2)).padStart(2, '0')}`
}

function isMouseOverObject(obj) {
    let size0 = obj.size[0]
    let size1 = obj.size[1]

    let xx = obj.location.x - size0/2
    let yy = obj.location.y - size1/2
    return (
        mousePosition2d.x >= xx &&
        mousePosition2d.x <= xx + size0 &&
        mousePosition2d.y >= yy &&
        mousePosition2d.y <= yy + size1
    )
}

function decreaseAlpha(rgbaString, step = 0.01) {
    if (!rgbaString.startsWith("rgba")) return rgbaString

    let values = rgbaString.slice(5, -1).split(",").map(v => v.trim())

    if (values.length !== 4) return rgbaString

    let [r, g, b, a] = values
    let newAlpha = Math.max(0, parseFloat(a) - step)
    return `rgba(${r}, ${g}, ${b}, ${newAlpha})`
}


//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}