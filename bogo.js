let shuffles = 0;
let avgs = [];
let arr = [];

function betterBogo(arr, start, end) {
	let pos = start;
	let success,tmp,i;

	while (pos < end-1) {
		tmp = arr[pos];
		for (i = pos + 1; i < end; i++) {
			if (arr[i] < tmp) {
				break;
			}
		}
		if (i == end) {
			pos++;
		} else {
			shuffle(arr, pos, end);
			shuffles++;
		}
	}
}
function shuffle(arr, start, end) {
	let r;
	let size = end - start;
	for (let i = start; i < end; i++) {
		r = Math.floor(Math.random() * size);
		swap(arr, i, start + r);
	}
}

function swap(arr, x, y){
	let t = arr[x];
	arr[x] = arr[y];
	arr[y] = t;
}

function mkarr(){
	for(i=0;i<100;i++){
		arr.push(i);
	}
	shuffle(arr,0,99);
}

mkarr();
console.log(arr);
for(let j=0;j<100;j++){
	betterBogo(arr,0,99);
	shuffle(arr, 0, 99);
	avgs.push(shuffles);
}
let avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
console.log("Average Shuffles over 100 sorts: "+shuffles);
