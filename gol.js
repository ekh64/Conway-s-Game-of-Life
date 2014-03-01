//Erica Hyman 7/31/2013

var size = 25;
var genCount = 0;
var board;


function init(){

/*
	genCount = 0;
	var t = "Generation "+genCount;
	
	$("#genCount").html(t);
*/
	var text = "";
	
	if(!size){
		size = 3;
	}
	board = new Array(size);
	for(var i=0;i<size;i++){
		board[i] = new Array(size);
		for(var j=0;j<size;j++){
			board[i][j] = 0;
			//board[i][j] = Math.floor(( Math.random() * 100) % 2) //generates a random value for the cell
			text += "<span id='r"+i+"c"+j+"' onclick='toggle("+i+","+j+")'></span>";
		}
		text+= "<br/>"
	}
	/*
	var r = Math.floor((Math.random() * 1000) % 255);
	var g = Math.floor((Math.random() * 1000) % 255);
	var b = Math.floor((Math.random() * 1000) % 255);
	var rgb = "rgb("+r+","+g+","+b+")";
	$(".alive").css("background-color",rgb);
	*/
	$("#board").html(text);

	var temp = null;
	$("#anibutton").click(function(){
		if(temp!=null){ //timer is started
			clearTimeout(temp);
			temp = null;
			$(this).text("Animate");
		}
		else{
			temp = setInterval("nextGen()", 300);
			$(this).text("Stop");
		}
	});

	print();	
}

function toggle(i,j){
	if(board[i][j] == 0)
		board[i][j] = 1;
	else
		board[i][j] = 0;
	print();

}

function print(){
	for(var i=0;i<size;i++){
		for(var j=0;j<size;j++){
			createBox(i,j);	
		}
	}

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

function nextGen(){ //uncaught error
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
	genCount++;
	//var t = "Generation "+genCount;
	//$("#genCount").html(t);
	print();
}

function createBox(i,j){
		var sp = "#r"+i+"c"+j;
		if(board[i][j] == 1) {
			if(!($(sp).hasClass("alive")))
				$(sp).addClass("alive");
			if($(sp).hasClass("dead"))
				$(sp).removeClass("dead");
		} 
		else {
			if(!($(sp).hasClass("dead")))
				$(sp).addClass("dead");
			if($(sp).hasClass("alive"))
				$(sp).removeClass("alive");
		}		
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