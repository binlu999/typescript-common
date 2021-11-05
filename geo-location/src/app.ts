import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const gapikey = "";

//No longer needed after @types/googlemaps
//declare var google:any;

//declare var ol:any;

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[],
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const address = addressInput.value;
    console.log(`Address inputed is ${address}`);

    //Use 3rd party lib to get address
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address
    )}&key=${gapikey}`
    ).then(response => {
        console.log("response");
        console.log(response);
        if (response.data.status !== 'OK') {
            throw new Error("Could not find location");
        }
        const coordinates = response.data.results[0].geometry.location;
        console.log(`Coordinates is ${coordinates.lat} and ${coordinates.lng}`);
        const map = new google.maps.Map(document.getElementById("map")!,
            {
                center: coordinates,
                zoom: 16
            });

        //const image =
        //    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const image = "beachflag.png";

        new google.maps.Marker(
            {
                position: coordinates,
                map: map,
                title: 'Location',
                icon:image
            })

    }).catch(err => {
        console.log("error");
        console.log(err);
        console.log(err.message);
    });
}

//https://openlayers.org/en/latest/doc/quickstart.html).
/*

function searchAddressHandlerOL(event: Event) {
    event.preventDefault();
   
    const coordinates = {lat: 29.76061, lng: -95.36456}; // Can't fetch coordinates from Google API, use dummy ones
   
    document.getElementById('map')!.innerHTML = ''; // clear <p> from <div id="map">
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
        zoom: 16
      })
    });
  }
*/
form.addEventListener('submit', searchAddressHandler);