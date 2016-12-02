var app = angular.module('kaleidoscope', ['ngRoute', 'kaleControllers', 'kaleServices', 'ngDragDrop']);

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
    otherwise({
        redirectTo: '/'
    });
}]);
