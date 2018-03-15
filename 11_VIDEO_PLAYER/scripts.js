// ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



// FUNCTIONS
function togglePlay() {
  this.paused ? video.play() : video.pause();
}
function updateButton() {
  this.paused ? toggle.innerHTML = '►' : toggle.innerHTML = '❚ ❚';
}
function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;  // Since the html element used the 'name' attribute, by using '[this.name]' it can cater for both 'volume' and 'playbackRate'.
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}



// APPLYING THE EVENT LISTENERS
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => {
  if(mousedown) { scrub(e); }
});





