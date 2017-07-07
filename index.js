'use strict';
import React, { PureComponent } from 'react';
import { BackgroundCover } from 'background-cover';
import playInlineVideo from 'iphone-inline-video';
import insertRule from 'insert-rule';
import PropTypes from 'prop-types';

const iOSNavigator = typeof navigator !== 'undefined' && (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
const iOSVersion = iOSNavigator ? iOSNavigator[1] : null;

class BackgroundVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hasStarted: false
    };
    this.startTimeIsSet = false;
  }

  componentDidMount() {
    if (this.props.playsInline && iOSVersion) {
      let hasAudio = !(iOSVersion && iOSVersion < 10 && this.props.autoPlay && this.props.muted); // allow auto play on iOS < 10 for silent videos
      let requireInteractionOnTablet = false;

      playInlineVideo(this.video, hasAudio, requireInteractionOnTablet);
      insertRule([
          'video::-webkit-media-controls-start-playback-button',
          '.IIV::-webkit-media-controls-play-button'
        ], {
          display: 'none',
        }
      );
    }

    if (this.video.readyState !== 4) {
      this.video.addEventListener('loadedmetadata', this._handleVideoReady);
    } else {
      this._handleVideoReady();
    }

    this.video.addEventListener('play', this._handleOnPlay);
    this.video.addEventListener('pause', this._handleOnPause);
    this.video.volume = this.props.volume;
  }

  componentWillUnmount() {
    this.video.removeEventListener('loadedmetadata', this._handleVideoReady);
    this.video.removeEventListener('play', this._handleOnPlay);
    this.video.removeEventListener('pause', this._handleOnPause);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.containerWidth !== nextProps.containerWidth ||
      this.props.containerHeight !== nextProps.containerHeight) {
      this._resize();
    }

    if (this.props.volume !== nextProps.volume) {
      this.video.volume = nextProps.volume
    }
  }

  shouldComponentUpdate(nextState, nextProps) {
    return this.props.shouldComponentUpdate;
  }

  _handleVideoReady = () => {
    let duration = this.video.duration;
    this._resize();
    this.setCurrentTime(this.props.startTime);
    this.props.autoPlay && this.play();
    this.props.onReady(duration);
    !this.poster && this.setState({visible: true});
  };

  _handlePosterReady = () => {
    this._resize();
    this.setState({visible: true});
  };

  _resize = () => {
    if (!this.props.disableBackgroundCover) {
      BackgroundCover(this.video, this.container, this.props.horizontalAlign, this.props.verticalAlign);
      this.poster && BackgroundCover(this.poster, this.container, this.props.horizontalAlign, this.props.verticalAlign);
    }
  };

  _handleOnPlay = () => {
    if (!this.state.hasStarted) this.setState({hasStarted: true});
    this.props.onPlay();
  };

  _handleOnPause = () => {
    this.props.onPause();
  };

  _handleTimeUpdate = () => {
    iOSVersion && this._handleIOSStartTime();
    let currentTime = this.video.currentTime;
    let duration = this.video.duration;
    let progress = currentTime / duration;
    this.props.onTimeUpdate(currentTime, progress, duration);
  };

  _handleVideoEnd = () => {
    this.props.onEnd();
  };

  _handleIOSStartTime = () => {
    if (this.video.currentTime < this.props.startTime) {
      if (!this.startTimeIsSet) {
        this.setCurrentTime(this.props.startTime);
        this.startTimeIsSet = true;
      }
    }
  };

  play = () => {
    this.video.play();
  };

  pause = () => {
    this.video.pause();
  };

  togglePlay = () => {
    this.video.paused ? this.play() : this.pause();
  };

  isPaused = () => {
    return this.video.paused;
  };

  mute = () => {
    this.video.muted = true;
    this.props.onMute();
  };

  unmute = () => {
    this.video.muted = false;
    this.props.onUnmute();
  };

  toggleMute = () => {
    this.video.muted ? this.unmute() : this.mute();
  };

  isMuted = () => {
    return this.video.muted;
  };

  setCurrentTime = (val) => {
    this.video.currentTime = val;
  };

  render() {
    const props = this.props;
    const state = this.state;

    const absolute100 = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    };

    const className = 'BackgroundVideo';
    const visibility = state.visible ? 'visible' : 'hidden';
    const style = Object.assign({...absolute100, visibility}, props.style);

    let extraVideoElementProps = Object.assign(props.extraVideoElementProps, {
      playsInline: props.playsInline
    });

    const videoProps = {
      ref: v => this.video = v,
      src: typeof props.src === 'string' ? props.src : null,
      preload: props.preload,
      muted: props.muted,
      loop: props.loop,
      onTimeUpdate: this._handleTimeUpdate,
      onEnded: this._handleVideoEnd,
      ...extraVideoElementProps
    };

    return (
      <div
        ref={r => this.container = r}
        className={`${className} ${props.className}`}
        style={style}
        onClick={props.onClick}
        onKeyPress={props.onKeyPress}
        tabIndex={props.tabIndex}
      >
        {
          typeof props.src === 'object' && props.src.length > 1 ? (
            <video{...videoProps}>
              {
                props.src.map((source, key) => (
                  <source key={key} {...source} />
                ))
              }
            </video>
          ) : (
            <video {...videoProps} />
          )
        }

        {
          (props.poster && !state.hasStarted) &&
          <img
            src={props.poster}
            ref={r => this.poster = r}
            onLoad={this._handlePosterReady}
          />
        }
      </div>
    );
  }
}

BackgroundVideo.propTypes = {
  playsInline: PropTypes.bool,             // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: PropTypes.bool,  // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
  style: PropTypes.object,
  className: PropTypes.string,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  poster: PropTypes.string,
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
  preload: PropTypes.string,
  muted: PropTypes.bool,   // required to be set to true for auto play on mobile in combination with 'autoPlay' option
  volume: PropTypes.number,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  extraVideoElementProps: PropTypes.object,
  startTime: PropTypes.number,
  tabIndex: PropTypes.number,
  shouldComponentUpdate: PropTypes.bool,
  onReady: PropTypes.func, // passes back `duration`
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onTimeUpdate: PropTypes.func, // passes back `currentTime`, `progress` and `duration`
  onEnd: PropTypes.func,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};

BackgroundVideo.defaultProps = {
  playsInline: true,
  disableBackgroundCover: false,
  style: {},
  className: '',
  poster: '',
  horizontalAlign: 0.5,
  verticalAlign: 0.5,
  preload: 'auto',
  muted: true,
  volume: 1,
  loop: true,
  autoPlay: true,
  extraVideoElementProps: {},
  startTime: 0,
  tabIndex: 0,
  shouldComponentUpdate: true,
  onReady: f => f,
  onPlay: f => f,
  onPause: f => f,
  onMute: f => f,
  onUnmute: f => f,
  onTimeUpdate: f => f,
  onEnd: f => f,
  onClick: f => f,
  onKeyPress: f => f
};

export default BackgroundVideo;
