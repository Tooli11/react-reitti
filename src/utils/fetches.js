import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';


const clientA = new ApolloClient({
    uri: "http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
  });


export const fetchLocations = (haettavaPaikka = "kamppi") => { 
  const url = `https://api.digitransit.fi/geocoding/v1/search?text=${haettavaPaikka}&size=1`;
  let koordinaatit = '';
  const palautusKoordinaatit = fetch(url)
      .then(response => response.json())
      .then(result => {
          //this.logContent(result.data.routes)
          console.log(result); 
          koordinaatit = [result.features[0].geometry.coordinates[1], result.features[0].geometry.coordinates[0]];
          console.log(koordinaatit);
          return (koordinaatit);   
      })
      .catch(error => console.log(error));
  //console.log("palautus: ",palautusKoordinaatit);
  return(palautusKoordinaatit);    
}


export const fetchItenariesA = (alkuKoord,loppuKoord, kellonaika, date, arriveBy) => {
    //const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
    //koordinaatit pitää kai laittaa muodossa lat: jotain, lon: jotain
    /*
    koordinaatit = "lat: "+result.features[0].geometry.coordinates[1]+" ,lon: "+result.features[0].geometry.coordinates[0];
    */
    alkuKoord = "lat:"+alkuKoord[0]+",lon:"+alkuKoord[1];
    loppuKoord = "lat:"+loppuKoord[0]+",lon:"+loppuKoord[1];
    const itineraries = clientA.query({
        query: reittiQuery5(alkuKoord,loppuKoord, kellonaika, date, arriveBy)
    })
        .then((data) => {
            console.log(data);
            //console.log(data.data.plan.itineraries);
            return data.data.plan.itineraries;
            
        })
        .catch(error => console.log(error));
    return itineraries; 
}

const reittiQuery5 = (paikka1, paikka2, kellonaika, date, arriveBy) => {
    return gql ` {
     plan(
       from: {${paikka1}},
       to: {${paikka2}},
       numItineraries: 10,
       time: "${kellonaika}",
       date: "${date}",
       arriveBy: ${arriveBy},
     ) {
       itineraries{
         walkDistance
         duration
         startTime
         endTime
         legs {
           mode
           startTime
           endTime
           duration
           from {
             name
             stop {
               name
               lat
               lon
               
             }
           }
           to {
             name
             stop {
               name
               lat
               lon
             }
           }
           route {
               shortName
               gtfsId
           }
           trip{
               id
               stoptimes{
                   stop{
                       gtfsId
                       name
                       lat
                       lon
                   }
                   scheduledDeparture
                   realtimeDeparture
               }
               directionId
               tripGeometry {
                   length
                   points
               }
           }
           distance
           legGeometry {
             length
             points
           }
         }
       }
     }
   }`;
}