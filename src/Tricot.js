import React, { Component } from 'react';
import Generator from './pattern/Generator';
import { spacer, line, sin, largeSin } from './pattern/simple';
import ArrowTunel from './ArrowTunel';
import KeyCatcher from './KeyCatcher';
import AudioPlayer from './AudioPlayer';
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
import knit from '../assets/images/knit.svg';
import * as ChristmasSong from './track/ChristmasSong';
import * as JingleBells from './track/JingleBells';

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
    this.onKey = this.onKey.bind(this);

    this.timer = new Timer(this.tick);
    this.keyTimeout = null;
  }

  componentDidMount() {
    this.loadSong();
  }

  /**
   * Load a song
   */
  loadSong(song = ChristmasSong) {
    const { audio, loop, bpm, delay, tempo, warmup } = song;

    this.setState({
      audio,
      loop,
      bpm,
      delay,
      tempo,
      warmup,
    });
  }

  reset() {
    const lines = Generator.generate();
    const partition = Key.getRandoms(lines.length);

    this.setState({
      lines,
      partition,
      answers: [],
    }, this.start);
  }

  /**
   * Start the game
   */
  start() {
    const { ZONE } = this.constructor;
    const { tempo, warmup } = this.state;

    this.setState({ index: -warmup });
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
    const state = { pressed: answer };

    if (this.keyTimeout) {
      this.keyTimeout = clearTimeout(this.keyTimeout);
    }

    if (index === answers.length) {
      const ratio = 1 - ((this.timer.getTime(date) % tempo) / tempo);
      const succes = ratio <= ZONE && answer === partition[index];

      state.answers = answers.concat([succes]);
    }

    this.setState(state, () => setTimeout(() => this.setState({ pressed: false }), 300));
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

  onKey() {
    this.reset();
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

  render() {
    const { partition, lines, answers, index, pressed, tempo, warmup, audio, loop, bpm, delay } = this.state;
    const needleClass = this.getNeedleClass();
    const playing = index !== null;
    const beforeStart = !playing && !answers.length;
    const end = !playing && answers.length;

    document.body.className = end ? 'end' : '';

    return (
      <div>
        {beforeStart && <h1>Appuie en rythme sur les touches pour tricoter</h1>}
        {end && <End answers={answers} replay={this.onKey} />}
        <KeyCatcher onKey={playing ? this.validate : this.onKey} keys={Key} />
        <AudioPlayer source={audio} loop={loop} bpm={bpm} delay={delay} ref={element => this.audio = element} />
        <div className="container main-container">
          {!end && <ArrowTunel warmup={warmup} arrows={partition} answers={answers} current={index} tempo={tempo} pressed={pressed} />}
          <div>
            <img src={needleLeft} alt="" className={`needle needle--left ${needleClass}`} />
            <img src={needleRight} alt="" className={`needle needle--right ${needleClass}`} />
            <div className="knit">
              <div className="knit__scarf">
                <img src={stitchFront} alt="" className="upper-stitch upper-stitch--front" />
                <img src={stitchBack} alt="" className="upper-stitch upper-stitch--back" />
                {end && <img src={knit} className="knit-tip reverse" alt="" />}
                <Scarf tempo={tempo} lines={lines} answers={answers} />
                <img src={knit} className="knit-tip" alt="" />
              </div>
            </div>
          </div>
        </div>
        {!lines && <Help />}
      </div>
    );
  }
}
