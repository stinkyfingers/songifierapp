export function config ($logProvider, toastrConfig, $locationProvider, localStorageServiceProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  $locationProvider.html5Mode({
    enabled:true
  });

  localStorageServiceProvider.setPrefix('songifier');

}
