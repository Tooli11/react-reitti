import React, { Component } from 'react';
import L from 'leaflet';
import {Marker, Popup} from 'react-leaflet';

var stopIcon = L.divIcon({ iconSize: [15, 15]});
class Bussi extends Component {
    state = {
        bussit : this.props.empty
      }

    componentDidMount(){
        console.log("Bussi mounted")
    }
    /*
    componentDidMount(){
        const client = this.props.client;
        console.log("Mounted");
        //console.log(this.state.paikat);
        var topic = "/hfp/v1/journey/ongoing/+/+/+/2553/+/+/+/+/+/#";
 

        client.on("message", (topic, message) => {
        console.log("Viesti tuli");
        const vehicle_position = JSON.parse(message).VP;
        //muutetaan viesti JSON muotoon. VP sisältää hsl määrittelemät muuttujat ja arvot.
            //Skip vehicles with invalid location
        if (!vehicle_position.lat || !vehicle_position.long) {
            return;
        }
        let found = false;
        if  (this.state.bussit.length > 0){
            const bussit = [...this.state.bussit];
            for(let i=0; i < bussit.length; i++){
                if (bussit[i].veh === vehicle_position.veh){
                    //console.log("Löytyi sama"); 
                    bussit[i] = vehicle_position;
                    found = true;
                    this.setState({
                        bussit
                    })
                    
                } 
            }
            
        } 
        if (!found){
            const bussit = [...this.state.bussit];
            bussit.push(vehicle_position);

            this.setState({
                bussit
            })
        }
        });  
    }
    */
    componentDidUpdate(){
        //console.log("Bussi updated")
    }
    
    render() { 
        //console.log("Bussi rendered")
        return (
            <React.Fragment>
            {this.props.bussit.length > 0 ? this.props.bussit.map( bussi => 
                <Marker
                    key={bussi.oper + bussi.veh}
                    position={[bussi.lat, bussi.long]}
                    icon={stopIcon}
                >
                    <Popup>{bussi.veh}</Popup>
                </Marker>
            ) : '' }
            </React.Fragment>
          );
    }
}
 
export default Bussi;