import React, { Component } from 'react';
import {Polyline, Popup} from 'react-leaflet';

class LeafletLeg extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
            {this.props.legs !== null ? this.props.legs.map( leg => 
                <Polyline
                    key= {leg.id}
                    positions={leg.coordsArray}
                    color={leg.color}
                >
                    <Popup>Leaflet leg leg tässä</Popup>
                </Polyline>
            ) : '' }
            </React.Fragment>
          );
    }
}
 
export default LeafletLeg;