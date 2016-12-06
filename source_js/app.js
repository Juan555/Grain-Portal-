var app = angular.module('kaleidoscope', ['rzModule', 'mm.foundation', 'ngRoute', 'kaleControllers', 'kaleServices', 'ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/firstview', {
        templateUrl: 'partials/firstview.html',
        controller: 'FirstController'
    }).
    when('/secondview', {
        templateUrl: 'partials/secondview.html',
        controller: 'SecondController'
    }).
    when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsController'
    }).
    when('/llamalist', {
        templateUrl: 'partials/llamalist.html',
        controller: 'LlamaListController'
    }).
    when('/soundtest', {
        templateUrl: 'partials/soundtest.html',
        controller: 'SoundTestController'
    }).
    when('/', {
        templateUrl: 'partials/mainpage.html',
        controller: 'MainPageController'
    }).
    when('/edit', {
        templateUrl:'partials/edit.html',
        controller: 'EditViewController'
    }).
    when('/view', {
        templateUrl:'partials/view.html',
        controller: 'EditViewController'
    }).
    otherwise({
        redirectTo: '/'
    });

    // $httpProvider.defaults.withCredentials = true;

}]);

app.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
});

/*
app.directive('panoramaDirective', function(){
  return{
    restrict: 'A',
    link: function(scope, element, attrs){
        $(element).pano({
          img: "../media/background_small.jpg"
      });
    }
  };
});
*/
