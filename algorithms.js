
/**
  * These algorithms are in-line and called inside a loop.
  * -they rely on global variables set in sketch.js
  */

function bogoSort(){
  if (!isSorted(arr)) {
    arrayshuffle(arr, 0, arr.length);
    arrayshuffles++;
  } else {
    sorted = true;
    noLoop(); // Stop the loop, bogo actually worked?
  }
}

function bubbleSort(){
  if (bubblei < arr.length) {
    for (let j = 0; j < arr.length - bubblei; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr, j, j + 1);
      }
    }
  } else {
    noLoop(); // array is sorted!
  }
  bubblei++;
}

function betterBogoSort(){
  if (pos < end - 1) {
    tmp = arr[pos];
    for (x = pos + 1; x < end; x++) {
      if (arr[x] < tmp) {
        break; // Break out of this for loop without iterating x.
      }
    }
    if (x == end) {
      pos++; // this element is in the right place!!
    } else {
      arrayshuffle(arr, pos, end);
      arrayshuffles++;
    }
  } else {
    noLoop(); // array is sorted!
  }
}

// Helpers:

function arrayshuffle(arr, start, end) {
  let r;
  let size = end - start;
  for (let i = start; i < end; i++) {
    r = Math.floor(Math.random() * size);
    swap(arr, i, start + r);
  }
}

function swap(arr, z, y) {
  let t = arr[z];
  arr[z] = arr[y];
  arr[y] = t;
  arrayaccesses += 2;
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}
