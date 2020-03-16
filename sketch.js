let wi = 400; // Canvas Width (example: 800)
let hi = 300; // Canvas Height (example: 600)
let arrsize = 100; // Array Length (Limit: Width / 2 or it breaks!)
let fr = 30; // Framerate (example: 5)

let algs = {
  bogo: 'Bogo',
  betterBogo: 'Better Bogo',
  bubble: 'Bubble'
}

// Global Variables:
//*****
let arr = [];
//*****

let arrayshuffles = 0;
let arrayaccesses = 0;
let sorted = false;
let pos = 0;
let bubblei = 0;

let tmp, x, end,
  oAccesses, slider, bStart,
  lAlg, iCount;


function begin() {
  bStart.attribute('disabled',true); // turn off the start button.
  loop();
}

function setup() {

  frameRate(fr);
  createCanvas(wi, hi);
  noLoop(); // do not start drawing by default (draw() will still be called
            // once in some extremely rare cases this will cause a crash due
            // to an array being shuffled with sorted vales.)

  // populate the array with non-repeating iterated values, and shuffle
  for (i = 0; i < arrsize; i++) {
    arr.push(i);
  }
  arrayshuffle(arr, 0, arr.length);

  end = arr.length;
  pos = 0;

  // setup some interactivity:
  createSpan('Algorithm:');
  lAlg = createSelect();
  lAlg.option(algs.betterBogo);
  lAlg.option(algs.bogo);
  lAlg.option(algs.bubble);
  lAlg.changed(reset);

  createSpan('Array Size (2-'+Math.floor(wi/2)+')');
  iCount = createInput(arrsize.toString());
  iCount.attribute("onclick","this.select()");
  iCount.input(function(){
    if(!isNaN(this.value()) &&
          this.value() <= Math.floor(wi/2) &&
          this.value() > 1){

        arrsize = this.value();
        reset();

      } else {
        this.value(arrsize);
        reset();
      }
  });
  bStart = createButton('Sort!');

  bStart.mousePressed(begin);
  // output:
  oAccesses = createP('');

}

function reset(){
  bubblei = 0;
  pos = 0;
  loop(); // animate color changes to default. (in rare cases, this can cause a
          // crash due to a random array being sorted upon creation) to prevent
          // this, move noLoop() (from a few lines down) here and
          //comment this line out.

  // erase the array and repopulate it
  arr = [];
  for (i = 0; i < arrsize; i++) {
    arr.push(i);
  }
  arrayshuffle(arr, 0, arr.length);

  sorted = false; // reset sorted after new array is shuffled.

  end = arr.length;

  noLoop(); // stop the loop.
  bStart.removeAttribute('disabled'); // turn on the start button.
}


function draw() {

  // Algorithm loop stuff:
  switch(lAlg.value()){
    case algs.bogo:
      bogoSort();
      break;
    case algs.betterBogo:
      betterBogoSort();
      break;
    case algs.bubble:
      bubbleSort();
      break;
    default:
      break;
  }


  // Draw stuff:
  background(0);
  oAccesses.html("Array Accesses: " + arrayaccesses +
    " Array Shuffles: " + arrayshuffles
  );
  for (let i = 0; i < arr.length; i++) {
    switch(lAlg.value()){
      case algs.bogo:
        stroke(255,0,0);
        if (sorted){
          stroke(0,255,0);
        }
        break;
      case algs.betterBogo:
        stroke(255);
        if (i < pos) {
          stroke(0, 255, 0);
        } else if (i == pos) {
          stroke(255, 0, 0);
        }
        break;
      default:
        break;
    }
    strokeWeight(Math.floor(wi / arrsize) - 1);
    let linewidth = i * Math.floor(wi / arrsize);
    let offsetw = Math.floor((wi / arrsize) / 2);
    let offseth = Math.floor(hi / arrsize);
    line(linewidth + offsetw, height, linewidth + offsetw, hi - arr[i] * offseth);
    if (sorted) noLoop();
  }
}
