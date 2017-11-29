import React, { Component } from 'react';
import Generator from './pattern/Generator';
import ArrowTunel from './ArrowTunel';
import AudioPlayer from './AudioPlayer';
import Fullscreen from './Fullscreen';
import Credits from './Credits';
import Privacy from './Privacy';
import SongSelector from './SongSelector';
import Scarf from './Scarf';
import Help from './Help';
import End from './End';
import * as Key from './game/Key';
import KeyCatcher from './game/KeyCatcher';
import ResetCatcher from './game/ResetCatcher';
import Timer from './game/Timer';
import '../assets/images/elao.svg';
import needleLeft from '../assets/images/needle-left.png';
import needleRight from '../assets/images/needle-right.png';
import stitchFront from '../assets/images/upper-stitch--front.svg';
import stitchBack from '../assets/images/upper-stitch--back.svg';
import Songs from './track';

export default class Tricot extends Component {
  /**
   * Zone when you must presse the key
   *
   * @type {Number}
   */
  static ZONE() { return 0.5; }

  constructor() {
    super();

    this.state = {
      lines: [],
      partition: [],
      answers: [],
      audio: null,
      loop: null,
      bpm: null,
      delay: null,
      tempo: null,
      warmup: null,
      index: null,
      pressed: null,
      ready: true,
    };

    this.modals = {
      credits: null,
      privacy: null,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
    this.validate = this.validate.bind(this);
    this.loadSong = this.loadSong.bind(this);
    this.checkStop = this.checkStop.bind(this);
    this.reset = this.reset.bind(this);

    this.timer = new Timer(this.tick);
    this.keyCatcher = new KeyCatcher(Key, this.validate);
    this.resetCatcher = new ResetCatcher(Key, this.reset);
  }

  /**
   * Load a song
   */
  loadSong(song = Songs[0]) {
    const { audio, loop, bpm, delay, tempo, warmup, duration } = song;

    this.setState({
      audio,
      loop,
      bpm,
      delay,
      tempo,
      warmup,
      duration,
    });
  }

  reset() {
    if (!this.state.ready) {
      return;
    }

    this.resetCatcher.detachEvents();
    this.keyCatcher.attachEvents();

    const { duration, warmup, bpm } = this.state;
    const lines = Generator.generate(Math.round(duration / (60000 / bpm)) - warmup.length);
    const partition = Key.getRandoms(lines.length);

    this.setState({
      lines,
      partition,
      answers: [],
    }, () => setTimeout(this.start, 0));
  }

  /**
   * Start the game
   */
  start() {
    const { ZONE } = this.constructor;
    const { tempo, warmup } = this.state;

    this.setState({ index: -warmup.length });
    this.timer.start(tempo);
    this.audio.start(tempo, tempo * (1 - ZONE() / 2));
  }

  /**
   * FIN DU GAME
   */
  stop() {
    if (this.timer.stop()) {
      this.keyCatcher.detachEvents();
      this.resetCatcher.attachEvents();
      this.timer.stop();
      this.audio.end();
      this.setState({ index: null, ready: false });
      setTimeout(() => this.setState({ ready: true }), 2000);
    }
  }

  /**
   * Validate the answer
   *
   * @param {String} pressed
   * @param {Number} date
   */
  validate(pressed, date = Date.now()) {
    const { partition, index, answers, tempo } = this.state;

    if (index === answers.length) {
      const { ZONE } = this.constructor;
      const ratio = 1 - (this.timer.getTime(date) / tempo);
      const succes = ratio <= ZONE() && pressed === partition[index];

      this.setState({ answers: answers.concat([succes]), pressed });
    } else {
      this.setState({ pressed });
    }
  }

  /**
   * Tick
   */
  tick() {
    const { index, answers } = this.state;
    const state = { index: index + 1 };

    if (index === answers.length) {
      state.answers = answers.concat([false]);
    }

    this.setState(state, this.checkStop);
  }

  checkStop() {
    const { partition, answers } = this.state;

    if (partition.length === answers.length) {
      this.stop();
    }
  }

  /**
   * Get needles animation class
   *
   * @return {String}
   */
  getNeedleClass() {
    const { index, answers } = this.state;

    if (!index) {
      return 'pause';
    }

    const { length } = answers;
    const errorClass = length && answers[length - 1] === false ? 'error' : 'success';

    return `active ${errorClass}`;
  }

  /**
   * Get page title
   *
   * @return {String|null}
   */
  getTitle() {
    const { answers, index, tempo } = this.state;

    if (index === null && answers.length === 0) {
      return <h1>Appuie en rythme sur les touches pour tricoter</h1>;
    }

    if (index < 0) {
      return <h1>Préparez-vous ...</h1>;
    }

    if (index < 4) {
      return <h1 className="fade">C&apos;est parti !</h1>;
    }

    return null;
  }

  render() {
    const { partition, lines, answers, index, pressed, tempo, warmup, audio, loop, bpm, delay, ready } = this.state;
    const { privacy, credits } = this.modals;
    const needleClass = this.getNeedleClass();
    const playing = index !== null;
    const beforeStart = !playing && answers.length === 0;
    const end = !playing && answers.length > 0;

    document.body.className = end ? 'end' : '';

    return (
      <div>
        {this.getTitle(index, answers)}
        {end && <End answers={answers} replay={this.onKey} ready={ready} />}
        <div className="options">
          <SongSelector songs={Songs} disabled={playing} onChange={this.loadSong} />
          {credits && credits.renderButton()}
          <Fullscreen />
          <AudioPlayer source={audio} loop={loop} bpm={bpm} delay={delay} ref={element => this.audio = element} />
        </div>
        <div className="container main-container" ref={this.resetCatcher.setTarget}>
          {!end && <ArrowTunel warmup={warmup} arrows={partition} answers={answers} current={index} tempo={tempo} pressed={pressed} />}
          <div className="knit-container">
            <img src={needleLeft} alt="" className={`needle needle--left ${needleClass}`} />
            <img src={needleRight} alt="" className={`needle needle--right ${needleClass}`} />
            <div className="knit">
              <div className="knit__scarf">
                <img src={stitchFront} alt="" className="upper-stitch upper-stitch--front" />
                <img src={stitchBack} alt="" className="upper-stitch upper-stitch--back" />
                <Scarf tempo={tempo} lines={lines} answers={answers} />
              </div>
            </div>
          </div>
        </div>
        {beforeStart && <Help />}
        <div className="legals">
          {privacy && privacy.renderButton()}
        </div>
        <Privacy ref={modal => this.modals.privacy = modal}/>
        <Credits ref={modal => this.modals.credits = modal}/>
      </div>
    );
  }
}
