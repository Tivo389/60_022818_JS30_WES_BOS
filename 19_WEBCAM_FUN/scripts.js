const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(localMediaStream => {
      // console.log(localMediaStream);
      // video.src = window.URL.createObjectURL(localMediaStream);  // Where the video is being sourced from. // [Deprecation] URL.createObjectURL with media streams is deprecated and will be removed in M68, around July 2018. Please use HTMLMediaElement.srcObject instead. See https://www.chromestatus.com/features/5618491470118912 for more details.
      video.srcObject = localMediaStream;
      video.play();  // Allow the video to play
    })
    // If error
    .catch(err => {
      console.error('Camera Access Denied!', err);
    });
}

function paintToCanvas() {
  //Canvas Settings
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  // Update Frequency & Function to run
  return setInterval(() => {
    // Draw the image the webcam is getting
    ctx.drawImage(video, 0, 0, width, height);
    // Get pixels of the image
    let pixels = ctx.getImageData(0, 0, width, height);
    // Affect the pixels 01
    // pixels = redEffect(pixels);
    // Affect the pixels 02
    // pixels = rgbSplit(pixels);
    // Affect the pixels 03
    pixels = greenScreen(pixels);
    // Put the pixels back in
    ctx.putImageData(pixels, 0, 0);
  },500);
}

function takePhoto() {
  // Audio Element
  snap.currentTime = 0;
  snap.play();
  // Take canvas data
  const data = canvas.toDataURL('image.jpg');  // Get the data
  const link = document.createElement('a');    // Create link tag
  link.href = data;                            // Assign href value
  link.setAttribute('download', 'handsome');   // Create a 'download' attribute with a value of 'handsome' on the link tag
  link.innerHTML = `<img src="${data}" alt="Handsome Man/Woman">`;
  strip.insertBefore(link, strip.firstChild);  // Insert the link tag into the tag with the .strip class
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i = i+=4) {
    pixels.data[i+0] = pixels.data[i+0] + 50;
    pixels.data[i+1] = pixels.data[i+1] - 50;
    pixels.data[i+2] = pixels.data[i+2] - 50;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i = i+=4) {
    pixels.data[i+150] = pixels.data[i+0];
    pixels.data[i+300] = pixels.data[i+1];
    pixels.data[i+450] = pixels.data[i+2];
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // [i+3] is the alpha so 0 = transparent
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}


getVideo();

video.addEventListener('canplay', paintToCanvas);
