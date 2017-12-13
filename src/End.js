import React, { Component } from 'react';
import { getSuccessRatio, getLongestStreak, countSuccess, countError } from './utils/StatTool';

export default class End extends Component {
  getTitle() {
    if (this.props.shared) {
      return 'Record à battre ...';
    }

    return 'Bravo !';
  }

  getReplayLabel() {
    if (this.props.shared) {
      return 'Battre le record !';
    }

    if (this.props.next) {
      return 'Niveau suivant !';
    }

    return 'Rejouer !';
  }

  renderShare() {
    const { getLink, link, shared } = this.props;

    if (shared) {
      return null;
    }

    if (link) {
      return <p className="share share--link">
          <span className="icon link"></span>
          <a href={link} target="_blank">{link}</a>
      </p>;
    }

    return <button type="button" className="share share--button" onClick={getLink}>
      <span className="icon link"></span>
      Partager mon e-charpe
    </button>;
  }

  renderSong() {
    const { song } = this.props;

    if (!song) {
      return null;
    }

    return <p className="song">
      {song.title}
      <span className={`icon difficulty difficulty--${song.difficulty}`}></span>
    </p>;
  }

  render() {
    const { answers, ready, replay } = this.props;

    return (
      <div className="end">
        <div className="end__title">
          <span className="icon wool"></span>
          <h3>{this.getTitle()}</h3>
        </div>
        <div className="modal modal--end">
          <div className="statistics-container">
            <div className="statistics statistics--score">
              <dl>
                <dd>Score :</dd>
                <dt>{getSuccessRatio(answers, 100).toFixed(2).replace(/\.?0*$/, '')}%</dt>
              </dl>
              {this.renderSong()}
              {this.renderShare()}
            </div>
            <div className="statistics statistics--details">
              <dl>
                <dd>Plus longue série :</dd>
                <dt>{getLongestStreak(answers)}</dt>
              </dl>
              <dl>
                <dd>Mailles ratées :</dd>
                <dt>{countError(answers)}</dt>
              </dl>
              <dl>
                <dd>Mailles réussies :</dd>
                <dt>{countSuccess(answers)}</dt>
              </dl>
            </div>
          </div>
          <p>Un projet web à tricoter ?</p>
          <p>Faites appel à une équipe d&apos;experts.</p>
          <div className="modal__buttons">
            <a href="https://elao.com" target="_blank" rel="noopener noreferrer" className="button">Découvrir élao</a>
            <button type="button" className="button button--light" disabled={!ready} onClick={replay}>
              <span className="icon arrow left"></span>
              <span className="icon arrow down"></span>
              <span className="icon arrow right"></span>
              {this.getReplayLabel()}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
