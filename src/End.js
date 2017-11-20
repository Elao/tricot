import React, { Component } from 'react';
import { getSuccessRatio, getLongestStreak } from './utils/StatTool';

export default class End extends Component {
  render() {
    const { answers } = this.props;

    return (
      <div className="end-panel">
        <h3>Bravo !</h3>
        <dl className="stats">
            <dd>Score :</dd><dt>{getSuccessRatio(answers, 100).toPrecision(2)}%</dt>
            <dd>Plus longue série :</dd><dt>{getLongestStreak(answers)}</dt>
        </dl>
        <p>Un projet web à tricoter ? Faite appel à une équipe d'expert, <a href="mailto: contact@elao.com">contactez élao</a>.</p>
        <p>Appuie sur <strong>↑</strong> pour rejouer.</p>
      </div>
    );
  }
}
