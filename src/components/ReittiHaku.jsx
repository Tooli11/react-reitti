import React, { Component } from 'react';
import {fetchLocations, fetchItenariesA} from '../utils/fetches';
import Itenary from './Itenary';
import Lmap from './Lmap';
import {returnItenariesPartsAndTopic, returnOneItenaryPartsAndTopic} from '../utils/Lmapping';
import MqttReceiver from './MqttReceiver';
import ControlsReitti from './ControlsReitti';

class ReittiHaku extends Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            itenaries: null,
            trips: null,
            stops: null,
            legs: null,
            topics: null,
            unSubTopics: null,
            topicReset: false,
            bounds: null
        }
        this.onSubmitHaku = this.onSubmitHaku.bind(this);
        this.handleItenaryClick = this.handleItenaryClick.bind(this);
    }

    componentDidUpdate(){
        console.log("reittihakuComponent did update");
        if (this.state.topicReset === true){
            this.setState({
                topicReset: false,
                loading: false
            })
        }   
    }

    /*
    async onSubmitPaikat(event){
        event.preventDefault();
        //console.log(this.state.paikat);
        const koordinaatit = [...this.state.koordinaatit];
        koordinaatit[0] = await fetchLocations(this.state.paikat[0]);
        koordinaatit[1] = await fetchLocations(this.state.paikat[1]);
        this.setState({
            koordinaatit
        })
        console.log(this.state.koordinaatit);
    }
    */

    async onSubmitHaku(event, controlsReitti){
        event.preventDefault();
        this.setState({
            loading: true
        })
    
        let koordinaatit0 = await fetchLocations(controlsReitti.paikat[0]);
        let koordinaatit1 = await fetchLocations(controlsReitti.paikat[1]);   

        const {time, date, checkbox} = controlsReitti;
        const itenaries =await fetchItenariesA(koordinaatit0,koordinaatit1, time, date, checkbox);
        if (itenaries !== null){
            const osat = returnItenariesPartsAndTopic(itenaries);
            if (this.state.topics !== null){
                const unSubTopics = this.state.topics;
                this.setState({
                    unSubTopics
                })
            }
            console.log(osat);
            this.setState({
                itenaries,
                trips: osat[0],
                stops: osat[1],
                legs: osat[2],
                topics: osat[3],
                topicReset: true,
                bounds:  [koordinaatit0,koordinaatit1]   
            })
        }
        
    }

    handleItenaryClick(itenary){
        console.log("itenaryclick handlattu", itenary);
        const osat = returnOneItenaryPartsAndTopic(itenary);
        if (this.state.topics !== null){
            const unSubTopics = this.state.topics;
            this.setState({
                unSubTopics
            })
        }
        this.setState({
            trips: osat[0],
            stops: osat[1],
            legs: osat[2],
            topics: osat[3],
            topicReset: true
        })
        
    }
 
    render() { 
        return (
        <React.Fragment>
             <ControlsReitti
                onSubmitHaku= {this.onSubmitHaku}
                loading={this.state.loading}
            />
            <Lmap
                itenaries={this.state.itenaries}
                trips= {this.state.trips}
                stops= {this.state.stops}
                legs= {this.state.legs}
                bounds={this.state.bounds}
            >
                    <MqttReceiver
                        topicReset= {this.state.topicReset}
                        topics={this.state.topics}
                        unSubTopics={this.state.unSubTopics}
                    />
            </Lmap>
            
            {this.state.itenaries === null ?
                <p>Placeholder 1: itineraries</p> :
                <div
                    className="itenaries-container"
                >
                    {this.state.itenaries.map( itenary => 
                        <Itenary
                            key={""+itenary.startTime + itenary.endTime + itenary.walkDistance}
                            itenary={itenary}
                            id={itenary.startTime + itenary.endTime + itenary.walkDistance}
                            onClick={this.handleItenaryClick}
                        />)}
                </div>}
        </React.Fragment>
        );
    }
}
 
export default ReittiHaku;
