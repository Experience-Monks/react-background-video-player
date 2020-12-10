import React from 'react';
import PropTypes from 'prop-types';

import BackgroundCover from 'background-cover';
import playInlineVideo from 'iphone-inline-video';
import insertRule from 'insert-rule';

const iOSNavigator = typeof navigator !== 'undefined' && navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
const iOSVersion = iOSNavigator ? iOSNavigator[1] : null;

const noop = () => {};

const absolute100 = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

export default class BackgroundVideo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.startTimeIsSet = false;
  }

  componentDidMount() {
    if (this.props.playsInline && iOSVersion) {
      const hasAudio = !(iOSVersion && iOSVersion < 10 && this.props.autoPlay && this.props.muted); // allow autoplay on iOS < 10 for silent videos
      const requireInteractionOnTablet = false;

      playInlineVideo(this.video, hasAudio, requireInteractionOnTablet);
      insertRule(['video::-webkit-media-controls-start-playback-button', '.IIV::-webkit-media-controls-play-button'], {
        display: 'none',
      });
    }

    if (this.video) {
      if (this.video.readyState !== 4) {
        this.video.addEventListener('loadedmetadata', this._handleVideoReady);
      } else {
        this._handleVideoReady();
      }

      this.video.addEventListener('play', this._handleOnPlay);
      this.video.addEventListener('pause', this._handleOnPause);
      this.video.volume = this.props.volume;
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.containerWidth !== prevProps.containerWidth ||
        this.props.containerHeight !== prevProps.containerHeight) &&
      !this.props.disableBackgroundCover
    ) {
      this._resize();
    }

    if (this.video && this.props.volume !== prevProps.volume) {
      this.video.volume = this.props.volume;
    }
  }

  componentWillUnmount() {
    if (!this.video) return;
    this.video.removeEventListener('loadedmetadata', this._handleVideoReady);
    this.video.removeEventListener('play', this._handleOnPlay);
    this.video.removeEventListener('pause', this._handleOnPause);
  }

  _handleVideoReady = () => {
    if (!this.props.disableBackgroundCover) {
      this._resize();
    }

    this.setState({ visible: true });
    this.props.startTime && this.setCurrentTime(this.props.startTime);
    this.props.autoPlay && this.play();
    this.video && this.props.onReady(this.video.duration);
  };

  _resize() {
    this.video && BackgroundCover(this.video, this.container, this.props.horizontalAlign, this.props.verticalAlign);
  }

  _handleOnPlay = () => {
    this.props.onPlay();
  };

  _handleOnPause = () => {
    this.props.onPause();
  };

  _handleTimeUpdate = () => {
    if (!this.video) return;
    iOSVersion && this._handleIOSStartTime();
    const currentTime = this.video.currentTime;
    const duration = this.video.duration;
    const progress = currentTime / duration;
    this.props.onTimeUpdate(currentTime, progress, duration);
  };

  _handleVideoEnd = () => {
    this.props.onEnd();
  };

  _handleIOSStartTime() {
    if (!this.video) return;
    if (this.video.currentTime < this.props.startTime && !this.startTimeIsSet) {
      this.setCurrentTime(this.props.startTime);
      this.startTimeIsSet = true;
    }
  }

  play() {
    this.video && this.video.play();
  }

  pause() {
    this.video && this.video.pause();
  }

  togglePlay() {
    if (!this.video) return;
    this.video.paused ? this.play() : this.pause();
  }

  isPaused() {
    return this.video ? this.video.paused : false;
  }

  mute() {
    if (!this.video) return;
    this.video.muted = true;
    this.props.onMute();
  }

  unmute() {
    if (!this.video) return;
    this.video.muted = false;
    this.props.onUnmute();
  }

  toggleMute() {
    if (!this.video) return;
    this.video.muted ? this.unmute() : this.mute();
  }

  isMuted() {
    return this.video ? this.video.muted : false;
  }

  setCurrentTime(val) {
    if (!this.video) return;
    this.video.currentTime = val;
  }

  render() {
    const visibility = this.state.visible ? 'visible' : 'hidden';

    const videoProps = {
      ref: (v) => (this.video = v),
      src: typeof this.props.src === 'string' ? this.props.src : null,
      preload: this.props.preload,
      poster: this.props.poster,
      muted: this.props.muted,
      loop: this.props.loop,
      onTimeUpdate: this._handleTimeUpdate,
      onEnded: this._handleVideoEnd,
      ...Object.assign(this.props.extraVideoElementProps, {
        playsInline: this.props.playsInline,
      }),
    };

    return (
      <div
        ref={(r) => (this.container = r)}
        className={`BackgroundVideo ${this.props.className}`}
        style={Object.assign({ ...absolute100, visibility }, this.props.style)}
        onClick={this.props.onClick}
        onKeyPress={this.props.onKeyPress}
        tabIndex={this.props.tabIndex}
      >
        {typeof this.props.src === 'object' ? (
          <video {...videoProps}>
            {this.props.src.map((source, key) => (
              <source key={key} {...source} />
            ))}
          </video>
        ) : (
          <video {...videoProps} />
        )}
      </div>
    );
  }
}

BackgroundVideo.propTypes = {
  playsInline: PropTypes.bool, // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: PropTypes.bool, // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
  style: PropTypes.object,
  className: PropTypes.string,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  poster: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontalAlign: PropTypes.number,
  verticalAlign: PropTypes.number,
  preload: PropTypes.string,
  muted: PropTypes.bool, // required to be set to true for auto play on mobile in combination with 'autoPlay' option
  volume: PropTypes.number,
  loop: PropTypes.bool,
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
  onKeyPress: PropTypes.func,
};

BackgroundVideo.defaultProps = {
  playsInline: true,
  disableBackgroundCover: false,
  style: {},
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
  onReady: noop,
  onPlay: noop,
  onPause: noop,
  onMute: noop,
  onUnmute: noop,
  onTimeUpdate: noop,
  onEnd: noop,
  onClick: noop,
  onKeyPress: noop,
};
