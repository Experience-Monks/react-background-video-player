# background-cover

Simulate 'background-size: cover' on HTMLVideoElement and HTMLImageElement.

## Syntax
```javascript
BackgroundCover(element, container [, horizontalAlign, verticalAlign]);
```

* **element**: `HTMLVideoElement`, or `HTMLImageElement`, or other dom element (e.g. `HTMLCanvasElement`)
* **horizontalAlign**: `Number` from 0 to 1, where 0 means aligned to the left. Default value is 0.5 (centered);
* **verticalAlign**: `Number` from 0 to 1, where 0 means aligned to the top. Default value is 0.5 (centered);


## Example
```javascript

var BackgroundCover = require('background-cover').BackgroundCover;

var videoContainer = document.getElementById('video-container');
var video = document.getElementById('video');

video.addEventListener('loadedmetadata', function() {
  BackgroundCover(video, videoContainer);
);
```
Check out [tests](http://github.com/Jam3/background-cover/blob/master/tests) for more examples.


## Install
```sh
npm install background-cover --save
``` 
 
## Tests
```sh
npm run test-video
npm run test-image
```
NOTE: Tests require [beefy](http://didact.us/beefy/) to be installed globally.

 
## License
MIT, see [LICENSE.md](http://github.com/Jam3/background-cover/blob/master/LICENSE) for details.
