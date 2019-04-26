import React from 'react';
import polyline from '@mapbox/polyline';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Polyline, Marker} from 'react-leaflet';
import {muodostaTopic} from './mqttHelp';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/*
const stopIcon = L.icon({
    iconUrl: "/src/icons/icon4.png",
    iconSize: [10,10],
    iconAnchor: [5,5]
});
*/
var stopIcon = L.divIcon({ iconSize: [5, 5]});

export const mapItenariesAndTopic = (itineraries, map) => {
    itineraries.forEach(itinerary => {
        console.log(itinerary);
        console.log("id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance));
        let name = "id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance);
        
        let itenaryFgroup = L.featureGroup(); // uusi featuregroup ja siihen sisältää kaikki legit
        
        console.log(name);
        itinerary.legs.forEach( leg =>{
            const legCoordinateArray = polyline.decode(leg.legGeometry.points); //reitin decodaus polyline js libraryllä 
            if (leg.mode !== "WALK"){
                const tripCoordinateArray = polyline.decode(leg.trip.tripGeometry.points); // Harmaa linjakohta löytyy tuosta
                lisaaViiva(map, itenaryFgroup, tripCoordinateArray, 'grey', 0.6, 2); // lisätään harmaa linja kartalle
                
                const stopit = leg.trip.stoptimes;
                lisaaStopit(map, itenaryFgroup, stopit); 
                //itenaryTopicList.push(muodostaTopic(leg));  //tehdään topic lisätään ja lisätään se listaan
            }
            let vari = valitseVari(leg.mode);  // valitaan viivan väri kulkuneuvon mukaan.
            lisaaViiva(map, itenaryFgroup, legCoordinateArray, vari);  // Lisätään varsinainen reittiviiva
            //console.log(itenaryList);
            //console.log(itenaryTopicList);
            //console.log(allTopicsList);
        })
        //lisaaAllTopicsListaan(itenaryTopicList);   // mqtt_live_updates.js  // lopuksi lisätää itenarytopiclist kaikkien topiccien listaan   
    })
} 

export const mapItenaries = (itineraries) => {
    let palautukset = [];
    itineraries.forEach(itinerary => {
        //console.log(itinerary);
        //console.log("id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance));
        let name = "id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance);
        itinerary.legs.forEach( leg =>{
            const legCoordinateArray = polyline.decode(leg.legGeometry.points); 
            if (leg.mode !== "WALK"){
                const tripCoordinateArray = polyline.decode(leg.trip.tripGeometry.points); // Harmaa linjakohta löytyy tuosta
                palautukset.push(<Polyline 
                                    positions={[tripCoordinateArray]}
                                    color='grey'
                                    weight='2'
                                    opacity="0.6"
                                    />);
                const stopit = leg.trip.stoptimes;
                stopit.forEach( (t) => {
                    palautukset.push(<Marker
                                        position={[t.stop.lat, t.stop.lon]}
                                        icon= {stopIcon}
                    />);
                })
            }
            let vari = valitseVari(leg.mode);  // valitaan viivan väri kulkuneuvon mukaan.
            palautukset.push(<Polyline 
                positions={[legCoordinateArray]}
                color={vari}
                />);
        })
    })
    return palautukset;
} 

export const returnItenariesParts = (itineraries) => {
    let palautukset = [[],[],[]];
    itineraries.forEach(itinerary => {
        console.log(itinerary);
        console.log("id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance));
        let name = "id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance);

        itinerary.legs.forEach( leg =>{
            const legCoordinateArray = polyline.decode(leg.legGeometry.points); 
            if (leg.mode !== "WALK"){
                const tripCoordinateArray = polyline.decode(leg.trip.tripGeometry.points); // Harmaa linjakohta löytyy tuosta
                palautukset[0].push(tripCoordinateArray)
                                    
                const stopit = leg.trip.stoptimes;
                stopit.forEach( (t) => {
                    palautukset[1].push({coords: [t.stop.lat, t.stop.lon], name: t.stop.name});
                })
            }
            let vari = valitseVari(leg.mode);  // valitaan viivan väri kulkuneuvon mukaan.
            palautukset[2].push({coordsArray: legCoordinateArray,color: vari});
        })
    })
    return palautukset;
} 
export const returnItenariesPartsAndTopic = (itineraries) => {
    let palautukset = [[],[],[],[]];
    itineraries.forEach(itinerary => {
        console.log(itinerary);
        console.log("id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance));
        let name = "id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance);

        itinerary.legs.forEach( leg =>{
            const legCoordinateArray = polyline.decode(leg.legGeometry.points); 
            if (leg.mode !== "WALK"){
                const tripCoordinateArray = polyline.decode(leg.trip.tripGeometry.points); // Harmaa linjakohta löytyy tuosta
                palautukset[0].push({coordsArray: tripCoordinateArray,id: leg.trip.id});
                palautukset[3].push(muodostaTopic(leg));
                                    
                const stopit = leg.trip.stoptimes;
                stopit.forEach( (t) => {
                    let found = false;
                    for (let i=0; i < palautukset[1].length; i++){
                        if (palautukset[1][i].id === t.stop.gtfsId){
                            console.log('Löydetty stop match');
                            found= true;
                            //break;
                        }
                    }
                    if (!(found)){
                        palautukset[1].push({coords: [t.stop.lat, t.stop.lon], name: t.stop.name, id: t.stop.gtfsId});
                    }
                    //palautukset[1].push({coords: [t.stop.lat, t.stop.lon], name: t.stop.name});
                })
            }
            let vari = valitseVari(leg.mode);  // valitaan viivan väri kulkuneuvon mukaan.
            palautukset[2].push({coordsArray: legCoordinateArray,color: vari, id: leg.startTime + leg.endTime + leg.distance});
        })
    })
    return palautukset;
} 

export const returnOneItenaryPartsAndTopic = (itinerary) => {
    let palautukset = [[],[],[],[]];
    console.log("id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance));
    let name = "id"+(itinerary.startTime + itinerary.endTime + itinerary.walkDistance);

    itinerary.legs.forEach( leg =>{
        const legCoordinateArray = polyline.decode(leg.legGeometry.points); 
        if (leg.mode !== "WALK"){
            const tripCoordinateArray = polyline.decode(leg.trip.tripGeometry.points); // Harmaa linjakohta löytyy tuosta
            palautukset[0].push({coordsArray: tripCoordinateArray,id: leg.trip.id});
            palautukset[3].push(muodostaTopic(leg));
                                
            const stopit = leg.trip.stoptimes;
            stopit.forEach( (t) => {
                let found = false;
                for (let i=0; i < palautukset[1].length; i++){
                    if (palautukset[1][i].id === t.stop.gtfsId){
                        console.log('Löydetty stop match');
                        found= true;
                        //break;
                    }
                }
                if (!(found)){
                    palautukset[1].push({coords: [t.stop.lat, t.stop.lon], name: t.stop.name, id: t.stop.gtfsId});
                }



            })
        }
        let vari = valitseVari(leg.mode);  // valitaan viivan väri kulkuneuvon mukaan.
        palautukset[2].push({coordsArray: legCoordinateArray,color: vari, id: leg.startTime + leg.endTime + leg.distance});
    })
    return palautukset;
} 

const valitseVari = (mode) => {
    //vaihtoehdot "WALK", "BUS", "SUBWAY", ...
    return mode === "WALK" ?  '#e8b41b' : 
            mode === "BUS" ?  '#0ef2ee': 
            mode === "RAIL" ? 'red' :
            mode === "TRAM" ? 'green' : '#ff570f';
}

function lisaaViiva(map, featureGroup, koordinaatit, vari = 'blue', visibility = 1, lineWeight = 3){
    var viiva = L.polyline(koordinaatit, { color: vari,
                                         opacity: visibility,
                                         weight: lineWeight
                                         }).addTo(featureGroup);
    featureGroup.addTo(map);   
}

function lisaaStopit(map, featureGroup, stops){ 
    
    //stopitLayer.clearLayers();
    //console.log(stopitLayer);
    stops.forEach( (t) => {
        L.marker([t.stop.lat, t.stop.lon], {
            icon: stopIcon
        }).bindPopup(t.stop.name).addTo(featureGroup);
    })
    featureGroup.addTo(map); 
}
/*
export function annaKoordinaattiArray(itinerary){
    let legCoordinateArray;
    itinerary.legs.forEach( leg =>{
    legCoordinateArray = polyline.decode(leg.legGeometry.points)
    return legCoordinateArray;
    })
    return legCoordinateArray;
}
*/
export function annaKoordinaattiArray(leg){
    let legCoordinateArray;
    legCoordinateArray = polyline.decode(leg.legGeometry.points);
    return legCoordinateArray;
}