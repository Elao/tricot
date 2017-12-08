import React, { Component } from 'react';
import { getSuccessRatio, getLongestStreak } from './utils/StatTool';

export default class End extends Component {
  render() {
    const { answers, ready, replay } = this.props;

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
          <p>Faites appel à une équipe d&apos;experts.</p>
          <div className="modal__buttons">
            <a href="https://elao.com" target="_blank" rel="noopener noreferrer" className="button">Découvrir élao</a>
            <button type="button" className="button button--light" disabled={!ready} onClick={replay}>
              <span className="icon arrow left"></span>
              <span className="icon arrow down"></span>
              <span className="icon arrow right"></span>
              Rejouer
            </button>
          </div>
        </div>
      </div>
    );
  }
}
