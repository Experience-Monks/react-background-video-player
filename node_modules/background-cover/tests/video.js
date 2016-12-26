var BackgroundCover = require('../index.js').BackgroundCover;

var body = document.getElementsByTagName('body')[0];
body.style.position = 'absolute';
body.style.overflow = 'hidden';
body.style.width = '100%';
body.style.height = '100%';
body.style.margin = 0;

var video = document.createElement('video');
video.src = 'tests/assets/test.webm';
video.preload = 'auto';
video.muted = 'true';
video.autoplay = 'true';
video.style.visibility = 'hidden';

body.appendChild(video);

var setCover = function () {
  BackgroundCover(video, body);
  video.style.visibility = 'visible';
};

video.addEventListener('loadedmetadata', setCover);
window.addEventListener('resize', setCover);