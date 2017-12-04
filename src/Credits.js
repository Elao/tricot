import React, { Component } from 'react';

export default class Credits extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        const { hash } = window.location;

        if (hash === '#credits') {
          this.open();
        }
    }

    open() {
        this.setState({ open: true });
    }

    close() {
        this.setState({ open: false });
    }

    renderButton() {
        return <button className="icon credits" onClick={this.open}></button>;
    }

    render() {
        const { open } = this.state;

        if (!open) {
            return this.renderButton();
        }

        return (
            <div>
                <div className="modal__blur"></div>
                <div className="modal modal--credits">
                    <button className="icon close" onClick={this.close}></button>

                    <p>
                        Knittar Hero est un projet <a href="https://github.com/Elao/tricot" target="_blank" rel="noopener noreferrer">open-source</a> réalisé par <a href="https://elao.com" target="blank">élao</a>.
                    </p>

                    <h3>Contributions</h3>
                    <ul>
                        <li><a href="https://media.giphy.com/media/dxtuC2NQjOIZG/giphy.gif" target="_blank" rel="noopener noreferrer">Amélie</a></li>
                        <li><a href="https://twitter.com/benji__07" target="_blank" rel="noopener noreferrer">Benjamin</a></li>
                        <li><a href="https://twitter.com/chrismeiller" target="_blank" rel="noopener noreferrer">Christophe</a></li>
                        <li><a href="https://twitter.com/tom32i" target="_blank" rel="noopener noreferrer">Thomas</a></li>
                        <li>L&apos;équipe <a href="https://elao.com" target="_blank" rel="noopener noreferrer">élao</a></li>
                    </ul>

                    <h3>Remerciements</h3>
                    <p>
                        L&apos;équipe remercie tout particulièrement <a href="https://www.youtube.com/user/charlieparradelriego">Charlie Parra del Riego</a> qui nous autorise à utiliser plusieurs chansons de son album <a href="https://itunes.apple.com/us/album/merry-heavy-metal-christmas/584478175" target="_blank" rel="noopener noreferrer">Merry Heavy Metal Christmas</a> !
                    </p>

                    <h3>Crédits</h3>

                    <h4>Musiques</h4>
                    <ul>
                        <li><a href="https://charlieparradelriego.bandcamp.com/track/deck-the-halls"><em>Deck the Halls</em> - <strong>Charlie Parra del Riego</strong></a></li>
                        <li><a href="https://charlieparradelriego.bandcamp.com/track/joy-to-the-world"><em>Joy to the World</em> - <strong>Charlie Parra del Riego</strong></a></li>
                        <li><a href="https://charlieparradelriego.bandcamp.com/track/silent-night"><em>Silent Night</em> - <strong>Charlie Parra del Riego</strong></a></li>
                        <li><a href="https://charlieparradelriego.bandcamp.com/track/jingle-bells"><em>Jingle Bells</em> - <strong>Charlie Parra del Riego</strong></a></li>
                    </ul>

                    <h4>Images par <a href="https://www.freepik.com/">freepik.com</a></h4>
                    <ul>
                        <li><a href="https://fr.freepik.com/vecteurs-libre/arriere-plan-de-paysage-enneige-hiver_1424316.htm">Montagnes</a> <small>modifié</small></li>
                        <li><a href="https://fr.freepik.com/vecteurs-libre/collecte-des-echarpes_762124.htm">Pompons</a> <small>modifié</small></li>
                        <li><a href="https://fr.freepik.com/vecteurs-libre/differents-flocons-de-neige_958015.htm">Flocons de neige</a> <small>modifié</small></li>

                    </ul>

                    <h4>Iconographie par <a href="https://thenounproject.com/" target="_blank" rel="noopener noreferrer">the Noun Project</a></h4>
                    <ul>
                        <li><span>Casque</span> - <a href="https://thenounproject.com/Aleksandr_Vector/" target="_blank" rel="noopener noreferrer">Aleksandr Vector</a> <small>modifié</small></li>
                        <li><span>Pelotte</span> - <a href="https://thenounproject.com/symbolon/" target="_blank" rel="noopener noreferrer">Symbolon</a> <small>modifié</small></li>
                        <li><span>Aiguilles</span> - <a href="https://thenounproject.com/gemma.garner/" target="_blank" rel="noopener noreferrer">Gemma Garner</a> <small>modifié</small></li>
                        <li><span>Info</span> - <a href="https://thenounproject.com/razerk/" target="_blank" rel="noopener noreferrer">Alex Auda Samora</a></li>
                        <li><span>Full screen</span> - <a href="https://thenounproject.com/coquet_adrien/" target="_blank" rel="noopener noreferrer">Adrien Coquet</a></li>
                    </ul>

                    <h4>Effets sonores par <a href="https://freesound.org" target="_blank" rel="noopener noreferrer">freesound.org</a></h4>
                    <ul>
                        <li><a href="https://freesound.org/people/Selector/sounds/369506/" target="_blank" rel="noopener noreferrer"><em>Sleigh bells hit</em> - <strong>Selector</strong></a></li>
                        <li><a href="https://freesound.org/people/airmedia/sounds/349855/" target="_blank" rel="noopener noreferrer"><em>Merry Christmas Santa</em> - <strong>AirMedia</strong></a></li>
                        <li><a href="https://freesound.org/people/dobroide/sounds/27816/" target="_blank" rel="noopener noreferrer"><em>Wind.canaveral</em> - <strong>dobroide</strong></a></li>
                        <li><a href="https://freesound.org/people/silencyo/sounds/81800/" target="_blank" rel="noopener noreferrer"><em>Fire in Fireplace Close Up Reverberant</em> - <strong>Silencyo</strong></a></li>
                    </ul>

                    <h4>Technologies</h4>
                    <p><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> &times; HTML5</p>
                </div>
            </div>
        );
    }
}
