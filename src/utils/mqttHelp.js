export function muodostaTopic(leg){
    //console.log(leg.route.shortName);
    //console.log(leg.trip.stoptimes[0].realtimeDeparture);
    var formatoituNro= leg.route.gtfsId.substring(4);
    var aika = leg.trip.stoptimes[0].realtimeDeparture
                
    var tunnit = Math.floor(aika/60/60);
    var minuutit= (aika - tunnit * 60*60)/60;
    if (minuutit < 10){
        minuutit= "0"+minuutit;
    }
    if (tunnit < 10){
        tunnit= "0"+tunnit;
    }
    let startTime= tunnit+":"+minuutit;
    //console.log(startTime);
    //console.log(leg.trip.stoptimes[0].stop.name);
    var mqttDirection = parseInt(leg.trip.directionId) +1;
    //console.log(mqttDirection);
               
    var topic = "/hfp/v1/journey/ongoing/+/+/+/" + formatoituNro + "/"+mqttDirection+"/+/"+startTime+"/+/+/#";
    return topic;
}