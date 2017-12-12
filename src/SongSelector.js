import React, { Component } from 'react';
import * as Memory from './utils/Memory';

export default class SongSelector extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      checked: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.renderSong = this.renderSong.bind(this);
  }

  componentDidMount() {
    this.select(Memory.getSong());
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  select(checked = 0, callback = null) {
    this.setState({ checked, open: false });
    this.props.onChange(this.props.songs[checked], callback);
    Memory.setSong(checked);
  }

  onChange(event) {
    this.select(parseInt(event.target.value, 10) || 0);
  }

  renderSong(song, index) {
    const { open, checked } = this.state;
    const { title } = song;
    const id = title.split(' ').join('').toLowerCase();
    const difficulty = index + 1;
    const selected = index === checked;

    if (!open && !selected) {
      return null;
    }

    const label = (
      <span className="song__title">
        {title}
        <span className={`icon difficulty difficulty--${difficulty}`}></span>
      </span>
    );

    if (!open) {
      return <p key={id} className={`song ${selected}`}>{label}</p>;
    }

    return (
      <label key={id} htmlFor={id} className={`song ${selected}`}>
        <input
          type="radio"
          name="song-selector"
          id={id}
          value={index}
          checked={index === checked}
          disabled={!open}
          onChange={this.onChange}
        />
        {label}
      </label>
    );
  }

  render() {
    const { open } = this.state;
    const { songs } = this.props;
    const openClass = open ? 'open' : 'closed';

    return (
      <div name="song-selector" className={`song-selector ${openClass}`} onClick={open ? undefined : this.toggle}>
        <div className="song-selector__list">{songs.map(this.renderSong)}</div>
        <button type="button" className={`song-selector__button icon select-${openClass}`} onClick={this.toggle}></button>
      </div>
    );
  }
}
