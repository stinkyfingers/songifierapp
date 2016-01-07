export class AppService{
	constructor(localStorageService){
		'ngInject';
		this.api = 'http://localhost:8080';
		this.storage = localStorageService;
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

	
}