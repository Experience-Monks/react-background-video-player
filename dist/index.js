'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _backgroundCover = require('background-cover');

var _backgroundCover2 = _interopRequireDefault(_backgroundCover);

var _iphoneInlineVideo = require('iphone-inline-video');

var _iphoneInlineVideo2 = _interopRequireDefault(_iphoneInlineVideo);

var _insertRule = require('insert-rule');

var _insertRule2 = _interopRequireDefault(_insertRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iOSNavigator = typeof navigator !== 'undefined' && navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
var iOSVersion = iOSNavigator ? iOSNavigator[1] : null;

var noop = function noop() {};

var absolute100 = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

var BackgroundVideo = function (_React$PureComponent) {
  _inherits(BackgroundVideo, _React$PureComponent);

  function BackgroundVideo(props) {
    _classCallCheck(this, BackgroundVideo);

    var _this = _possibleConstructorReturn(this, (BackgroundVideo.__proto__ || Object.getPrototypeOf(BackgroundVideo)).call(this, props));

    _this._handleVideoReady = function () {
      if (!_this.props.disableBackgroundCover) {
        _this._resize();
      }

      _this.setState({ visible: true });
      _this.props.startTime && _this.setCurrentTime(_this.props.startTime);
      _this.props.autoPlay && _this.play();
      _this.video && _this.props.onReady(_this.video.duration);
    };

    _this._handleOnPlay = function () {
      _this.props.onPlay();
    };

    _this._handleOnPause = function () {
      _this.props.onPause();
    };

    _this._handleTimeUpdate = function () {
      if (!_this.video) return;
      iOSVersion && _this._handleIOSStartTime();
      var currentTime = _this.video.currentTime;
      var duration = _this.video.duration;
      var progress = currentTime / duration;
      _this.props.onTimeUpdate(currentTime, progress, duration);
    };

    _this._handleVideoEnd = function () {
      _this.props.onEnd();
    };

    _this.state = {
      visible: false
    };
    _this.startTimeIsSet = false;
    return _this;
  }

  _createClass(BackgroundVideo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.playsInline && iOSVersion) {
        var hasAudio = !(iOSVersion && iOSVersion < 10 && this.props.autoPlay && this.props.muted); // allow autoplay on iOS < 10 for silent videos
        var requireInteractionOnTablet = false;

        (0, _iphoneInlineVideo2.default)(this.video, hasAudio, requireInteractionOnTablet);
        (0, _insertRule2.default)(['video::-webkit-media-controls-start-playback-button', '.IIV::-webkit-media-controls-play-button'], {
          display: 'none'
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
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if ((this.props.containerWidth !== prevProps.containerWidth || this.props.containerHeight !== prevProps.containerHeight) && !this.props.disableBackgroundCover) {
        this._resize();
      }

      if (this.video && this.props.volume !== prevProps.volume) {
        this.video.volume = this.props.volume;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.video) return;
      this.video.removeEventListener('loadedmetadata', this._handleVideoReady);
      this.video.removeEventListener('play', this._handleOnPlay);
      this.video.removeEventListener('pause', this._handleOnPause);
    }
  }, {
    key: '_resize',
    value: function _resize() {
      this.video && (0, _backgroundCover2.default)(this.video, this.container, this.props.horizontalAlign, this.props.verticalAlign);
    }
  }, {
    key: '_handleIOSStartTime',
    value: function _handleIOSStartTime() {
      if (!this.video) return;
      if (this.video.currentTime < this.props.startTime && !this.startTimeIsSet) {
        this.setCurrentTime(this.props.startTime);
        this.startTimeIsSet = true;
      }
    }
  }, {
    key: 'play',
    value: function play() {
      this.video && this.video.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.video && this.video.pause();
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      if (!this.video) return;
      this.video.paused ? this.play() : this.pause();
    }
  }, {
    key: 'isPaused',
    value: function isPaused() {
      return this.video ? this.video.paused : false;
    }
  }, {
    key: 'mute',
    value: function mute() {
      if (!this.video) return;
      this.video.muted = true;
      this.props.onMute();
    }
  }, {
    key: 'unmute',
    value: function unmute() {
      if (!this.video) return;
      this.video.muted = false;
      this.props.onUnmute();
    }
  }, {
    key: 'toggleMute',
    value: function toggleMute() {
      if (!this.video) return;
      this.video.muted ? this.unmute() : this.mute();
    }
  }, {
    key: 'isMuted',
    value: function isMuted() {
      return this.video ? this.video.muted : false;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(val) {
      if (!this.video) return;
      this.video.currentTime = val;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var visibility = this.state.visible ? 'visible' : 'hidden';

      var videoProps = _extends({
        ref: function ref(v) {
          return _this2.video = v;
        },
        src: typeof this.props.src === 'string' ? this.props.src : null,
        preload: this.props.preload,
        poster: this.props.poster,
        muted: this.props.muted,
        loop: this.props.loop,
        onTimeUpdate: this._handleTimeUpdate,
        onEnded: this._handleVideoEnd
      }, Object.assign(this.props.extraVideoElementProps, {
        playsInline: this.props.playsInline
      }));

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(r) {
            return _this2.container = r;
          },
          className: 'BackgroundVideo ' + this.props.className,
          style: Object.assign(_extends({}, absolute100, { visibility: visibility }), this.props.style),
          onClick: this.props.onClick,
          onKeyPress: this.props.onKeyPress,
          tabIndex: this.props.tabIndex
        },
        _typeof(this.props.src) === 'object' ? _react2.default.createElement(
          'video',
          videoProps,
          this.props.src.map(function (source, key) {
            return _react2.default.createElement('source', _extends({ key: key }, source));
          })
        ) : _react2.default.createElement('video', videoProps)
      );
    }
  }]);

  return BackgroundVideo;
}(_react2.default.PureComponent);

exports.default = BackgroundVideo;


BackgroundVideo.propTypes = {
  playsInline: _propTypes2.default.bool, // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: _propTypes2.default.bool, // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  containerWidth: _propTypes2.default.number,
  containerHeight: _propTypes2.default.number,
  src: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
  poster: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  horizontalAlign: _propTypes2.default.number,
  verticalAlign: _propTypes2.default.number,
  preload: _propTypes2.default.string,
  muted: _propTypes2.default.bool, // required to be set to true for auto play on mobile in combination with 'autoPlay' option
  volume: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  autoPlay: _propTypes2.default.bool,
  extraVideoElementProps: _propTypes2.default.object,
  startTime: _propTypes2.default.number,
  tabIndex: _propTypes2.default.number,
  onReady: _propTypes2.default.func, // passes back `duration`
  onPlay: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onMute: _propTypes2.default.func,
  onUnmute: _propTypes2.default.func,
  onTimeUpdate: _propTypes2.default.func, // passes back `currentTime`, `progress` and `duration`
  onEnd: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func
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
  onKeyPress: noop
};