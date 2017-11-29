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
                    <h3>Open-source</h3>
                    <ul>
                        <li>Licence MIT</li>
                        <li><a href="https://github.com/Elao/tricot">Sources du projet</a></li>
                    </ul>

                    <h3>Contributions</h3>
                    <ul>
                        <li>Amélie</li>
                        <li>Benjamin</li>
                        <li>Christophe</li>
                        <li>Thomas</li>
                        <li>L'équipe <a href="https://elao.com">élao</a></li>
                    </ul>
                    <h3>Remerciements</h3>
                    <p>L'équipe remercie tout particulièrement <a href="https://www.youtube.com/channel/UCdrKuOS3tBgI-kwq-QPkGtw">Charlie Parra del Riego</a> qui nous a gentillement autoriser à utiliser sa chanson <i>Jingle Bells</i> !</p>

                    <h3>Ressources graphiques</h3>
                    <h4>Images par <a href="https://www.freepik.com/">freepik.com</a></h4>
                    <ul>
                        <li><a href="https://fr.freepik.com/vecteurs-libre/arriere-plan-de-paysage-enneige-hiver_1424316.htm">Montagnes</a> <small>modifié</small></li>
                        <li><a href="https://fr.freepik.com/vecteurs-libre/collecte-des-echarpes_762124.htm">Pompons</a> <small>modifié</small></li>
                        <li><a href="https://fr.freepik.com/vecteurs-libre/differents-flocons-de-neige_958015.htm">Flocons de neige</a> <small>modifié</small></li>

                    </ul>
                    <h4>Iconographie par <a href="https://thenounproject.com/">the Noun Project</a></h4>
                    <ul>
                        <li><span>Casque</span> - <a href="https://thenounproject.com/Aleksandr_Vector/"><strong>Aleksandr Vector</strong></a> <small>modifié</small></li>
                        <li><span>Pelotte</span> - <a href="https://thenounproject.com/symbolon/"><strong>Symbolon</strong></a> <small>modifié</small></li>
                        <li><span>Aiguilles</span> - <a href="https://thenounproject.com/gemma.garner/"><strong>Gemma Garner</strong></a> <small>modifié</small></li>
                        <li><span>Info</span> - <a href="https://thenounproject.com/razerk/"><strong>Alex Auda Samora</strong></a></li>
                        <li><span>Full screen</span> - <a href="https://thenounproject.com/coquet_adrien/">Adrien Coquet</a></li>
                    </ul>

                    <h3>Ressources audio</h3>
                    <h4>Musiques</h4>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=k3FkPhDBykI"><em>Jingle Bells</em> - <strong>Charlie Parra del Riego</strong></a></li>
                    </ul>
                    <h4>Effets sonores par <a href="https://freesound.org">freesound.org</a></h4>
                    <ul>
                        <li><a href="https://freesound.org/people/SgtPepperArc360/sounds/341801/"><em>O Little Town of Bethlehem</em> - <strong>SgtPepperArc360</strong></a></li>
                        <li><a href="https://freesound.org/people/Selector/sounds/369506/"><em>Sleigh bells hit</em> - <strong>Selector</strong></a></li>
                        <li><a href="https://freesound.org/people/airmedia/sounds/349855/"><em>Merry Christmas Santa</em> - <strong>AirMedia</strong></a></li>
                        <li><a href="https://freesound.org/people/dobroide/sounds/27816/"><em>Wind.canaveral</em> - <strong>dobroide</strong></a></li>
                        <li><a href="https://freesound.org/people/silencyo/sounds/81800/"><em>Fire in Fireplace Close Up Reverberant</em> - <strong>Silencyo</strong></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
