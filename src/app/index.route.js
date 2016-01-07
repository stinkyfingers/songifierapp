export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .when('/song',{
      templateUrl: 'app/song/song.html',
      controller: 'SongController',
      controllerAs: 'song'
    })
    .when('/user',{
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .otherwise({
      redirectTo: '/'
    });
}
