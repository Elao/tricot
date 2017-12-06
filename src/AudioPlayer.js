import React, { Component } from 'react';
import BACKGROUND from '../assets/audio/background.mp3';
import MERRY_CHRISTMAS from '../assets/audio/merry_christmas.mp3';
import Songs from './track';

export default class AudioPlayer extends Component {
  static getBackgroundAudio(source = BACKGROUND) {
    const audio = new Audio(source);

    audio.volume = 0.3;
    audio.loop = true;
    audio.preload = 'auto';

    return audio;
  }

  static getFinalAudio(source = MERRY_CHRISTMAS) {
    const audio = new Audio(source);

    audio.volume = 0.8;
    audio.preload = 'auto';

    return audio;
  }

  static getSongAudio(song) {
    const audio = new Audio(song.audio);

    audio.volume = 0.9;
    audio.preload = 'auto';

    return audio;
  }

  constructor(props) {
    super(props);

    this.state = {
      muted: null,
      authorized: true,
    };

    this.background = this.constructor.getBackgroundAudio();
    this.final = this.constructor.getFinalAudio();
    this.songs = Songs.map(this.constructor.getSongAudio);
    this.audio = new Audio();
    this.song = null;
    this.fadeFrame = null;
    this.songCallback = null;

    this.playSong = this.playSong.bind(this);
    this.playBackground = this.playBackground.bind(this);
    this.toggle = this.toggle.bind(this);
    this.disable = this.disable.bind(this);
    this.end = this.end.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    this.mute(JSON.parse(localStorage.getItem('muted')) || false);
    this.playBackground();
  }

  componentDidUpdate(prevProps, prevState) {
    const { muted, authorized } = this.state;
    const { source } = this.props;

    if (source && (source !== prevProps.source)) {
      this.song = this.songs.find(song => song.src.includes(source));
    }

    if (muted !== prevState.muted) {
      this.audio.muted = muted;

      localStorage.setItem('muted', JSON.stringify(muted));

      if (authorized === false) {
        this.playBackground();
      }
    }
  }

  /**
   * Song's ready to play
   */
  onCanPlayThrough() {
    this.stop();
    this.audio.removeEventListener('canplaythrough', this.onCanPlayThrough);
    this.songCallback();
    this.songCallback = null;
  }

  /**
   * Start the in-game song with the given tempo
   *
   * @param {Number} tempo
   * @param {Number} delay
   * @param {Function} callback
   */
  start(tempo, delay, callback) {
    const { bpm, delay: songDelay } = this.props;

    if (bpm) {
      this.song.playbackRate = (60000 / tempo) / this.props.bpm;

      if (this.song.playbackRate > 1.5) {
        this.song.playbackRate = this.song.playbackRate / 2;
      }

      if (this.song.playbackRate < 0.75) {
        this.song.playbackRate = this.song.playbackRate * 2;
      }
    }

    this.load(this.song);

    this.playSong(() => {
      setTimeout(this.playSong, delay - (songDelay / this.song.playbackRate));
      callback();
    });
  }

  /**
   * Play the main song
   */
  playSong(callback = null) {
    if (typeof callback === 'function') {
      this.songCallback = callback;
      this.audio.addEventListener('canplaythrough', this.onCanPlayThrough);
    }

    this.play();
  }

  /**
   * Play background ambiance
   */
  playBackground() {
    this.audio.removeEventListener('ended', this.playBackground);
    this.play(this.background);
  }

  /**
   * Play finale
   */
  playFinal() {
    this.stop();
    this.audio.addEventListener('ended', this.playBackground);
    this.play(this.final);
  }

  /**
   * Play the given audio
   *
   * @param {Audio} audio
   */
  play(audio = null) {
    if (audio) {
      this.load(audio);
    }

    this.audio.play().then(this.onSuccess).catch(this.onError);
  }

  /**
   * Load the given audio
   *
   * @param {Audio} audio
   */
  load(audio) {
    if (this.audio.src !== audio.src) {
      this.stop();
      this.audio.src = audio.src;
      this.audio.loop = audio.loop;
      this.audio.playbackRate = audio.playbackRate;
      this.audio.volume = audio.volume;
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  /**
   * End
   */
  end() {
    if (this.audio.volume === 1) {
      this.playFinal();
    } else {
      this.fadeOut();
    }
  }

  /**
   * Fade out volume of the current audio
   */
  fadeOut() {
    this.fadeFrame = requestAnimationFrame(this.fadeOut);

    if (this.audio.volume <= 0) {
      cancelAnimationFrame(this.fadeFrame);
      this.fadeFrame = null;
      this.playFinal();
    } else {
      this.audio.volume = Math.max(0, this.audio.volume - 0.05);
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
  onError(error) {
    if (error instanceof DOMException) {
      this.setState({ authorized: null });
    }
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
