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
			method: 'GET',
			url: this.api + '/songs',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:{}
		})
	}

	getSong(song){
		return this.$http({
			method: 'GET',
			url: this.api + '/song/' + song.id,
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			}
		})
	}

	create(song){
		return this.$http({
			method: 'POST',
			url: this.api + '/song',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:song
		})
	}

	update(song){
		return this.$http({
			method: 'PUT',
			url: this.api + '/song',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:song
		})
	}


	remove(song){
		return this.$http({
			method: 'DELETE',
			url: this.api + '/song',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:song
		})
	}


	getGenres(){
		return this.$http({
			method: 'GET',
			url: this.api + '/genres',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			}
		})
	}

	createGenre(genre){
		return this.$http({
			method: 'POST',
			url: this.api + '/genre',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:genre
		})
	}

	deleteGenre(genre){
		return this.$http({
			method: 'DEL',
			url: this.api + '/genre',
			headers: {
				'Token': 'Bearer: ' + this.$app.getToken()
			},
			data:genre
		})
	}
}