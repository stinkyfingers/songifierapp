export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      tab: 'main'
    })
    .when('/song',{
      templateUrl: 'app/song/song.html',
      controller: 'SongController',
      controllerAs: 'song',
      tab: 'song'
    })
    .when('/song/:id',{
      templateUrl: 'app/song/song.html',
      controller: 'SongController',
      controllerAs: 'song',
      tab: 'song'
    })
    .when('/songs',{
      templateUrl: 'app/song/songs.html',
      controller: 'SongsController',
      controllerAs: 'songs',
      tab: 'songs'
    })
    .when('/user',{
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'user',
      tab: 'user'
    })
    .otherwise({
      redirectTo: '/'
    });
}
