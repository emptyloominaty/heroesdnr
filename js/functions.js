let getDistance = function(target1,target2) {
    let a = target1.x - target2.x
    let b = target1.y - target2.y
    return (Math.sqrt( a*a + b*b))
}

let getDirection = function(target1,target2) {
    return 360-(Math.atan2(target2.y - target1.y, target2.x - target1.x)* (180 / Math.PI)+90)
}

let getNumberString = function(number) {
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

function darkenColor(color, val) {
    const [r, g, b] = [0, 1, 2].map(i => parseInt(color.slice(1 + i * 2, 3 + i * 2), 16))
    const darken = Math.floor(255 * (0.5-val))
    return `rgb(${Math.max(0, r - darken)}, ${Math.max(0, g - darken)}, ${Math.max(0, b - darken)})`
}


let getTime = function(number) {
    // Convert the number to a scale where 1 day = 720 units
    let totalMinutes = (number / 720) * 1440; // 1 day = 1440 minutes

    if (totalMinutes >= 60) { // If more than 1 hour
        let hours = Math.floor(totalMinutes / 60);
        return `${hours}h`;
    } else if (totalMinutes >= 1) { // If more than 1 minute
        return `${Math.floor(totalMinutes)}m`;
    } else { // If less than 1 minute
        return `${(totalMinutes * 60).toFixed(0)}s`;
    }
}

let getTime2 = function (number) {
    return `${Math.floor(number / 720)}d ${String(Math.floor((number % 720) / 30)).padStart(2, '0')}:${String(Math.floor((number % 30) * 2)).padStart(2, '0')}`
}

function isMouseOverObject(obj) {
    let xx = obj.location.x - obj.size[0]/2
    let yy = obj.location.y - obj.size[1]/2
    return (
        mousePosition2d.x >= xx &&
        mousePosition2d.x <= xx + obj.size[0] &&
        mousePosition2d.y >= yy &&
        mousePosition2d.y <= yy + obj.size[1]
    )
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