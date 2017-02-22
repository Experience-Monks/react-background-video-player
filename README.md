# react-background-video-player
React background video component with simple player API. Supports inline play on iPhone.

## Install
```npm i react-background-video-player```

## Run example
In your terminal go to component folder and run ```npm t```
 
## Component Props
```javascript
{
  playsInline: PropTypes.bool,            // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: PropTypes.bool, // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
  style: PropTypes.object,
  className: PropTypes.string,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
  preload: PropTypes.string,
  muted: PropTypes.bool,   // required to be set to true for auto play on mobile in combination with 'autoPlay' option
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  extraVideoElementProps: PropTypes.object,
  startTime: PropTypes.number,
  tabIndex: PropTypes.number,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onEnd: PropTypes.func,
  onClick: f => f,
  onKeyPress: f => f
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
  startTime: 0,
  tabIndex: 0,
  extraVideoElementProps: {}
}
```

## API
* ```play```
* ```pause```
* ```togglePlay``` - automatically toggle play state based on current state
* ```isPaused``` - get play state
* ```mute```
* ```unmute```
* ```toggleMute``` - automatically toggle mute state based on current state
* ```isMuted``` - get mute state
* ```setCurrentTime```

Also refer to [example](https://github.com/Jam3/react-background-video-player/blob/master/example/example.js) 
