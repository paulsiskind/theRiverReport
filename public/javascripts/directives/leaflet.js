

app.directive('leafletDirective', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {
      var map = L.map(attrs.id, {
        
        zoomControl: false,
        zoom: 13
      })
      new L.Control.Zoom({ position: 'bottomright' }).addTo(map)

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        minZoom: 3,
        id: 'paulsiskind.oh1cnj5g',
        accessToken: 'pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw'
      }).addTo(map)
       map.locate({setView: true, maxZoom: 12});
  

        $.getJSON('api/v1/coData',function(data){
         var skullMarker = L.icon({
         iconUrl: '/images/marker.png',
         iconSize: [31.5,35]
       });
       var riverMarkers = L.geoJson(data,{
          pointToLayer: function(feature,latlng){
          var marker = L.marker(latlng,{icon: skullMarker});
        //     var flows = {};
           
        //    console.log(typeof feature)

        //     feature.map(function(d){

        //   return $.getJSON('//waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ d.USGSid +'&parameterCd=00060,00065').then(function(response){
        //     flows[d.name] = response.data.value.timeSeries[0].values[0].value[0].value;
        //     console.log(flows, 'Picles')
        //   });

        // });


          marker.bindPopup('<a href=/'+feature.id+">" + feature.name + '<br/>' + feature.nameProper);
          return marker;
        }
      })
       var clusters = L.markerClusterGroup();
       clusters.addLayer(riverMarkers);
       map.addLayer(clusters);
       })
   
//    L.mapbox.accessToken = 'pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw';
//    var map = L.mapbox.map('map', 'mapbox.streets', {
//     zoomControl: false
// });

//      var directions = L.mapbox.directions();

//      var directionsLayer = L.mapbox.directions.layer(directions)
//     .addTo(map);

//     var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
//     .addTo(map);

//     var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
//     .addTo(map);

//     var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
//     .addTo(map);

//     var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
//     .addTo(map);
    }
  }
})