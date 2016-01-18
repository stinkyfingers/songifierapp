

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { SongController } from './controllers/song.controller';
import { UserController } from './controllers/user.controller';
import { SongService } from '../app/services/song.service';
import { UserService } from '../app/services/user.service';
import { AppService } from '../app/services/app.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { SongsFilter } from '../app/filters/songs.filter';

angular.module('songifierapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngRoute', 'mm.foundation', 'toastr', 'LocalStorageModule'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('UserService', UserService)
  .service('SongService', SongService)
  .service('AppService', AppService)
  .controller('MainController', MainController)
  .controller('UserController', UserController)
  .controller('SongController', SongController)
  .directive('acmeNavbar', NavbarDirective)
  .filter('songsFilter', SongsFilter);
