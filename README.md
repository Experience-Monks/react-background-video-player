# react-background-video-player
React background video component with simple player API

## Install
```npm i react-background-video-player```

## Run example
In your terminal go to component folder and run ```npm start```
 
## Component Props
```javascript
{
  disableBackgroundCover: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
  preload: PropTypes.string,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  currentTime: PropTypes.number,
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
  disableBackgroundCover: false,
  style: {
    width: '100%',
    height: '100%',
  },
  className: '',
  poster: '',
  horizontalAlign: 0.5,
  verticalAlign: 0.5,
  preload: 'auto',
  muted: false,
  loop: true,
  autoPlay: true,
  currentTime: 0
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
