import React, { Component } from 'react';

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
    this.select(JSON.parse(localStorage.getItem('song')) || 0);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  select(checked = 0) {
    this.setState({ checked, open: false });
    this.props.onChange(this.props.songs[checked]);
    localStorage.setItem('song', JSON.stringify(checked));
  }

  onChange(event) {
    this.select(parseInt(event.target.value, 10) || 0);
  }

  renderSong(song, index) {
    const { disabled } = this.props;
    const { open, checked } = this.state;
    const { title } = song;
    const id = title.split(' ').join('').toLowerCase();
    const difficulty = index + 1;
    const selected = index === checked;
    const closed = disabled || !open;

    if (closed && !selected) {
      return null;
    }

    const label = (
      <span className="song__title">
        {title}
        <span className={`icon difficulty difficulty--${difficulty}`}></span>
      </span>
    );

    if (closed) {
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
          disabled={closed}
          onChange={this.onChange}
        />
        {label}
      </label>
    );
  }

  renderWidget(content) {
    return ;
  }

  render() {
    const { checked, open } = this.state;
    const { songs, disabled } = this.props;
    const closed = disabled || !open;
    const openClass = closed ? 'closed' : 'open';

    return (
      <div name="song-selector" className={`song-selector ${openClass}`} onClick={closed ? this.toggle : undefined}>
        <div className="song-selector__list">{songs.map(this.renderSong)}</div>
        <button type="button" className={`song-selector__button icon select-${openClass}`} onClick={this.toggle}></button>
      </div>
    );
  }
}