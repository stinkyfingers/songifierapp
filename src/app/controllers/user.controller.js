export class UserController {
  constructor (UserService, AppService) {
    'ngInject';

    this.$user = UserService;
    this.$app = AppService;
    this.user = this.getUser();
  }

  getUser(){
	return this.user = this.$app.getUser();
  }
  
}
