
var canvas = document.getElementById('id-canvas')

var ctx = canvas.getContext('2d')

resize()
function resize() {
    var canvasWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth

    var canvasHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight
}
window.onresize = function () {
    resize()
}


var using = false

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
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = width
    ctx.closePath()
    ctx.stroke()
}

var eraserEnabled = false
var actions = document.getElementById('eraser')
actions.onclick = function () {
    eraserEnabled = !eraserEnabled
}

canvas.onmousedown = function (down) {

    using = true
    var x = down.clientX,
        y = down.clientY
    if (eraserEnabled) {
        ctx.clearRect(x - 3, y - 3, 6, 6)
    } else {
        drawCircle(x, y, 2.5)
    }

}
canvas.onmousemove = function (move) {
    // console.log(move)
    var x = move.clientX,
        y = move.clientY
    newPoint = {
        x: x,
        y: y
    }

        if (using) {
            if(eraserEnabled){
                ctx.clearRect(x -3, y -3, 6, 6)
            } else {
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 5) 
            }
        }
        lastPoint = newPoint //这句话好牛逼
    


}
canvas.onmouseup = function (up) {
    using = false

    var x = up.clientX,
        y = up.clientY
}
