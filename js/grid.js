let Grid = function(width, height, scl){

    this.x = Math.ceil(width / scl);
    this.y = Math.ceil(height / scl);
    this.scl = scl;
    this.pieces = [];
}

Grid.prototype.draw = function(ctx){
    for(let i = 0; i < this.x; i++){

	for(let j = 0; j < this.y; j++){

	    ctx.fillStyle ='#FFF';
	    ctx.stokeStyle ='#C3C3C3';
	    ctx.fillRect(i * this.scl, j * this.scl, this.scl, this.scl);
	    ctx.strokeRect(i * this.scl, j * this.scl, this.scl, this.scl);
	    
	    ctx.fill();
	    ctx.stroke();
	    
	}

    }
}

Grid.prototype.addPiece = function(x, y){

}
