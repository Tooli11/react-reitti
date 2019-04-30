import React, { Component } from 'react';
import L from 'leaflet';
import {Marker, Popup} from 'react-leaflet';
//import PopupStop from './PopupStop';
import PopupStopApollo from './PopupStopApollo';

var stopIcon = L.divIcon({ 
    iconSize: [7, 7],
    className: "stop-div-icon"
});
var changeStopIcon = L.divIcon({
    iconSize: [7,7],
    className: "stop-change-div-icon"
})
class Stop extends Component {
    state = { 
        active: true
    }

    /*
    componentDidUpdate(){
        if (this.state.viesti !== ''){
            this.setState({
                viesti: ''
            })
        }
    }
    */
    render() { 
        const stop = this.props.stop;
        return (
            <React.Fragment>
                <Marker
                    position={stop.coords}
                    icon={stop.type === "from" ? changeStopIcon : stopIcon}
                >
                    {this.state.active === true ? 
                    <Popup
                        minWidth={170}
                        onClose= {() => {this.setState({
                            active: false
                        })}}
                        >
                            <PopupStopApollo
                                stop={stop}
                            />
                    </Popup> : 
                    <Popup
                        onOpen= {() => {this.setState({
                            active: true
                        })}}
                    >
                        Suljettu popup hetken
                    </Popup> 
                    }
                </Marker>
            </React.Fragment>
          );
    }
}

 
export default Stop;

/*
<Marker
                    position={stop.coords}
                    icon={stopIcon}
                >
                    {this.state.viesti === '' ? 
                    <Popup
                        minWidth={170}
                        onClose= {() => {this.setState({
                            viesti: 'popup has closed'
                        })}}
                        >
                            <PopupStopApollo
                                stop={stop}
                            />
                    </Popup> : 
                    <Popup
                        onOpen= {() => {this.setState({
                            viesti: ''
                        })}}
                    >
                        Suljettu popup hetken
                    </Popup> 
                    }
                </Marker>

*/


/*
<PopupStop
                            stop= {stop}
                        />
*/
/*
<Popup
                        onClose= {() => {this.setState({
                            viesti: 'popup has closed'
                        })}}
                    ><PopupStop/></Popup>
                    */

/*
{this.props.stops !== null ? this.props.stops.map( stop => 
                <Marker
                    key={stop.id}
                    position={stop.coords}
                    icon={stopIcon}
                >
                    {this.state.viesti === '' ? <Popup
                        onClose= {() => {this.setState({
                            viesti: 'popup has closed'
                        })}}
                    ><PopupStop/></Popup> : 
                    <Popup>Suljettu popup hetken</Popup> }
                    
                </Marker>
            ) : '' }
*/