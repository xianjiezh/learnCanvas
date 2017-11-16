var canvas = document.getElementById('id-canvas')

var ctx = canvas.getContext('2d')



function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
} 


canvas.onmousemove = function(move) {
    // console.log(move)
}

canvas.onmousedown = function(down) {
    console.log(down)
    var x = down.clientX,
        y = down.clientY
    drawCircle(x,y)
        
}

canvas.onmouseup = function(up) {
    console.log(up)
    var x = up.clientX,
        y = up.clientY
}