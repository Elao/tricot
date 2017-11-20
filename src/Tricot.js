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

export default class Tricot extends Component {
  /**
   * A key every X second
   *
   * @type {Number}
   */
  static TEMPO = 600;

  /**
   * Zone when you must presse the key
   *
   * @type {Number}
   */
  static ZONE = 0.5;

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
      partition: null,
      answers: null,
      index: null,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
    this.validate = this.validate.bind(this);

    this.timer = new Timer(this.tick);
  }

  /**
   * Start the game
   */
  start() {
    const { TEMPO, ZONE, generatePartition } = this.constructor;
    const lines = Generator.generate();
    const partition = generatePartition(lines.length);

    this.setState(
      {
        lines,
        partition,
        answers: [],
        index: -1,
      },
      () => {
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
      this.setState({
        partition: null,
        answer: null,
        index: null,
      }, this.audio.end);
    }
  }

  /**
   * Add a line to the scarf
   *
   * @param {Boolean} succes
   */
  completeScarf(succes = true) {
    const { index, lines, answers } = this.state;
    const line = lines[index];

    this.scarf.append(succes ? line : Generator.messUp(line));
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

    if (index === answers.length) {
      const ratio = 1 - ((this.timer.getTime(date) % TEMPO) / TEMPO);
      const succes = ratio <= ZONE && answer === partition[index];

      this.setState({ answers: [...answers, succes] });
      this.completeScarf(succes);
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
      state.answers = [...answers, false];
      this.completeScarf(false);
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

    if (!partition) {
      return 'pause';
    }

    const errorClass = answers && answers[answers.length - 1] === false ? 'error' : 'success';

    return `active ${errorClass}`;
  }

  render() {
    const { TEMPO } = this.constructor;
    const { partition, lines, answers, index } = this.state;
    const needleClass = this.getNeedleClass();
    const end = !partition && answers && answers.length;

    return (
      <div>
        {partition && <ArrowTunel arrows={partition} answers={answers} current={index} tempo={TEMPO} />}
        {end && <End />}
        <KeyCatcher onKey={partition ? this.validate : this.start} keys={Key} />
        <AudioPlayer ref={audio => this.audio = audio} />
        <div className={`container ${end ? 'end' : ''}`}>
          <img src="images/needle-left.png" alt="" className={`needle needle--left ${needleClass}`} />
          <img src="images/needle-right.png" alt="" className={`needle needle--right ${needleClass}`} />
          <div className="knit">
            <div className="knit__scarf">
              <img src="images/upper-stitch--front.svg" alt="" className="upper-stitch upper-stitch--front" />
              <img src="images/upper-stitch--back.svg" alt="" className="upper-stitch upper-stitch--back" />
              {end && <img src="images/knit.svg" className="knit-tip reverse" alt="" />}
              <Scarf ref={scarf => this.scarf = scarf}/>
              <img src="images/knit.svg" className="knit-tip" alt="" />
            </div>
          </div>
        </div>
        {!lines && <Help />}
      </div>
    );
  }
}
