import React, { Component } from 'react';
import Generator from './pattern/Generator';
import { spacer, line, sin, largeSin } from './pattern/simple';
import ArrowTunel from './ArrowTunel';
import KeyCatcher from './KeyCatcher';
import AudioPlayer from './AudioPlayer';
import Fullscreen from './Fullscreen';
import Credits from './Credits';
import SongSelector from './SongSelector';
import Scarf from './Scarf';
import Help from './Help';
import End from './End';
import Key from './game/Key';
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
  static ZONE = 0.5;

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
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
    this.validate = this.validate.bind(this);
    this.loadSong = this.loadSong.bind(this);
    this.onKey = this.onKey.bind(this);

    this.timer = new Timer(this.tick);
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
    const { duration, warmup, tempo, bpm } = this.state;
    const lines = Generator.generate(Math.round(duration / (60000 / bpm)) - warmup.length);
    const partition = Key.getRandoms(lines.length);

    this.setState({
      lines,
      partition,
      answers: [],
    }, this.start);
  }

  componentDidMount() {
    const { hash } = window.location;

    if (hash) {
      const { lines, answers } = Generator.load(decodeURIComponent(hash.slice(1)));

      this.setState({ lines, answers });
    }
  }

  /**
   * Start the game
   */
  start() {
    const { ZONE } = this.constructor;
    const { tempo, warmup } = this.state;

    this.setState({ index: -warmup.length });
    this.timer.start(tempo);
    this.audio.start(tempo, tempo * (1 - ZONE / 2));
  }

  /**
   * FIN DU GAME
   */
  stop() {
    if (this.timer.stop()) {
      this.setState({ index: null });

      this.timer.stop();
      this.audio.end();
    }
  }

  /**
   * Validate the answer
   *
   * @param {String} answer
   * @param {Number} date
   */
  validate(answer, date = Date.now()) {
    const { ZONE } = this.constructor;
    const { partition, index, answers, tempo } = this.state;

    if (index === answers.length) {
      const ratio = 1 - ((this.timer.getTime(date) % tempo) / tempo);
      const succes = ratio <= ZONE && answer === partition[index];

      this.setState({ answers: answers.concat([succes]) });
    }
  }

  /**
   * Tick
   */
  tick(duration) {
    const { partition, index, answers } = this.state;

    if (partition.length === answers.length) {
      return this.stop();
    }

    const state = { index: index + 1 };

    if (index === answers.length) {
      state.answers = answers.concat([false]);
    }

    this.setState(state);
  }

  onKey(pressed) {
    if (pressed !== null) {
      if (this.state.index !== null) {
        this.validate(pressed);
      } else {
        this.reset();
      }
    }

    this.setState({ pressed });
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

  getLink() {
    const { lines, answers } = this.state;
    const hash = Generator.export(lines, answers);

    return `${window.origin}/#${encodeURIComponent(hash)}`;
  }

  render() {
    const { partition, lines, answers, index, pressed, tempo, warmup, audio, loop, bpm, delay } = this.state;
    const needleClass = this.getNeedleClass();
    const playing = index !== null;
    const beforeStart = !playing && answers.length === 0;
    const end = !playing && answers.length > 0;

    document.body.className = end ? 'end' : '';

    return (
      <div>
        {beforeStart && <h1>Appuie en rythme sur les touches pour tricoter</h1>}
        {end && <End answers={answers} replay={this.onKey} link={this.getLink()} />}
        <KeyCatcher onKey={this.onKey} keys={Key} />
        <div className="options">
          <SongSelector songs={Songs} disabled={playing} onChange={this.loadSong} />
          <Credits />
          <Fullscreen />
          <AudioPlayer source={audio} loop={loop} bpm={bpm} delay={delay} ref={element => this.audio = element} />
        </div>
        <div className="container main-container">
          {!end && <ArrowTunel warmup={warmup} arrows={partition} answers={answers} current={index} tempo={tempo} pressed={pressed} />}
          <div>
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
      </div>
    );
  }
}
