var BackgroundCover = require('../index.js').BackgroundCover;

var body = document.getElementsByTagName('body')[0];
body.style.position = 'absolute';
body.style.overflow = 'hidden';
body.style.width = '100%';
body.style.height = '100%';
body.style.margin = 0;

var image = document.createElement('img');
image.src = 'tests/assets/test.png';
image.style.visibility = 'hidden';

body.appendChild(image);

var setCover = function () {
  BackgroundCover(image, body);
  image.style.visibility = 'visible';
};

image.addEventListener('load', function() {
  setCover();
});
window.addEventListener('resize', setCover);