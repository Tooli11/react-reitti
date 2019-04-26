import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import {timeToHM} from '../utils/aika.js';

const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
})


class PopupStopApollo extends Component {
    state = {  }

    componentWillUnmount(){
        console.log("PopupStopApollo unmounted")
    }


    render() { 
        //const id = "HSL:1282104";
        return ( 
            <ApolloProvider client={client}>
                <Query
                    pollInterval={10000}
                    query={gql `
                    query stop($id: String!){
                        stop(id: $id) {
                          name
                          stoptimesWithoutPatterns {
                            scheduledArrival
                            realtimeArrival
                            arrivalDelay
                            scheduledDeparture
                            realtimeDeparture
                            departureDelay
                            timepoint
                            realtime
                            realtimeState
                            pickupType
                            serviceDay
                            headsign
                            trip {
                              id
                              route {
                                id
                                gtfsId
                                shortName
                              }
                            }
                          }
                        }
                    }
                    
                    `}
                    variables={{id: this.props.stop.id}}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error, how bout that </p>;
                        
                        return (
                        <React.Fragment>
                            <ul>
                                <li>
                                    {this.props.stop.id}: <strong>{this.props.stop.name}</strong>
                                </li>
                                <li>
                                    Linja Odotus rt Aikataulu status
                                </li>
                            
                            {data.stop.stoptimesWithoutPatterns.map(({scheduledArrival, realtimeArrival, realtimeState, serviceDay, trip}) =>{

                            const erotus = (serviceDay + realtimeArrival)* 1000 - Date.now()
                            console.log(erotus);
                            const odotusAika = Math.round((erotus / 1000) / 60);
                            console.log("min: ", Math.floor((erotus / 1000) / 60));
                            const realAika = timeToHM((serviceDay + realtimeArrival)*1000);
                            const scheduleAika= timeToHM((serviceDay + scheduledArrival)*1000);
                            
                            return (
                                <li
                                key={scheduledArrival + trip.route.id}
                                >
                                     <strong>{trip.route.shortName}</strong>  ~{odotusAika > 0 ? odotusAika : 'now'} <strong>{realAika}</strong> {scheduleAika} {realtimeState === "UPDATED"? "UPD" : "SCHE"}
                                </li>)
                            })}
                            </ul>
                        </React.Fragment>)
                    }}
                </Query>
            </ApolloProvider>
         );
    }
}
 
export default PopupStopApollo;

/*
{({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error, how bout that </p>;
                        
                        return data.stop.stoptimesWithoutPatterns.map(({scheduledArrival, realtimeArrival, realtimeState, serviceDay, trip}) =>{

                        const erotus = (serviceDay + realtimeArrival)* 1000 - Date.now()
                        console.log(erotus);
                        const odotusAika = Math.round((erotus / 1000) / 60);
                        console.log("min: ", Math.floor((erotus / 1000) / 60));
                        const aika = timeToHM((serviceDay + realtimeArrival)*1000);
                        const scheduleAika= timeToHM((serviceDay + scheduledArrival)*1000);
                        
                        return (
                         <p
                            key={scheduledArrival + trip.route.id}
                         >Linja: {trip.route.shortName}<br></br>Odotus: ~{odotusAika > 0 ? odotusAika : 'now'}<br></br>Aikataulu: {scheduleAika} <br></br> realtime: {aika}<br></br> status: {realtimeState}</p>)
                        });
                    }}
*/
/*
 return (
                            <React.Fragment>
                        <p>{this.props.stop.id}: {this.props.stop.name}</p>{data.stop.stoptimesWithoutPatterns.map(({scheduledArrival, realtimeArrival, realtimeState, serviceDay, trip}) =>{

                        const erotus = (serviceDay + realtimeArrival)* 1000 - Date.now()
                        console.log(erotus);
                        const odotusAika = Math.round((erotus / 1000) / 60);
                        console.log("min: ", Math.floor((erotus / 1000) / 60));
                        const aika = timeToHM((serviceDay + realtimeArrival)*1000);
                        const scheduleAika= timeToHM((serviceDay + scheduledArrival)*1000);
                        
                        return (
                         <p
                            key={scheduledArrival + trip.route.id}
                         >Linja: {trip.route.shortName}<br></br>Odotus: ~{odotusAika > 0 ? odotusAika : 'now'}<br></br>Aikataulu: {scheduleAika} <br></br> realtime: {aika}<br></br> status: {realtimeState}</p>)
                        })}
                        </React.Fragment>)
*/