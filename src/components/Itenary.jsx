import React, { Component } from 'react';
import Leg from './Leg';
import {laskeKesto, timeToHM} from '../utils/aika';

class Itenary extends Component {
    constructor(){
       super();
       this.handleClick = this.handleClick.bind(this);

    }
    state = {  }
    handleClick(id){
        console.log("Handlattu click");
        console.log(this.props.id);
        console.log("tässä id:", id);
    }

    render() { 
        console.log(this.props.itenary)
        const {itenary} = this.props; 
        return (  
            <React.Fragment>
                <p 
                    onClick={() => this.props.onClick(itenary)}
                >
                    Itenary {timeToHM(itenary.startTime)} - {timeToHM(itenary.endTime)} ({laskeKesto(itenary.duration)})
                </p>
                {itenary.legs.map(leg => 
                    <Leg 
                        key={leg.startTime}
                        leg={leg}
                    />
                )}
            </React.Fragment>
            
        );
    }
}
 
export default Itenary;
/*
{this.props.itenary.map(leg => 
    <p>Leg</p>
)}
*/