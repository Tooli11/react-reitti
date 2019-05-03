import React, { Component } from 'react';
import L from 'leaflet';
import {Marker, Popup} from 'react-leaflet';
import PopupBus from './PopupBus';

var busIcon = L.divIcon({ 
    iconSize: [12, 12],  
});

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
        const bussi = this.props.bussi;
        return (
            <React.Fragment>
                <Marker
                    position={[bussi.lat, bussi.long]}
                    icon={busIcon}
                >
                    <Popup>
                        <PopupBus bussi= {bussi}/>
                    </Popup>
                </Marker>
            
            </React.Fragment>
          );
    }
}
 
export default Bussi;
/*
<React.Fragment>
{this.props.bussit.length > 0 ? this.props.bussit.map( bussi => 
    <Marker
        key={""+bussi.oper + bussi.veh}
        position={[bussi.lat, bussi.long]}
        icon={busIcon}
    >
        <Popup>
            <PopupBus bussi= {bussi}/>
        </Popup>
    </Marker>
) : '' }
</React.Fragment>
*/