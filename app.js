const toolsBar = document.querySelector('#tools');
const colorBtn = document.querySelector('#color');
const eraserBtn = document.querySelector('#eraser');
const decreaseBtn = document.querySelector('#decrease');
const size = document.querySelector('#size');
const increaseBtn = document.querySelector('#increase');
const saveBtn = document.querySelector('#save');
const clearBtn = document.querySelector('#clear');
const canvas = document.querySelector('canvas');
const cursor = document.querySelector('.cursor');
// pos
var pos1 = {x: 0, y: 0};
var pos2 = {x: 0, y: 0};
var sizeValue = 10;

// create canvas default
var ctx = canvas.getContext("2d");
var colorPaint = '#000000';
canvas.height = 700 - toolsBar.offsetHeight;

// White background canvas(dowload)
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Change size
decreaseBtn.addEventListener('click', function() {
    sizeValue = (sizeValue > 5) ? sizeValue -= 5 : 5;
    size.innerText = `${sizeValue}`
})

increaseBtn.addEventListener('click', function() {
    sizeValue = (sizeValue < 30) ? sizeValue += 5 : 30;
    size.innerText = `${sizeValue}`
})

// Erases
eraserBtn.addEventListener('click', function() {
    eraserBtn.classList.toggle('active');
    if( eraserBtn.classList.contains('active')) {
        colorPaint = '#fff';
    } else {
        colorPaint = '#000000';
    }
})

// Paint function
var isDrawing = false;
canvas.addEventListener('mousedown', function(e) {
    pos1.x = e.offsetX;
    pos1.y = e.offsetY;
    isDrawing = true;
})

colorBtn.addEventListener('change', function(e) {
    eraserBtn.classList.remove('active');
    colorPaint = e.target.value;
})

canvas.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = `${e.clientY - 15}px`;
    console.log(e.clientX)
   if(isDrawing) {
    pos2.x = e.offsetX;
    pos2.y = e.offsetY;

    // Drawing line
    ctx.beginPath();
    ctx.arc(pos1.x, pos1.y, sizeValue/2, 0, 2 * Math.PI);
    ctx.fillStyle = colorPaint;
    ctx.fill();

    // Drawing circle
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.lineWidth = sizeValue;
    ctx.strokeStyle = colorPaint;
    ctx.stroke(); 

    // Updating pos1
    pos1.x = pos2.x;
    pos1.y = pos2.y;

   }
})

canvas.addEventListener('mouseup', function() {
    isDrawing = false;
})

// Save and Clear function
clearBtn.addEventListener('click', function() {
    var canvasStart =  canvas.getClientRects()[0];
    ctx.clearRect(0, 0 ,canvasStart.width, canvasStart.height);

    // White background canvas(dowload)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

saveBtn.addEventListener('click', function() {
    var output = canvas.toDataURL('image/jpg');
    saveBtn.href = output;
    saveBtn.click();
})



