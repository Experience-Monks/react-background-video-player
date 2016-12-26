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

  componentWillMount() {

  }

  componentDidMount() {
    this.container = this.refs.container;
    this.video = this.refs.video;

    if (this.video.readyState !== 4) {
      this.video.addEventListener('loadedmetadata', this.handleVideoReady);
    } else {
      this.handleVideoReady();
    }

    this.video.addEventListener('play', this.props.onPlay);
    this.video.addEventListener('pause', this.props.onPause);
  }

  componentWillAppear(done) {
    this.animateIn(done);
  }

  componentWillEnter(done) {
    this.animateIn(done);
  }

  componentWillLeave(done) {
    this.animateOut(done);
  }

  componentWillUnmount() {
    this.video.removeEventListener('loadedmetadata', this.handleVideoReady);
    this.video.removeEventListener('play', this.props.onPlay);
    this.video.removeEventListener('pause', this.props.onPause);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.windowWidth !== nextProps.windowWidth || this.props.windowHeight !== nextProps.windowHeight) {
      this.resize();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true; // add conditions when needed
  }

  animateIn = (done) => {
    done && done();
  };

  animateOut = (done) => {
    done && done();
  };

  togglePlay = () => {
    this.video.paused ? this.video.play() : this.video.pause();
  };

  setCurrentTime = (val) => {
    this.video.currentTime = val;
  };

  toggleMute = () => {
    this.video.muted = !this.video.muted;
    this.video.muted ? this.props.onMute() : this.props.onUnmute();
  };

  resize = () => {
    BackgroundCover(this.video, this.container, this.props.horizontalAlign, this.props.verticalAlign);
  };

  handleVideoEnd = () => {
    this.props.onEnd();
  };

  handleTimeUpdate = () => {
    let currentTime = Math.round(this.video.currentTime);
    let duration = Math.round(this.video.duration);
    let progress = currentTime / duration;
    this.props.onTimeUpdate(currentTime, progress, duration);
  };

  handleVideoReady = () => {
    this.setState({visible: true});
    this.resize();
    this.props.autoPlay && this.video.play();
    this.props.onReady();
  };

  render() {
    //console.log('render BackgroundVideo');

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
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleVideoEnd}
          aria-hidden="true"
          role="presentation"
        />
      </div>
    )
  }
}

BackgroundVideo.propTypes = {
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
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onEnd: PropTypes.func,
};

BackgroundVideo.defaultProps = {
  style: {
    width: '100%',
    height: '100%',
  },
  className: '',
  horizontalAlign: 0.5,
  verticalAlign: 0.5,
  preload: 'auto',
  muted: false,
  loop: true,
  autoPlay: true,
  poster: '',
  onReady: f => f,
  onPlay: f => f,
  onPause: f => f,
  onMute: f => f,
  onUnmute: f => f,
  onTimeUpdate: f => f,
  onEnd: f => f,
};

export default BackgroundVideo;