

app.directive('leafletDirective', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {
      var map = L.map(attrs.id, {
        center: [40, -105.38],
        zoomControl: false,
        zoom: 10
      })
      new L.Control.Zoom({ position: 'bottomright' }).addTo(map)


      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        minZoom: 3,
        id: 'paulsiskind.oh1cnj5g',
        accessToken: 'pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw'
      }).addTo(map)
       
  

        $.getJSON('api/v1/coData',function(data){
         var skullMarker = L.icon({
         iconUrl: '/images/marker.png',
         iconSize: [31.5,35]
       });
       var riverMarkers = L.geoJson(data,{
          pointToLayer: function(feature,latlng){
          var marker = L.marker(latlng,{icon: skullMarker});
       


          marker.bindPopup('<a href=/'+feature.id+">" + feature.name + '<br/>' + feature.nameProper);
          return marker;
        }
      })
       var clusters = L.markerClusterGroup();
       clusters.addLayer(riverMarkers);
       map.addLayer(clusters);
       })
   

    }
  }
})