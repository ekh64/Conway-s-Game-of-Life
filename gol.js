//Erica Hyman 6-26-12

var size = 10;
var board;

/* Commented out, incomplete due to time
function setSize(){
	size = document.getElemementById("s").value;
}*/

function init(){
	if(!size){
		size = 3;
	}
	board = new Array(size);
	for(var i=0;i<size;i++){
		board[i] = new Array(size);
		for(var j=0;j<size;j++){
			board[i][j] = Math.floor(( Math.random() * 10) % 2) //generates a random value for the cell
			//board[i][j] = 0;
		}
	}
	print();	
}

function print(){
	var text = "";
	for(var i=0;i<size;i++){
		for(var j=0;j<size;j++){
			text += " "+ board[i][j];
		}
		text+= "<br/>"
	}
	document.getElementById("board").innerHTML = text;
}

function copyB(b){ //copies board b to a new board, temp;
	var temp = new Array(size);
	for(var i=0;i<size;i++){
		temp[i] = new Array(size);
		for(var j=0;j<size;j++){
			temp[i][j] = b[i][j];
		}
	}
	return temp;
}

function nextGen(){
	var copy = copyB(board);
	for(var i = 0; i<size;i++){
		for(var j = 0; j < size; j++){
			var num = calcNeighbor(i,j);
			if(num<2){
				copy[i][j] = 0;
			}
			else if(num > 3){
				copy[i][j] = 0;
			}
			else if(num == 3){
				if(board[i][j]<1){
					copy[i][j] = 1;
				}
			}	
		}
	}
	board = copyB(copy); //transfer modified board into masterboard
	print();
}

function calcNeighbor(i,j){ //calculates the number of alive neighbors
	var num = 0;
	//edgecases
	var top = false;
	var left = false;
	var right = false;
	var bottom = false;
	
	if(i<1){
		top = true;
	}
	if(j<1){
		left = true;
	}
	if((i+1)==size){
		bottom = true;
	}
	if((j+1)==size){
		right = true;
	}
	
	if(!top){
		if(!left){
			if(board[i-1][j-1]>0){
				num++;
			} //topleft alive
		}
		if(!right){
			if(board[i-1][j+1]>0){
				num++;
			} //topright alive
		}
		if(board[i-1][j]>0){
				num++;
		} //top alive
	}
	if(!left){
		if(board[i][j-1]>0){
			num++;
		} //left alive
	}
	if(!right){
		if(board[i][j+1]>0){
			num++;
		} //right alive
	}
	if(!bottom){
		if(!left){
			if(board[i+1][j-1]>0){
				num++;
			} //bottomleft alive
		}
		if(!right){
			if(board[i+1][j+1]>0){
				num++;
			} //bottomright alive
		}
		if(board[i+1][j]>0){
			num++
		}//bottom alive		
	}
	return num;
}