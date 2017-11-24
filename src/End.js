import React, { Component } from 'react';
import { getSuccessRatio, getLongestStreak } from './utils/StatTool';

export default class End extends Component {
  render() {
    const { answers } = this.props;

    return (
      <div className="end">
        <div className="end__title">
          <span className="icon wool"></span>
          <h3>Bravo !</h3>
        </div>
        <div className="modal modal--end">
          <div className="statistics">
            <dl>
              <dd>Score :</dd>
              <dt>{getSuccessRatio(answers, 100).toFixed(2).replace(/\.?0*$/, '')}%</dt>
            </dl>
            <dl>
              <dd>Plus longue série :</dd>
              <dt>{getLongestStreak(answers)}</dt>
            </dl>
          </div>
          <p>Un projet web à tricoter ?</p>
          <p>Faites appel à une équipe d'experts.</p>
          <div className="modal__buttons">
            <a href="https://elao.com" target="_blank" className="button">Découvrir élao</a>
            <button className="button button--light" onClick={this.props.replay}>
              <span className="icon arrow down"></span>
              Rejouer
            </button>
          </div>
        </div>
      </div>
    );
  }
}
