

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { SongController } from './controllers/song.controller';
import { UserController } from './controllers/user.controller';
// import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { SongService } from '../app/services/song.service';
import { UserService } from '../app/services/user.service';
import { AppService } from '../app/services/app.service';
// import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
// import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('songifierapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngRoute', 'mm.foundation', 'toastr', 'LocalStorageModule'])
  // .constant('malarkey', malarkey)
  // .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  // .service('githubContributor', GithubContributorService)
  .service('UserService', UserService)
  .service('SongService', SongService)
  .service('AppService', AppService)
  // .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .controller('UserController', UserController)
  .controller('SongController', SongController)
  .directive('acmeNavbar', NavbarDirective);
  // .directive('acmeMalarkey', MalarkeyDirective);
