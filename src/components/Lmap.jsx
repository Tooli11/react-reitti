import React, { Component } from 'react';
import {Map, Popup, TileLayer, Polyline} from 'react-leaflet';
import Stop from './Stop';
import LeafletLeg from './LeafletLeg';
import Trip from './Trip';




class Lmap extends Component {
    
/*
    componentDidMount(){
        
        const client = this.props.client;
        console.log("Mounted");
        //console.log(this.state.paikat);
        var topic = "/hfp/v1/journey/ongoing/+/+/+/2553/+/+/+/+/+/#";
 

        client.on("message", (topic, message) => {
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


    render() { 
        /*
        console.log(this.props.itenaries);
        console.log(this.props.legs);
        console.log(this.props.stops);
        console.log(this.props.bounds);
        */
       
       
        return ( 
            <Map 
                center={[60.220864, 24.929819]} 
                zoom={10}
                bounds= {this.props.bounds}
                useFlyTo={true}
                
            >
                <TileLayer
                    url="https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png"
                    attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                />
                <Polyline 
                    positions={[[60.220864, 24.929819],[60.226864, 24.929419]]}
                    color='red'
                    weight='5'
                    opacity='0.6'>
                    <Popup>Pretty popup.<br/> Easily customizable</Popup>
                </Polyline>
                
                

                {this.props.stops !== null ? this.props.stops.map( stop =>
                    <Stop
                        key= {stop.id}
                        stop={stop}
                    />
                ): ''}
                {this.props.children}
                
                <Trip
                    trips={this.props.trips}
                />
                <LeafletLeg
                    legs={this.props.legs}
                />
                
            </Map>
         );
    }
}
 
export default Lmap;

/*
bounds= {[[60.306374, 24.985113],[60.247157, 24.846272]]}

ei toimi alempi:
bounds= {[[60.218234, 24.812424],[60.218234, 24.812424]]}
bounds= {[[60.218234 , 24.812424],[60.171305 , 24.942965]]}

var southWest = L.latLng(40.712, -74.227),
    northEast = L.latLng(40.774, -74.125),
    bounds = L.latLngBounds(southWest, northEast);


map.fitBounds([
    [40.712, -74.227],
    [40.774, -74.125]
]);
*/
/*
{this.props.tilanne === true ? <Bussi
                    bussit={this.state.bussit}
                    client={this.props.client}
                    empty={[]}
                    
                /> : '' }
*/



/*
<Bussi
                    bussit={this.state.bussit}
                    client={this.props.client}
                    empty={[]}
                    
                />
*/





/*
{this.props.itenaries !== null ? this.props.itenaries.map(itenary => {
    itenary.legs.forEach( leg =>{
    console.log(annaKoordinaattiArray(leg))
    return <Polyline positions={annaKoordinaattiArray(leg)}/>
    }
): '' }


{this.props.itenaries !== null ? mapItenaries(this.props.itenaries).map( item => 
    item): '' }

*/

