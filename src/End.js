import React, { Component } from 'react';
import { getSuccessRatio, getLongestStreak } from './utils/StatTool';

export default class End extends Component {
  render() {
    const { answers } = this.props;

    return (
      <div className="end-panel">
        <div className="end-panel__title">
          <span className="icon wool"></span>
          <h3>Bravo !</h3>
        </div>
        <div className="end-panel__card">
          <div className="end-panel__statistics">
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
          <div className="end-panel__buttons">
            <a href="mailto: contact@elao.com" className="button">Contactez élao</a>
            <button className="button button--light">
              <span className="arrow up"></span>
              Rejouer
            </button>
          </div>
        </div>
      </div>
    );
  }
}
