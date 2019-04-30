import React, { Component } from 'react';
import {Polyline, Popup} from 'react-leaflet';


class Trip extends Component {

    render() { 
        return (
            <React.Fragment>
            {this.props.trips !== null ? this.props.trips.map( trip => 
                <Polyline
                    key={trip.id}
                    positions={trip.coordsArray}
                    color='grey'
                    weight='2'
                    opacity='0.6'
                >
                    <Popup>Trip Trip tässä</Popup>
                </Polyline>
            ) : '' }
            </React.Fragment>
          );
    }
}
 
export default Trip;