export class AppService{
	constructor(localStorageService, toastr){
		'ngInject';
		this.api = 'http://localhost:8080';
		this.storage = localStorageService;
		this.$toast = toastr;
	}

	setToken(token){
		this.storage.set('token', token);
	}
	getToken(){
		return this.storage.get('token');
	}
	setUser(user){
		this.storage.set('user', user);
	}
	getUser(){
		return this.storage.get('user');
	}
	logout(){
		return this.storage.clearAll();
	}

	success(msg){
		this.$toast.success(msg);
	}
	
	error(msg){
		this.$toast.error(msg);
	}
}