import React, { Component } from 'react';

class PopupBus extends Component {
    state = {  }
    render() { 
        const bussi = this.props.bussi;
        return (
            <ul>
                <li className="stopPopup-otsikot">
                    Linja:  <strong>{bussi.desi}</strong>
                </li>
                <li>
                    Ero aikatauluun: {bussi.dl}s
                </li>
                <li>
                    Nopeus: {bussi.spd} m/s
                </li>
                <li>
                    Numero: {bussi.veh}
                </li>
                <li>
                    Alku: {bussi.start}
                </li>
            </ul>
        );
    }
}
 
export default PopupBus;