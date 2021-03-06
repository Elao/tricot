import React, { Component } from 'react';
import Modal from './utils/Modal';

export default class Privacy extends Component {
  renderButton() {
    return this.modal.renderButton();
  }

  render() {
    return (
      <Modal hash="privacy" label="Cookies et confidentialité" ref={modal => this.modal = modal}>
        <h3>Cookies et protection des données</h3>
        <p>Nous traquons le nombre de visites sur Knittar Hero.</p>

        <p>Afin d&apos;être conforme aux recommandations de la CNIL en matière de cookies, les mesures de protection des données
personnelles ont été mises en place :</p>
        <ul>
          <li>Votre adresse IP est anonymisée.</li>
          <li>Vous pouvez désactiver le suivi via le formulaire ci-dessous.</li>
        </ul>

        <h3>Désactiver le suivi</h3>
        <iframe
          className="privacy-iframe"
          src="https://matomo.elao.com/index.php?module=CoreAdminHome&action=optOut&language=fr"
        ></iframe>
      </Modal>
    );
  }
}
