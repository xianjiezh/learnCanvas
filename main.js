
var canvas = document.getElementById('id-canvas')

var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)

var eraserEnabled = false

listenToUser(canvas)


var earaer = document.getElementById('eraser')
var brush = document.getElementById('brush')
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
    
}
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    
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
    

    if (document.body.ontouchstart !== undefined) {
        var using = false
        var lastPoint = {
            x: undefined,
            y: undefined
        }
        // 触屏设备
        canvas.ontouchstart = function (start) {
            console.log(using)
            var x = start.touches[0].clientX
            var y = start.touches[0].clientY
            if (eraserEnabled) {
                ctx.clearRect(x - range.value/2, y - range.value/2, range.value, range.value)
            } 
        }
        canvas.ontouchmove = function (move) {
            using = true
            
            var x = move.touches[0].clientX,
                y = move.touches[0].clientY
            if (using) {
                if (eraserEnabled) {
                    ctx.clearRect(x - range.value/2, y - range.value/2, range.value, range.value)
                } else {
                    var newPoint = {
                        'x': x,
                        'y': y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, range.value)
                }
            }
            lastPoint = newPoint // 这句话好牛逼
            console.log(using)
            
        }
        canvas.ontouchend = function (end) {
            using = false
            lastPoint = {
                'x': undefined,
                'y': undefined
            }   // 把上一次的move事件里面的x，y清除掉
            console.log(using)
        }
    } else {
        var using = false
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
                ctx.clearRect(x - range.value, y - range.value, range.value*2, range.value*2)
            } else {
                drawCircle(x, y, range.value/2)

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
                    ctx.clearRect(x - range.value, y - range.value, range.value*2, range.value*2)
                } else {
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, range.value)
                    lastPoint = newPoint
                }

            }

        }
        canvas.onmouseup = function (up) {
            using = false
            lastPoint = {
                x: undefined,
                y: undefined
            }
        }

    }
}

clear.onclick = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function() {
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'canvas-picture'
    a.click()
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
ctx.fillStyle = color.value
ctx.strokeStyle = color.value
function colorfulPen() {
    var black = document.getElementById('black')
    var red = document.getElementById('red')
    var green = document.getElementById('green')
    var yellow = document.getElementById('yellow')
    black.onclick = function () {
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'black'
        brush.style.fill = 'black'
    }
    red.onclick = function () {
        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'red'
        brush.style.fill = 'red'
    }
    green.onclick = function () {
        ctx.fillStyle = 'green'
        ctx.strokeStyle = 'green'
        brush.style.fill = 'green'
    }
    yellow.onclick = function () {
        ctx.fillStyle = 'yellow'
        ctx.strokeStyle = 'yellow'
        brush.style.fill = 'yellow'
    }
    color.onchange = function(){
        ctx.fillStyle = color.value
        ctx.strokeStyle = color.value
        brush.style.fill = color.value
        console.log(brush.style.fill)
    }
}

