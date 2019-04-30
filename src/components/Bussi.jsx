import React, { Component } from 'react';
import L from 'leaflet';
import {Marker, Popup} from 'react-leaflet';
import PopupBus from './PopupBus';

var busIcon = L.divIcon({ iconSize: [15, 15]});
class Bussi extends Component {
    

    componentDidMount(){
        console.log("Bussi mounted")
    }
    /*
    componentDidUpdate(){
        console.log("Bussi updated")
    }
    */
    
    render() { 
        //console.log("Bussi rendered")
        return (
            <React.Fragment>
            {this.props.bussit.length > 0 ? this.props.bussit.map( bussi => 
                <Marker
                    key={bussi.oper + bussi.veh}
                    position={[bussi.lat, bussi.long]}
                    icon={busIcon}
                >
                    <Popup>
                        <PopupBus bussi= {bussi}/>
                    </Popup>
                </Marker>
            ) : '' }
            </React.Fragment>
          );
    }
}
 
export default Bussi;