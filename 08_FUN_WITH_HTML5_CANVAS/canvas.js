// CANVAS SETTINGS
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 80;

// CANVAS STATUS
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let growLineWidth = true;

// FUNCTIONS
function draw(e) {
  if(!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;  // Assign color
  ctx.beginPath();                             // Pen touch paper
  ctx.moveTo(lastX, lastY);                    // Pen being dragged
  ctx.lineTo(e.offsetX, e.offsetY);            // Pen dragged to point
  ctx.stroke();                                // Pen lifted off paper
  lastX = e.offsetX;                           // Feedback coordinate for next draw()
  lastY = e.offsetY;                           // Feedback coordinate for next draw()
  hue++;                                       // Assign updated color
  // - Grow until 100 then start decreasing, if 1 or less start growing.
  if(ctx.lineWidth >= 150 || ctx.lineWidth <= 1) {
    growLineWidth = !growLineWidth;
  }
  growLineWidth ? ctx.lineWidth++ : ctx.lineWidth--;
}

// EVENTLISTENERS
// - Start drawing if...
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;                            // While the mouse is down you are drawing
  lastX = e.offsetX;                           // draw() will begin at this coordinate
  lastY = e.offsetY;                           // draw() will begin at this coordinate
});
canvas.addEventListener('mousemove', draw);
// - Stop drawing if...
canvas.addEventListener('mouseup'  , () => isDrawing = false);
canvas.addEventListener('mouseout' , () => isDrawing = false);
