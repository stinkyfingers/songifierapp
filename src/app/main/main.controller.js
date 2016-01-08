export class MainController {
  constructor (SongService, UserService, AppService) {
    'ngInject';

    this.$song = SongService;
    this.$user = UserService;
    this.$app = AppService;
    this.log_in = () => {this.login(this.creds)};
    this.log_out = () => {this.logout()};
    this.user = this.getUser();
    this.songs = this.getSongs();
  }

  getSongs(){
    this.$song.getSongs().then((resp) => {
      this.songs = resp.data;
    }, (err) => {
      this.$app.error(err.data);
    });
  }

  login(user){
    this.$user.login(user).then((resp) => {
        this.$app.setUser(resp.data);
        this.$app.setToken(resp.data.token);
        this.user = resp.data;
    }, (err) =>{
        this.$app.error(err.data);
    });
  }

  logout(){
    this.$app.logout();
    this.user = undefined;
  }

  getUser(){
    return this.$app.getUser();
  }

}
