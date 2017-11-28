
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
        confirm('缩放窗口会导致之前的改动没有保存',)
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
            if (eraserEnabled) {
                ctx.clearRect(x1 - range.value, y1 - range.value, range.value*2, range.value*2)
            } else {
                console.log('aaaaa')
                var x1 = down.clientX,
                y1 = down.clientY
                drawCircle(x1, y1, range.value/2)
            }
        }

        canvas.onmousemove = function (move) {
            // console.log(move)
            var x2 = move.clientX,
                y2 = move.clientY
            

            if (using) {
                if (eraserEnabled) {
                    ctx.clearRect(x2 - range.value, y2 - range.value, range.value*2, range.value*2)
                } else {
                    var newPoint = {
                        x2: x2,
                        y2: y2
                    }
                    drawLine(lastPoint.x2, lastPoint.y2, newPoint.x2, newPoint.y2, range.value)
                    lastPoint = newPoint
                }

            }

        }
        canvas.onmouseup = function (up) {
            using = false
            lastPoint = {
                x1: undefined,
                y1: undefined
            }
        }

    }
}

clear.onclick = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function() {
    downLoad(canvas)
}
/********************/
function downLoad(){
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'canvas-picture'
    a.click()
}
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
        ctx.fillStyle = '#FFCE43'
        ctx.strokeStyle = '#FFCE43'
        brush.style.fill = '#FFCE43'
    }
    color.onchange = function(){
        ctx.fillStyle = color.value
        ctx.strokeStyle = color.value
        brush.style.fill = color.value
        console.log(brush.style.fill)
    }
}

