export class UserService{
	constructor ($http, AppService) {
    'ngInject';
    this.$http = $http;
    this.api = AppService.api;
    
  }
	login(user){
		return this.$http({
			method: 'POST',
			url: this.api + '/user',
			data: user
		})
	}
	
}