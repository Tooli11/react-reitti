export function timeToHM(sekuntiAika){
    // sekuntiaika on  millisekunteissa,jotta date toimii
    //timeToHM from long unix
    //timeToHoursAndMinutes muotoon luettavaksi
    //sekuntiaika == unix aika
    var aika = new Date(sekuntiAika);
    //If no arguments are provided, the constructor creates a JavaScript Date object for the current date and time according to system settings for timezone offset.
    var aikaTeksti = aika.toString();
    //console.log(aikaTeksti);
    var pilkottu= aikaTeksti.split(" ");
    //console.log(pilkottu);
    return pilkottu[4].substring(0,5); //palauttaa ajan muodossa hh:mm.
}
export function laskeKesto(sekuntiAika){
    //laskee kaikki kestot
    var kesto = Math.round(sekuntiAika/60);
          if (kesto > 60){
              var tunnit = Math.floor(kesto/ 60);
              var minuutit = kesto- (tunnit*60);
              kesto = tunnit+ " h "+minuutit+" min";
          }else {
              kesto = kesto+" min";
          }
    return kesto; 
}






