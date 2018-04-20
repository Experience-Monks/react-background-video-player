import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import TestComponent from  '../index.js';

document.body.style.position = 'absolute';
document.body.style.margin = 0;
document.body.style.width = '100%';
document.body.style.height = '100%';
document.body.style.overflow = 'hidden';

domready(() => {

  class Player extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: undefined,
        isMuted: undefined,
        progress: 0,
        currentTime: 0,
        duration: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      }
    }

    componentDidMount() {
      this.setState({
        isPlaying: !this.player.isPaused,
        isMuted: this.player.isMuted,
      });
      window.addEventListener('resize', this.handleResize);
    }

    componentWillMount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    };

    handleOnPlay = () => {
      this.setState({isPlaying: true});
    };

    handleOnPause = () => {
      this.setState({isPlaying: false});
    };

    handleTimeUpdate = (currentTime, progress, duration) => {
      this.setState({
        progress,
        currentTime,
        duration,
      });
    };

    handleOnMute = () => {
      this.setState({isMuted: true});
    };

    handleOnUnmute = () => {
      this.setState({isMuted: false});
    };

    togglePlay = () => {
      this.player.togglePlay();
    };

    toggleMute = () => {
      this.player.toggleMute();
    };

    render() {
      return (
        <div style={{position: 'absolute', width: ' 100%', height: '100%'}}>
          <TestComponent
            ref={p => this.player = p}
            containerWidth={this.state.windowWidth}
            containerHeight={this.state.windowHeight}
            src={[
				{
					src: 'http://download.blender.org/peach/trailer/trailer_400p.ogg',
					type: 'video/ogg'
				},
				{
					src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
					type: 'video/mp4'
				}
			]}
            poster={'http://il6.picdn.net/shutterstock/videos/3548084/thumb/1.jpg?i10c=img.resize(height:160)'}
            onPlay={this.handleOnPlay}
            onPause={this.handleOnPause}
            onMute={this.handleOnMute}
            onUnmute={this.handleOnUnmute}
            onTimeUpdate={this.handleTimeUpdate}
            autoPlay={false}
            volume={0.5}
          />
          <nav style={{
            position: 'absolute',
            left: 30,
            bottom: 30,
            display: 'flex',
            alignItems: 'center',
          }}>
            <button style={{width: 70}} onClick={this.togglePlay}>
              {this.state.isPlaying ? 'Pause' : 'Play'}
            </button>
            <progress value={this.state.progress}/>
            <button style={{width: 70}} onClick={this.toggleMute}>
              {this.state.isMuted ? 'Unmute' : 'Mute'}
            </button>
            <time>{this.state.currentTime} / {this.state.duration}</time>
          </nav>
        </div>
      )
    }
  }

  ReactDOM.render(<Player/>, document.body);
});
