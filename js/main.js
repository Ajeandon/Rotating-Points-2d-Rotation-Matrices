let canvas, ctx, grid;
let scl = 40, width = 500, height = 600;

window.onload = function(){
    setup();
}

function setup(){
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    canvas.style.background ='#000';
    canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';

    grid = new Grid(width, height, scl);

    canvas.addEventListener('click', function(e){
	grid.onClick(canvas, e);
    });
    
    update();
}

function update(time){

    ctx.clearRect(0, 0, width, height);
    grid.draw(ctx);
    
    
    requestAnimationFrame(update);
}
