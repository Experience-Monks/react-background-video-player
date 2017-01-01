# react-background-video-player
React background video component with simple player API. Supports inline play on iPhone.

## Install
```npm i react-background-video-player```

## Run example
In your terminal go to component folder and run ```npm t```
 
## Component Props
```javascript
{
  playsInline: PropTypes.bool, // play inline on iPhone
  disableBackgroundCover: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  containerWidth: PropTypes.number.isRequired,  // 0 to 1. 0 means video is anchored to the left (default is 0.5)
  containerHeight: PropTypes.number.isRequired, // 0 to 1. 0 means video is anchored to the left (default is 0.5)
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
  preload: PropTypes.string,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  startTime: PropTypes.number,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onEnd: PropTypes.func
}
```

## Default Props
```javascript
{
  playsInline: true,
  disableBackgroundCover: false,
  style: {},
  className: '',
  poster: '',
  horizontalAlign: 0.5,
  verticalAlign: 0.5,
  preload: 'auto',
  muted: true,
  loop: true,
  autoPlay: true,
  startTime: 0
}
```

## API
* ```play```
* ```pause```
* ```togglePlay``` - automatically toggle play state based on current state
* ```mute```
* ```unmute```
* ```toggleMute``` - automatically toggle mute state based on current state
* ```setCurrentTime```

Also refer to [example](https://github.com/Jam3/react-background-video-player/blob/master/example/example.js) 
