document.addEventListener("DOMContentLoaded", function(event) {

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const key = document.querySelector(`.key[data-key='${e.keyCode}']`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }

  function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }

  window.addEventListener('keydown', playSound);
  const keys = document.querySelectorAll(`.key`);
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));

});






// DEFAULT COURSE VERSION
// document.addEventListener("DOMContentLoaded", function(event) {

//   function playSound(e) {
//     const audio = document.querySelector(`audio[data-key='${e.keyCode}']`); // Refers to the audio element based on the key you press.
//     const key = document.querySelector(`.key[data-key='${e.keyCode}']`); // Refers to the div element based on the key you press.
//     if(!audio) return; // If the key is null (a key we're not using), stop the function.
//     audio.currentTime = 0;  // Rewind the audio to the start.
//     audio.play();
//     key.classList.add('playing');  // Initial thought might be to remove the class with a setTimeout with the same duration as the css but this causes a duration assignment in 2 locations.
//   }

//   function removeTransition(e) {
//     if(e.propertyName !== 'transform') return;  // Since there are several properties going through a transition, lets narrow it down to the 'transform' transition.
//     this.classList.remove('playing'); // When the transition ends, the class 'playing' will be removed.
//   }

//   window.addEventListener('keydown', playSound);
//   const keys = document.querySelectorAll(`.key`); // Refers to all the div elements with the key class.
//   keys.forEach(key => key.addEventListener('transitionend', removeTransition));  // For each element of const keys add an eventListener.

// });