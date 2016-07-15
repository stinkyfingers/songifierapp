

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { NameController } from './controllers/name.controller';
import { SongController } from './controllers/song.controller';
import { SongsController } from './controllers/songs.controller';
import { UserController } from './controllers/user.controller';
import { SongService } from '../app/services/song.service';
import { NameService } from '../app/services/name.service';
import { UserService } from '../app/services/user.service';
import { AppService } from '../app/services/app.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { SongsFilter } from '../app/filters/songs.filter';

angular.module('songifierapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngRoute', 'mm.foundation', 'toastr', 'LocalStorageModule'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('UserService', UserService)
  .service('NameService', NameService)
  .service('SongService', SongService)
  .service('AppService', AppService)
  .controller('MainController', MainController)
  .controller('NameController', NameController)
  .controller('UserController', UserController)
  .controller('SongController', SongController)
  .controller('SongsController', SongsController)
  .directive('acmeNavbar', NavbarDirective)
  .filter('songsFilter', SongsFilter);
