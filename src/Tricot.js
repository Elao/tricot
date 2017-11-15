import React, { Component } from 'react';

export default class Tricot extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
              <div className="arrow-tunnel">
                <div className="arrow"></div>
              </div>
              <div className="container">
                <img src="images/needle-left.png" alt="" className="needle needle--left" />
                <img src="images/needle-right.png" alt="" className="needle needle--right" />
                <div className="knit">
                  <div className="knit__scarf">
                    <img src="images/upper-stitch--front.svg" alt="" className="upper-stitch upper-stitch--front" />
                    <img src="images/upper-stitch--back.svg" alt="" className="upper-stitch upper-stitch--back" />
                    <img src="images/knit.svg" alt="" className="" />
                  </div>
                </div>
              </div>
              <div className="rules">
                Appuie en rythme sur les touches pour tricoter
              </div>
            </div>
        );
    }
}
