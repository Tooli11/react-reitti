import React, { Component } from 'react';
import {laskeKesto, timeToHM} from '../utils/aika';

class Leg extends Component {
    state = {  }
    
    render() { 
        const {startTime, endTime, duration, mode, route, to, from } = this.props.leg;
        //console.log(this.props.leg);
        //console.log(route.shortName);
        return (
            <React.Fragment>
            {mode} {mode !== 'WALK' ? route.shortName : ''} {from.name !== 'Origin' ? from.name + ' -> ': '' }{to.name !== 'Destination' ? to.name : ''} {timeToHM(startTime)}-{timeToHM(endTime)} ({laskeKesto(duration)})<br></br>
            </React.Fragment>
          );
    }
}
 
export default Leg;