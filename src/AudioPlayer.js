import React, { Component } from 'react';
import BELL from '../assets/audio/bell.mp3';
import FIRE from '../assets/audio/fire.mp3';
import WIND from '../assets/audio/wind.mp3';
import MERRY_CHRISTMAS from '../assets/audio/merry_christmas.mp3';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: null,
    };

    this.bellInterval = null;
    this.songInterval = null;

    this.bells = [new Audio(BELL), new Audio(BELL)/*, new Audio(BELL)*/];
    this.fire = new Audio(FIRE);
    this.wind = new Audio(WIND);
    this.song = new Audio(props.source);
    this.final = new Audio(MERRY_CHRISTMAS);

    this.fire.loop = true;
    this.wind.loop = true;
    this.song.bpm = props.bpm;
    this.song.delay = props.delay;
    this.song.repeatable = props.loop;
    this.bells.delay = 110;

    this.song.volume = 0.8;
    this.bells.forEach(bell => bell.volume = 0.2);
    this.final.volume = 0.8;
    this.fire.volume = 1;
    this.wind.volume = 0.5;

    this.playBell = this.playBell.bind(this);
    this.playSong = this.playSong.bind(this);
    this.toggle = this.toggle.bind(this);
    this.end = this.end.bind(this);
    this.onMute = this.onMute.bind(this);
  }

  componentDidMount() {
    this.mute(JSON.parse(localStorage.getItem('muted')) || false);

    this.fire.play();
    this.wind.play();
  }

  /**
   * Start the in-game song with the given tempo
   *
   * @param {Number} tempo
   * @param {Number} delay
   */
  start(tempo, delay = 0) {
    if (this.bellInterval) {
      return;
    }

    const bellPlaybackRate = (this.bells[0].duration * 1000) / tempo;
    this.bells.forEach(bell => bell.playbackRate = bellPlaybackRate);

    this.song.playbackRate = (60000 / tempo) / this.song.bpm;

    if (this.song.playbackRate < 1) {
      this.song.playbackRate = this.song.playbackRate * 2;
    }

    const songDelay = this.song.delay / this.song.playbackRate;

    if (this.song.repeatable) {
      const songDuration = (this.song.duration / this.song.playbackRate) * 1000;

      setTimeout(
        () => {
          this.test = Date.now();
          this.tempo = tempo;

          this.songInterval = setInterval(this.playSong, Math.ceil(songDuration / tempo) * tempo);
          this.playSong();
        },
        delay - songDelay
      );
    } else {
      setTimeout(this.playSong(), delay - songDelay);
    }

    // Bell interval
    setTimeout(
      () => this.bellInterval = setInterval(this.playBell, tempo),
      delay - this.bells.delay
    );
  }

  playSong() {
    this.song.play();
  }

  /**
   * Play bell
   */
  playBell() {
    let bell = this.bells.find(bell => bell.currentTime === 0 || bell.ended);

    if (!bell) {
      const { volume, playbackRate, muted } = this.bells[0];

      bell = new Audio(BELL);
      bell.volume = volume;
      bell.playbackRate = playbackRate;
      bell.muted = muted;

      this.bells.push(bell);
    }

    bell.play();
  }

  /**
   * End
   */
  end() {
    this.bellInterval = clearInterval(this.bellInterval);
    this.songInterval = clearInterval(this.songInterval);

    this.final.play();
    this.song.pause();
  }

  /**
   * Mute / unmute the audio
   *
   * @param {Boolean} muted
   */
  mute(muted = !this.state.muted) {
    this.setState({ muted }, this.onMute);
  }

  /**
   * On mute changed
   */
  onMute() {
    const { muted } = this.state;

    this.bells.forEach(bell => bell.muted = muted);
    this.fire.muted = muted;
    this.wind.muted = muted;
    this.song.muted = muted;
    this.final.muted = muted;

    localStorage.setItem('muted', JSON.stringify(muted));
  }

  /**
   * Toggle
   */
  toggle() {
    this.mute();
  }

  render() {
    const { muted } = this.state;

    return (<button className={`audio icon ${muted ? 'audio-off' : 'audio-on'}`} onClick={this.toggle} />);
  }
}
