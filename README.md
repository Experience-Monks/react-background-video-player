# react-background-video-player
React background video component with simple player API. Supports inline play on iPhone.

## Install
```npm i react-background-video-player --save```

## Test
In your terminal go to component folder and run ```npm t```

## Component Props
```javascript
{
  playsInline: PropTypes.bool,             // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: PropTypes.bool,  // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
  style: PropTypes.object,
  className: PropTypes.string,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  src: PropTypes.oneOfType([
    PropTypes.string, // single source
    PropTypes.array   // multiple sources
  ]).isRequired,
  poster: PropTypes.string,
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
  preload: PropTypes.string,
  muted: PropTypes.bool,   // required to be set to true for auto play on mobile in combination with 'autoPlay' option
  loop: PropTypes.bool,
  volume: PropTypes.number,
  autoPlay: PropTypes.bool,
  extraVideoElementProps: PropTypes.object,
  startTime: PropTypes.number,
  tabIndex: PropTypes.number,
  onReady: PropTypes.func, // passes back `duration`
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onTimeUpdate: PropTypes.func, // passes back `currentTime`, `progress` and `duration`
  onEnd: PropTypes.func,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
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
  volume: 1,
  autoPlay: true,
  extraVideoElementProps: {},
  startTime: 0,
  tabIndex: 0,
}
```

## API
* ```play``` - play video
* ```pause``` - pause video
* ```togglePlay``` - automatically toggle play state based on current state
* ```isPaused``` - get play state
* ```mute``` - mute video
* ```unmute``` - unmute video
* ```toggleMute``` - automatically toggle mute state based on current state
* ```isMuted``` - get mute state
* ```setCurrentTime``` - seek in time

Also refer to [examples](https://github.com/Jam3/react-background-video-player/tree/master/test)
