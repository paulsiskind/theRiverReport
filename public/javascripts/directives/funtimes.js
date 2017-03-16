app.directive('gsAngularLogo', function() {
  return {
    restrict: "E",
    template: '<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/-YjonKQgkZU?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>',
    controller: function($scope){
      alert('tacos!')
    }
  };
});