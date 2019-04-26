import React, { Component } from 'react';
import Bussi from './Bussi';
import mqtt from 'mqtt';


class MqttReceiver extends Component {
    constructor(){
        super();
        this.state = {
            bussit : []
        }
        this.client = mqtt.connect("mqtts://mqtt.hsl.fi:443");
    }
    

    componentDidMount(){
        //const client = mqtt.connect("mqtts://mqtt.hsl.fi:443");
        //const client = this.props.client;
        const client = this.client;
        console.log("Mounted mqtt receiver");
        //console.log(this.state.paikat);
        var topic = "/hfp/v1/journey/ongoing/+/+/+/2553/+/+/+/+/+/#";
 

        client.on("message", (topic, message) => {
        //console.log("Viesti tuli");
        const vehicle_position = JSON.parse(message).VP;
        //muutetaan viesti JSON muotoon. VP sisältää hsl määrittelemät muuttujat ja arvot.
            //Skip vehicles with invalid location
        if (!vehicle_position.lat || !vehicle_position.long) {
            return;
        }
        //console.log(vehicle_position);
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

    componentDidUpdate(){
        if (this.props.topicReset=== true){
            console.log("unsubscribe: ",this.props.unSubTopics);
            console.log("subscribe: ",this.props.topics);
            if (this.props.unSubTopics !== null){
                this.client.unsubscribe(this.props.unSubTopics);
            }
            this.client.subscribe(this.props.topics);
            console.log("timeout alkaa") // jotta kartalle ei jää roikkumaan busseja
            setTimeout(()=> {
                console.log("Mqtt receiver tilanne false, bussit nollattu")
                this.setState({
                    bussit : []
                })
            }, 150);
            /*
            //this.props.client.
            console.log("Mqtt receiver tilanne false, bussit nollattu")
            this.setState({
                bussit : []
            })
            */
        }
    }






    render() { 
        return (
            <React.Fragment>
                {this.state.bussit.length > 0 ? 
                <Bussi
                    bussit= {this.state.bussit}
                /> : ''}
            </React.Fragment>
            
          );
    }
}
 
export default MqttReceiver ;