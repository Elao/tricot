import React, { Component } from 'react';
import BACKGROUND from '../assets/audio/background.mp3';
import MERRY_CHRISTMAS from '../assets/audio/merry_christmas.mp3';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: null,
      authorized: true,
    };

    this.fadeFrame = null;

    this.background = new Audio(BACKGROUND);
    this.song = new Audio();
    this.final = new Audio(MERRY_CHRISTMAS);

    this.background.loop = true;

    this.song.volume = 1;
    this.final.volume = 0.8;
    this.background.volume = 0.3;

    this.playSong = this.playSong.bind(this);
    this.playBackground = this.playBackground.bind(this);
    this.toggle = this.toggle.bind(this);
    this.disable = this.disable.bind(this);
    this.end = this.end.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);

    this.final.addEventListener('ended', this.playBackground);
  }

  componentDidMount() {
    this.mute(JSON.parse(localStorage.getItem('muted')) || false);
    this.playBackground();
  }

  componentDidUpdate(prevProps, prevState) {
    const { muted, authorized } = this.state;
    const { source } = this.props;

    if (source && (source !== prevProps.source)) {
      this.song.src = source;
    }

    if (muted !== prevState.muted) {
      this.background.muted = muted;
      this.song.muted = muted;
      this.final.muted = muted;

      localStorage.setItem('muted', JSON.stringify(muted));

      if (authorized === false) {
        this.playBackground();
      }
    }
  }

  /**
   * Start the in-game song with the given tempo
   *
   * @param {Number} tempo
   * @param {Number} delay
   */
  start(tempo, delay = 0) {
    this.stopBackground();

    this.song.playbackRate = (60000 / tempo) / this.props.bpm;

    if (this.song.playbackRate > 1.5) {
      this.song.playbackRate = this.song.playbackRate / 2;
    }

    if (this.song.playbackRate < 0.75) {
      this.song.playbackRate = this.song.playbackRate * 2;
    }

    setTimeout(this.playSong, delay - (this.props.delay / this.song.playbackRate));
  }

  /**
   * Play the main song
   */
  playSong() {
    this.song.play();
  }

  /**
   * Play background ambiance
   */
  playBackground() {
    this.background.play().then(this.onSuccess).catch(this.onError);
  }

  /**
   * Stop playing background ambiance
   */
  stopBackground() {
    this.background.pause();
    this.background.currentTime = 0;
  }

  /**
   * End
   */
  end() {
    this.fadeOut();
  }

  /**
   * Fade out volume of the song
   */
  fadeOut() {
    this.fadeFrame = requestAnimationFrame(this.fadeOut);

    if (this.song.volume <= 0) {
      cancelAnimationFrame(this.fadeFrame);
      this.fadeFrame = null;
      this.song.pause();
      this.song.currentTime = 0;
      this.song.volume = 1;
      this.final.play();
    } else {
      this.song.volume = Math.max(0, this.song.volume - 0.05);
    }
  }

  /**
   * Mute / unmute the audio
   *
   * @param {Boolean} muted
   */
  mute(muted = !this.state.muted) {
    this.setState({ muted });
  }

  /**
   * Audio API authorized
   */
  onSuccess() {
    this.setState({ authorized: true });
  }

  /**
   * Audio API not authorized
   */
  onError() {
    this.setState({ authorized: null });
  }

  /**
   * Don't authorize audio
   */
  disable() {
    this.setState({ authorized: false, muted: true });
  }

  /**
   * Toggle sound
   */
  toggle() {
    this.mute();
  }

  render() {
    const { muted, authorized } = this.state;

    if (authorized === null) {
      return (
        <div>
          <div className="modal__blur" />
          <div className="modal modal--audio">
            <h2>
              <span className="icon audio-on"></span>
              Autoriser le son ?
            </h2>
            <p>Knittar Hero a besoin de votre autorisation pour jouer de la musique sur cet appareil.</p>
            <div className="modal__buttons">
              <button className="button button--light" onClick={this.disable}>
                Annuler
              </button>
              <button className="button" onClick={this.playBackground}>
                Autoriser
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (<button className={`audio icon ${muted ? 'audio-off' : 'audio-on'}`} onClick={this.toggle} />);
  }
}
