
var canvas = document.getElementById('id-canvas')

var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)

var eraserEnabled = false

listenToUser(canvas)

var earaer = document.getElementById('eraser')
var brush = document.getElementById('brush')
eraser.onclick = function () {
    eraserEnabled = true
    console.log('橡皮擦启用了')
}
brush.onclick = function () {
    eraserEnabled = false
}

colorfulPen()
// function
function autoSetCanvasSize(canvas) {
    resizeCanvas()
    function resizeCanvas() {
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
        resizeCanvas()
    }
}
//
function listenToUser(canvas) {
    var using = false

    if (document.body.ontouchstart !== undefined) {
        var lastPoint = {
            x: undefined,
            y: undefined
        }
        // 触屏设备
        canvas.ontouchstart = function (start) {
            console.log('开始摸了')
            using = true
            var x = start.touches[0].clientX
            var y = start.touches[0].clientY
            if (eraserEnabled) {
                ctx.clearRect(x - 3, y - 3, 6, 6)
            } else {
                drawCircle(x, y, 2.5)
                var lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.ontouchmove = function (move) {
            var x = move.touches[0].clientX,
                y = move.touches[0].clientY

            if (using) {
                if (eraserEnabled) {
                    ctx.clearRect(x - 3, y - 3, 6, 6)
                } else {
                    var newPoint = {
                        'x': x,
                        'y': y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 5)
                }
            }
            lastPoint = newPoint //这句话好牛逼
        }
        canvas.ontouchend = function (end) {
            console.log('不摸了')
            using = false
        }
    } else {
        // 非触屏设备
        var lastPoint = {
            x: undefined,
            y: undefined
        }
        canvas.onmousedown = function (down) {

            using = true
            var x = down.clientX,
                y = down.clientY
            if (eraserEnabled) {
                ctx.clearRect(x - 8, y - 8, 16, 16)
            } else {
                drawCircle(x, y, 2.5)

            }
        }

        canvas.onmousemove = function (move) {
            // console.log(move)
            var x = move.clientX,
                y = move.clientY
            var newPoint = {
                'x': x,
                'y': y
            }

            if (using) {
                if (eraserEnabled) {
                    ctx.clearRect(x - 3, y - 3, 6, 6)
                } else {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 5)
                }
            }
            lastPoint = newPoint //这句话好牛逼
        }
        canvas.onmouseup = function (up) {
            using = false
        }

    }
}

/********************/
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
function drawLine(x1, y1, x2, y2, width) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineWidth = width
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.stroke()
}

function colorfulPen() {
    var black = document.getElementById('black')
    var red = document.getElementById('red')
    var green = document.getElementById('green')
    var yellow = document.getElementById('yellow')
    black.onclick = function () {
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'black'
    }
    red.onclick = function () {
        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'red'
    }
    green.onclick = function () {
        ctx.fillStyle = 'green'
        ctx.strokeStyle = 'green'
    }
    yellow.onclick = function () {
        ctx.fillStyle = 'yellow'
        ctx.strokeStyle = 'yellow'
    }
}

