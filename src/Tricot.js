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
import SONG, { BPM, DELAY, LOOP } from './track/ChristmasSong'; // 110
//import SONG, { BPM, DELAY, LOOP } from './track/JingleBells'; // 196

export default class Tricot extends Component {
  /**
   * A key every X second
   *
   * @type {Number}
   */
  static TEMPO = 60000 / 110;

  /**
   * Zone when you must presse the key
   *
   * @type {Number}
   */
  static ZONE = 0.5;

  /**
   * Number of measures before song start
   *
   * @type {Number}
   */
  static WARMUP = 4;

  /**
   * Generate a partition of the given length
   *
   * @param {Number} length
   *
   * @return {Array}
   */
  static generatePartition(length = 50) {
    return new Array(length).fill(null).map(value => Key.getRandom());
  }

  constructor() {
    super();

    this.state = {
      partition: [],
      answers: [],
      index: null,
      pressed: null,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
    this.validate = this.validate.bind(this);

    this.timer = new Timer(this.tick);
    this.keyTimeout = null;
  }

  /**
   * Start the game
   */
  start() {
    const { TEMPO, WARMUP, ZONE, generatePartition } = this.constructor;
    const lines = Generator.generate();
    const partition = generatePartition(lines.length);

    this.setState(
      {
        lines,
        partition,
        answers: [],
      },
      () => {
        this.setState({ index: -WARMUP });
        this.timer.start(TEMPO);
        this.audio.start(TEMPO, TEMPO * (1 - ZONE / 2));
      }
    );
  }

  /**
   * FIN DU GAME
   */
  stop() {
    if (this.timer.stop()) {
      this.setState({ index: null });
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
    const { TEMPO, ZONE } = this.constructor;
    const { partition, index, answers } = this.state;

    const state = { pressed: answer };

    if (this.keyTimeout) {
      this.keyTimeout = clearTimeout(this.keyTimeout);
    }

    if (index === answers.length) {
      const ratio = 1 - ((this.timer.getTime(date) % TEMPO) / TEMPO);
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

  /**
   * Get needles animation class
   *
   * @return {String}
   */
  getNeedleClass() {
    const { partition, answers } = this.state;

    if (!partition.length) {
      return 'pause';
    }

    const { length } = answers;
    const errorClass = length && answers[length - 1] === false ? 'error' : 'success';

    return `active ${errorClass}`;
  }

  render() {
    const { TEMPO, WARMUP } = this.constructor;
    const { partition, lines, answers, index, pressed } = this.state;
    const needleClass = this.getNeedleClass();
    const beforeStart = index === null && answers.length === 0;
    const end = index === null && answers.length;

    document.body.className = end ? 'end' : '';

    return (
      <div>
        {beforeStart && <h1>Appuie en rythme sur les touches pour tricoter</h1>}
        {end && <End answers={answers} />}
        <KeyCatcher onKey={partition.length ? this.validate : this.start} keys={Key} />
        <AudioPlayer source={SONG} loop={LOOP} bpm={BPM} delay={DELAY} ref={audio => this.audio = audio} />
        <div className="container main-container">
          {!end && <ArrowTunel warmup={WARMUP} arrows={partition} answers={answers} current={index} tempo={TEMPO} pressed={pressed} />}
          <div>
            <img src={needleLeft} alt="" className={`needle needle--left ${needleClass}`} />
            <img src={needleRight} alt="" className={`needle needle--right ${needleClass}`} />
            <div className="knit">
              <div className="knit__scarf">
                <img src={stitchFront} alt="" className="upper-stitch upper-stitch--front" />
                <img src={stitchBack} alt="" className="upper-stitch upper-stitch--back" />
                {end && <img src={knit} className="knit-tip reverse" alt="" />}
                <Scarf tempo={TEMPO} lines={lines} answers={answers} />
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
