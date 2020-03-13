
let arrayshuffles = 0;
let arrayaccesses = 0;
let arr = [];
let pos,success,tmp,
    x,start,end,oAccesses, oShuffles;
let wi = 800;
let hi = 600;
async function arrayshuffle(arr,start, end) {
	let r;
	let size = end - start;
	for (let i = start; i < end; i++) {
		r = Math.floor(Math.random() * size);
		swap(arr, i, start + r);
	}
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function swap(arr,z, y){
  sleep(6);
	let t = arr[z];
	arr[z] = arr[y];
	arr[y] = t;
  arrayaccesses += 2;
}

function setup() {
  createCanvas(wi, hi);
  for(i=0;i<100;i++){
		arr.push(i);
	}
	arrayshuffle(arr,0,arr.length);
  //betterBogo(arr,0,arr.length-1);
  start = 0;
  end = arr.length;
  pos = start;
  oAccesses = createP('');
  oShuffles = createP('');
}
function draw() {
  background(0);
  if (pos < end-1) {
		tmp = arr[pos];
		for (x = pos + 1; x < end; x++) {
			if (arr[x] < tmp) {
				break;
			}
		}
		if (x == end) {
			pos++;
		} else {
			arrayshuffle(arr, pos, end);
			arrayshuffles++;
		}
	} else {
    noLoop();
  }


  oAccesses.html("Array Accesses: "+arrayaccesses);
  oShuffles.html("Array Shuffles: "+arrayshuffles);
  for (let i = 0; i < arr.length; i++) {
    stroke(255);
    if (i < pos){
      stroke(0,255,0);
    } else if (i==pos) {
      stroke(255,0,0);
    }
    strokeWeight(7);
    line(i*(wi/100)+4, height, i*(wi/100)+4, hi - arr[i]*6);
  }
}
