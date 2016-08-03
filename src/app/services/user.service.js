export class UserService{
	constructor ($http, AppService) {
    'ngInject';
    this.$http = $http;
    this.api = AppService.api;
    this.$app = AppService;
    
  }
	spotifyMe(token) {
		return this.$http({
			method: 'GET',
			url: this.api + '/spotify/me?token=' + token
		})
	}
	

}