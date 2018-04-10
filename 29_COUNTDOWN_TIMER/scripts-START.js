let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  const start = Date.now();
  const end = start + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(end);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  },1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemain = seconds % 60;
  console.log({minutes, secondsRemain});
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemain < 10 ? '0' : ''}${secondsRemain}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endDisplay.textContent = `Will be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  timer(parseInt(this.dataset.time));
}

buttons.forEach(button => {
  button.addEventListener('click', startTimer);
});

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
});