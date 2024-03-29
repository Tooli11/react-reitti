import React, { Component } from 'react';
import Leg from './Leg';
import {laskeKesto, timeToHM} from '../utils/aika';

class Itenary extends Component {
    
    render() { 
        //console.log(this.props.itenary)
        const {itenary} = this.props; 
        return (  
            <React.Fragment>
                <p 
                    onClick={() => this.props.onClick(itenary)}
                >
                    Reitti {timeToHM(itenary.startTime)} - {timeToHM(itenary.endTime)} ({laskeKesto(itenary.duration)})
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
