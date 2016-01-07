export class SongService{
	constructor($http, AppService, UserService){
		'ngInject';
		this.$http = $http;
		this.api = AppService.api;
		this.$user = UserService;
		this.$app = AppService;
	}

	getSongs(){
		return this.$http({
			method: 'POST',
			url: this.api + '/songs',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:{}
		})
	}
}