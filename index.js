'use strict';
import React, { Component, PropTypes } from 'react';
import { BackgroundCover } from 'background-cover';
import playInlineVideo from 'iphone-inline-video';
import insertRule from 'insert-rule';

const iOSNavigator = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
const iOSVersion = iOSNavigator ? iOSNavigator[1] : null;

class BackgroundVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    if (this.props.playsInline) {
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

    this.video.addEventListener('play', this.props.onPlay);
    this.video.addEventListener('pause', this.props.onPause);
  }

  componentWillUnmount() {
    this.video.removeEventListener('loadedmetadata', this._handleVideoReady);
    this.video.removeEventListener('play', this.props.onPlay);
    this.video.removeEventListener('pause', this.props.onPause);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.containerWidth !== nextProps.containerWidth ||
      this.props.containerHeight !== nextProps.containerHeight) {
      this._resize();
    }
  }

  _handleVideoReady = () => {
    this._resize();
    this.setCurrentTime(this.props.startTime);
    this.props.autoPlay && this.play();
    this.setState({visible: true});
    this.props.onReady();
  };

  _resize = () => {
    if (!this.props.disableBackgroundCover) {
      BackgroundCover(this.video, this.container, this.props.horizontalAlign, this.props.verticalAlign);
    }
  };

  _handleTimeUpdate = () => {
    this._handleIOSStartTime();
    let currentTime = Math.round(this.video.currentTime);
    let duration = Math.round(this.video.duration);
    let progress = currentTime / duration;
    this.props.onTimeUpdate(currentTime, progress, duration);
  };

  _handleVideoEnd = () => {
    this.props.onEnd();
  };

  _handleIOSStartTime = () => {
    if (this.video.currentTime < this.props.startTime) {
      this.setCurrentTime(this.props.startTime);
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
    let className = 'BackgroundVideo';
    let visibility = this.state.visible ? 'visible' : 'hidden';
    let style = Object.assign({
      position: 'absolute',
      width: '100%',
      height: '100%',
      visibility
    }, this.props.style);

    let extraVideoElementProps = Object.assign(this.props.extraVideoElementProps, {});
    if (this.props.playsInline) {
      extraVideoElementProps.playsInline = true;
    }

    return (
      <div
        ref={c => this.container = c}
        className={`${className} ${this.props.className}`}
        style={style}
        onClick={this.props.onClick}
      >
        <video
          ref={v => this.video = v}
          src={this.props.src}
          poster={this.props.poster}
          preload={this.props.preload}
          muted={this.props.muted}
          loop={this.props.loop}
          onTimeUpdate={this._handleTimeUpdate}
          onEnded={this._handleVideoEnd}
          {...extraVideoElementProps}
        />
      </div>
    )
  }
}

BackgroundVideo.propTypes = {
  playsInline: PropTypes.bool,             // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: PropTypes.bool,  // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
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
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onEnd: PropTypes.func,
  onClick: PropTypes.func,
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
  loop: true,
  autoPlay: true,
  extraVideoElementProps: {},
  startTime: 0,
  onReady: f => f,
  onPlay: f => f,
  onPause: f => f,
  onMute: f => f,
  onUnmute: f => f,
  onTimeUpdate: f => f,
  onEnd: f => f,
  onClick: f => f,
};

export default BackgroundVideo;
