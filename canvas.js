let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

/*
ctx.fillStyle = 'rgba(245, 98, 87, 0.5)';
ctx.fillRect(100, 100, 100, 100);
ctx.fillRect(400, 100, 100, 100);
ctx.fillRect(300, 300, 100, 100);
*/

//Line
/*
ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 300);
ctx.strokeStyle = "#fa34a3";
ctx.stroke();
*/

//arc
/*
ctx.beginPath();
ctx.arc(200, 200, 30, 0, Math.PI *2, false);
ctx.strokeStyle = 'blue';
ctx.stroke();
*/
/*
let x = Math.random() * innerWidth;
let y = Math.random() * innerHeight;
let dx = (Math.random() - 0.5) * 8;
let dy = (Math.random() - 0.5) * 8;
let radius = 30;*/
let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;
// let minRadius = 2;

let colorArray = [
    '#867472',
    '#F9F2EC',
    '#98B7CC',
    '#466A84',
    '#B5C6D6'
]
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', function(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function() {
        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
}


//circle.draw();

let circleArray = [];

function init() {
    circleArray = [];
    for(let i=0; i< 2000; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i=0; i< circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();