let Grid = function(width, height, scl){

    this.x = Math.ceil(width / scl);
    this.y = Math.ceil(height / scl);
    this.scl = scl;
    this.pieces = [];
    this.pivot = null;
}

Grid.prototype.draw = function(ctx){
    for(let i = 0; i < this.y; i++){

	for(let j = 0; j < this.x; j++){

	    ctx.fillStyle ='#FFF';
	    ctx.strokeStyle ='#C3C3C3';
	    ctx.fillRect(j * this.scl, i * this.scl, this.scl, this.scl);
	    ctx.strokeRect(j * this.scl, i * this.scl, this.scl, this.scl);
	    
	    ctx.fill();
	    ctx.stroke();
	    
	}

    }

    this.drawPieces(ctx);
}

Grid.prototype.drawPieces = function(ctx){
    for(let i = 0; i < this.pieces.length; i++){
	let piece = this.pieces[i];

	if(null !== this.pivot &&  piece.x == this.pivot.x && piece.y == this.pivot.y)
	    ctx.fillStyle ='green';
	else
	    ctx.fillStyle ='blue';

	ctx.strokeStyle ='#C3C3C3';
	ctx.fillRect(piece.x, piece.y, this.scl, this.scl);
	ctx.strokeRect(piece.x, piece.y, this.scl, this.scl);
	
	ctx.fill();
	ctx.stroke();

	
    }
}

Grid.prototype.isSetPiece = function(piece){

    for(let i = 0; i < this.pieces.length; i++){
	if(this.pieces[i].x == piece.x && this.pieces[i].y == piece.y)
	    return i;
    }

    return false;
}

Grid.prototype.addPiece = function(x, y){
    let piece = {x : x, y : y}, index;
    if((index = this.isSetPiece(piece)) !== false){
	if(null !== this.pivot && piece.x == this.pivot.x && piece.y == this.pivot.y){
	    this.pivot = null;
	    this.pieces.splice(index, 1);
	}else{
	    this.pivot = piece;
	}
    }else{
	this.pieces.push(piece);
    }
    
}

Grid.prototype.pieceRotation = function(angle){
    
    if(null === this.pivot){
	alert('you have to create a pivot');
	return;
    }
    
    for(let i = 0; i < this.pieces.length; i++){
	let piece = this.pieces[i];
	
	if(piece.x != this.pivot.x || piece.y != this.pivot.y){
	    
	    let vr = {};
	    vr.x = piece.x - this.pivot.x;
	    vr.y = piece.y - this.pivot.y;

	    let vt = {};
	    vt.x = (Math.sin(angle) * vr.y) + (Math.cos(angle) * vr.x);
	    vt.y = (Math.cos(angle) * vr.y) + (-Math.sin(angle) * vr.x);

	    this.pieces[i].x = this.pivot.x + vt.x;
	    this.pieces[i].y = this.pivot.y + vt.y;
	}
    }
}

Grid.prototype.onClick = function(canvas, evt){
    let rect = canvas.getBoundingClientRect();
    let pos = {
	x: Math.floor((evt.clientX - rect.left) / this.scl) * this.scl,
	y: Math.floor((evt.clientY - rect.top) / this.scl) * this.scl
    };

    this.addPiece(pos.x, pos.y);
}
