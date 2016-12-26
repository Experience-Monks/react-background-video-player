'use strict';
import React, {PropTypes} from 'react';
import {BackgroundCover} from 'background-cover';

class BackgroundVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.container = this.refs.container;
    this.video = this.refs.video;

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
    if (this.props.windowWidth !== nextProps.windowWidth || 
        this.props.windowHeight !== nextProps.windowHeight) {
      this._resize();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true; // add conditions when needed
  }

  _handleVideoReady = () => {
    this.setState({visible: true});
    this._resize();
    this.setCurrentTime(this.props.currentTime);
    this.props.autoPlay && this.play();
    this.props.onReady();
  };

  _resize = () => {
    if (!this.props.disableBackgroundCover) {
      BackgroundCover(this.video, this.container, this.props.horizontalAlign, this.props.verticalAlign);
    }
  };

  _handleTimeUpdate = () => {
    let currentTime = Math.round(this.video.currentTime);
    let duration = Math.round(this.video.duration);
    let progress = currentTime / duration;
    this.props.onTimeUpdate(currentTime, progress, duration);
  };

  _handleVideoEnd = () => {
    this.props.onEnd();
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

  setCurrentTime = (val) => {
    this.video.currentTime = val;
  };

  render() {
    let style = Object.assign({}, {visibility: this.state.visible ? 'visible' : 'hidden'}, this.props.style);
    let className = 'BackgroundVideo';

    return (
      <div
        ref="container"
        className={`${className} ${this.props.className}`}
        style={style}
      >
        <video
          ref="video"
          src={this.props.src}
          poster={this.props.poster}
          preload={this.props.preload}
          muted={this.props.muted}
          loop={this.props.loop}
          onTimeUpdate={this._handleTimeUpdate}
          onEnded={this._handleVideoEnd}
          aria-hidden="true"
          role="presentation"
        />
      </div>
    )
  }
}

BackgroundVideo.propTypes = {
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
  onEnd: PropTypes.func,
};

BackgroundVideo.defaultProps = {
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
  currentTime: 0,
  onReady: f => f,
  onPlay: f => f,
  onPause: f => f,
  onMute: f => f,
  onUnmute: f => f,
  onTimeUpdate: f => f,
  onEnd: f => f,
};

export default BackgroundVideo;