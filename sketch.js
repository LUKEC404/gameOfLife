function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}



let history = [];
let lastStart;
let grid;
let cols;
let rows;
let reslotion = 10;
let play = false;
let tps = 5;
let lastUpdateTime = 0;
let interval = 1000 / tps;7
let friststart;
let historypointer = 0;
let numberOfGenerations = 0;




function countNeighbors(grid, x, y) {
	let sum = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;
			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}

function nextGeneration() {
	next = make2DArray(cols, rows);
	for (let i = 0; i < cols; i++){
		for (let j = 0; j <rows; j++){
			let state = grid[i][j];
			let neighbors = countNeighbors(grid, i, j);

			if (state === 0 && neighbors == 3) {
				next[i][j] = 1;
			}
			else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
				next[i][j] = 0;
			}
			else {
				next[i][j] = state;
			}

		}
	}
	grid = next;
}

function setup() {
	let w , h;
	w = 600;
	h = 600;
  createCanvas(w, h);
	cols = width / reslotion;
  rows = height / reslotion;
	grid = make2DArray(cols, rows);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = 0;
		}
	}

}

function draw() {
  background(0);
	loadGird();
	if (play) {
		let currentTime = millis();
		if (currentTime - lastUpdateTime > interval) {
			lastUpdateTime = currentTime;
			nextGeneration();	
		};
	}
}

function loadGird() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * reslotion;
			let y = j * reslotion;
			if (grid[i][j] == 1) {
				fill(255);
				stroke(0);
				rect(x, y, reslotion - 1, reslotion - 1);
			}
		}
	}
}

function mouseDragged() {
	if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
		return;
	}
	let x = floor(mouseX / reslotion);
	let y = floor(mouseY / reslotion);
	grid[x][y] = 1;
}
function mousePressed() {
	if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
		return;
	}
	let x = floor(mouseX / reslotion);
	let y = floor(mouseY / reslotion);
	grid[x][y] = 1;
}
function keyPressed() {
	// space bar
	if (keyCode === 32) {
		if (!play) {
			lastStart = grid;
			if (history.length === 0) {
				friststart = grid;
			}
			history.push(grid);
			historypointer++;
		}
		play = !play;
	} 
	// c key
	if (keyCode === 82) {
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = 0;
			}
		}
		history = [];
	}
	// r key
	if (keyCode === 67) {
		if (friststart != null) {
			grid = friststart;
			historypointer = 0;
		}
	}
	
	// a key
	if (keyCode === 65) {
		play = false
		if (history.length > 0 && historypointer > 0) {
			grid = history[historypointer - 1];
			historypointer--;
		}
	} 
	// d key
	if (keyCode === 68) {
		play = false
		if (history.length > 0 && historypointer < history.length - 1) {
			grid = history[historypointer + 1];
			historypointer++;
		}
	}

}




