app.directive('leafletDirective', function () {

   // var map = L.map('map').setView([51.505, -0.09], 13);

   // L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.outdoors/0/0/0.png?access_token=pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw', {
   //  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   //  maxZoom: 18,
   //  id: 'your.mapbox.project.id',
   //  accessToken: 'your.mapbox.public.access.token'
   //  }).addTo(map);
  
   //  var marker = L.marker([51.5, -0.09]).addTo(map);












  return {
    restrict: 'E',
    scope: {
      data: '=',
      markerCheck: '='
    },
    replace: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {
      var map = L.map(attrs.id, {
        center: [40, -105.38],
        zoomControl: false,
        zoom: 13
      })
      new L.Control.Zoom({ position: 'bottomright' }).addTo(map)

      L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.outdoors/0/0/0.png?access_token=pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw', {
        maxZoom: 18,
        id: 'https://api.mapbox.com/v4/paulsiskind.oh1cnj5g/page.html?access_token=pk.eyJ1IjoicGF1bHNpc2tpbmQiLCJhIjoiY2lobWxiMHI1MG90NXY1a2xxNnY2Znk3YSJ9.SfeALtaMIyM0YxvMolgvYw#11/39.1122/-107.0961',
        accessToken: token
      }).addTo(map)



      // var areaIcon = L.icon({
      //   iconUrl: '/images/marker.png',
      //   iconSize: [31.5, 35], // size of the icon
      //   iconAnchor: [15, 20], // point of the icon which will correspond to marker's location
      //   popupAnchor: [-3, -76]
      // })

      var geojsonLayer = L.geoJson(scope.data, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: areaIcon
          })
        }
      }).addTo(map)

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