export class NameService{
	constructor($http, AppService, UserService){
		'ngInject';
		this.$http = $http;
		this.api = AppService.api;
		this.$user = UserService;
		this.$app = AppService;
	}

	getNames(){
		return this.$http({
			method: 'GET',
			url: this.api + '/names',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:{}
		})
	}

	createName(name){
		return this.$http({
			method: 'POST',
			url: this.api + '/name',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:name
		})
	}

	deleteName(name){
		return this.$http({
			method: 'DELETE',
			url: this.api + '/name?id=' + name.id,
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:{}
		})
	}
}
