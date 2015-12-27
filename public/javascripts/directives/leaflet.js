// app.directive('leafletDirective', function () {

//    var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     maxZoom: 18,
//     id: 'paulsiskind.oh1cnj5g',
//     accessToken: 'pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw'
//     }).addTo(map);
  
//     var marker = L.marker([51.5, -0.09]).addTo(map);








 



app.directive('leafletDirective', function () {
  return {
    restrict: 'E',
    scope: {
      // data: '/api/v1/coData'
      // markerCheck: '='
    },
    replace: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {
      var map = L.map(attrs.id, {
        center: [ 39.56, -107.33],
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

      var areaIcon = L.icon({
        iconUrl: '/images/skull.jpeg',
        iconSize: [31.5, 35], // size of the icon
        iconAnchor: [15, 20], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76]
      })

      var geojsonLayer = L.geoJson(scope.data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: areaIcon
          })
        }
      }).addTo(map)
     //  $http.get('/api/v1/coData').then(function (response) {
     //  $scope.flows = {};
     //  $scope.coWaters = response.data;

     //    $scope.coWaters.map(function(d){
     // var marker = L.marker([d.lat, d.long]).addTo(map);

         
     //    })

     //    });


      scope.$watch('data', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          geojsonLayer.clearLayers()
          geojsonLayer.addData(scope.data)
        }
      }, true)

      function onEachFeature (feature, layer) {
        layer.on({
          click: function (e) {
            window.location = '/#/climbs/' + feature.id
          }
        })
      }
    }
  }
})