
import React, { Component } from 'react';
import mqtt from 'mqtt';


class PopupStop extends Component {
    constructor(){
        super();
        this.state = {
            bussit: [],
            topic: null
        }
        this.client = mqtt.connect("mqtts://mqtt.hsl.fi:443");
       
    }
    

    componentDidMount(){
        //const client = mqtt.connect("mqtts://mqtt.hsl.fi:443");
        //const client = this.props.client;
        const client = this.client;
        console.log("Mounted popupstop mqtt");
        //console.log(this.state.paikat);
        var topic = "/hfp/v1/journey/ongoing/+/+/+/2553/+/+/+/+/+/#";
        var topic2 = `/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/${this.props.stop.id.replace("HSL:", "")}/+/#`;
        this.setState({
            topic: topic2
        })
        console.log(topic2);
        client.subscribe(topic2);
        //gtfsId = gtfsId.replace("HSL:", "");

        client.on("message", (topic, message) => {
        console.log("Viesti tuli");
        const vehicle_position = JSON.parse(message).VP;
        //muutetaan viesti JSON muotoon. VP sisältää hsl määrittelemät muuttujat ja arvot.
            //Skip vehicles with invalid location
        if (!vehicle_position.lat || !vehicle_position.long) {
            return;
        }
        console.log(vehicle_position);
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

    componentWillUnmount(){
        console.log("PopupStop will unmount");
        var topic = "/hfp/v1/journey/ongoing/+/+/+/2553/+/+/+/+/+/#";
        this.client.unsubscribe(this.state.topic);
        setTimeout(()=> {
            console.log("popupStop unmounted ja client ended")
            this.client.end();
        }, 300);   
    }


    render() { 
        console.log("PopupStop render");
        return ( 
            <React.Fragment>
                <p>Pysäkki: {this.props.stop.id}</p>
                {this.state.bussit.length > 0 ? this.state.bussit.map(bussi => 
                   <p> Linja: {bussi.desi}: g: {bussi.acc} dl: {bussi.dl}</p>
                )  : <p>Ei mitään</p>}
            </React.Fragment>
        );
    }
}
 
export default PopupStop;