
var canvas = document.getElementById('id-canvas')

var ctx = canvas.getContext('2d')

var canvasWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth

var canvasHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight
// hahaha 三个全屏方案 stackoverflow真牛逼

canvas.width = canvasWidth
canvas.height = canvasHeight

var paiting = false

var lastPoint = {
    x: undefined,
    y: undefined
}

var newPoint = {
    x: undefined,
    y: undefined
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
} 
function drawLine(x1, y1, x2, y2, width) {
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.lineWidth = width
    ctx.closePath()
    ctx.stroke()
}

canvas.onmousedown = function(down) {
    paiting = true
    var x = down.clientX,
        y = down.clientY
    lastPoint = {
        x:x,
        y:y
    }
    drawCircle(x, y, 5)
        
}

canvas.onmousemove = function(move) {
    // console.log(move)
    var x = move.clientX,
    y = move.clientY
    newPoint = {
        x:x,
        y:y
    }
    if(paiting == true){
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 10)        
    }
    lastPoint = newPoint  //这句话好牛逼

}

canvas.onmouseup = function(up) {
    paiting = false
    console.log(up)
    var x = up.clientX,
        y = up.clientY
}