let MapboxClient = require('mapbox')
let client = new MapboxClient('pk.eyJ1IjoibXZhc2lseWV2YSIsImEiOiJjaW51dnV3eDUxMm5jdWdseXR3dW1wazRoIn0.l7HVScO-ipfCEwOmvDuGsg')
client.geocodeForward('Chester, NJ', function (err, res) {
  // res is the geocoding result as parsed JSON 
})
