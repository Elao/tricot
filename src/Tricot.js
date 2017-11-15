import React, { Component } from 'react';
import ArrowTunel from './ArrowTunel';
import Key from './game/Key';
import Game from './game/Game';

export default class Tricot extends Component {
  constructor() {
    super();

    this.onTick = this.onTick.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);

    this.game = new Game(this.onTick, this.onSuccess, this.onError);
    this.state = {
      arrows: this.game.partition.map(arrow => Key.readableFor(arrow)),
      answer: null,
    };
  }

  onTick() {
    this.setState({ answer: null });
  }

  onSuccess() {
    this.setState({ answer: true });
  }

  onError() {
    this.setState({ answer: false });
  }

  componentDidMount() {
    console.log('start');
    this.game.start();
  }

  render() {
    const { arrows, answer } = this.state;
    const needleClass = answer === false ? 'error' : '';

    return (
      <div>
        <ArrowTunel arrows={arrows} />
        <div className="container">
          <img src="images/needle-left.png" alt="" className={`needle needle--left ${needleClass}`} />
          <img src="images/needle-right.png" alt="" className={`needle needle--right ${needleClass}`} />
          <div className="knit">
            <div className="knit__scarf">
              <img src="images/upper-stitch--front.svg" alt="" className="upper-stitch upper-stitch--front" />
              <img src="images/upper-stitch--back.svg" alt="" className="upper-stitch upper-stitch--back" />
              <img src="images/knit.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="rules">
          Appuie en rythme sur les touches pour tricoter
        </div>
      </div>
    );
  }
}
