
var canvas = document.getElementById('id-canvas')

var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)

var eraserEnabled = false

listenToUser()

eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions s'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}

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
        canvas.width = canvasWidth - 10
        canvas.height = canvasHeight - 10
    }
    window.onresize = function () {
        resizeCanvas()
    }
}
//
function listenToUser() {

    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        canvas.ontouchstart = function (start) {
            using = true
            var x = start.touches[0].clientX
            var y = start.touches[0].clientY
            if (eraserEnabled) {
                ctx.clearRect(x - 3, y - 3, 6, 6)
            } else {
                drawCircle(x, y, 2.5)
            }
            var lastPoint = {
                x: undefined,
                y: undefined
            }

            var newPoint = {
                x: undefined,
                y: undefined
            }
        }
        canvas.ontouchmove = function (move) {
            var x = move.touches[0].clientX,
                y = move.touches[0].clientY
            newPoint = {
                x: x,
                y: y
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
        canvas.ontouchend = function() {
            using = false
        }
    } else {
    // 非触屏设备
    var using = false
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
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    var newPoint = {
        x: undefined,
        y: undefined
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
var black = document.getElementById('black')
var red = document.getElementById('red')
var green = document.getElementById('green')
var yellow = document.getElementById('yellow')
black.onclick = function () {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
}
red.onclick = function() {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'red'
}
green.onclick = function() {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
}
yellow.onclick = function() {
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'yellow'
}