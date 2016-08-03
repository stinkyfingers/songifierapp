export class MainController {
  constructor (SongService, UserService, AppService, $location, $route) {
    'ngInject';

    this.$song = SongService;
    this.$user = UserService;
    this.$app = AppService;
    this.$route = $route;
    this.log_in = () => {this.login(this.creds);};
    this.log_out = () => {this.logout();};
    this.user = this.getUser();
    this.songs = this.getSongs();
    this.checkToken();
    this.vote_options = ['Vote', 1, 2, 3, 4, 5];
    this.vote = (song, option) => {this.voteOnSong(song, option);};
    this.edit = (song) => {$location.path('/song/' + song.id);};
    this.addComment = (song) => {
      if(song.newComment === '' || angular.isUndefined(song.newComment)){
        return;
      }
      song.comments.push({text: song.newComment, user: this.user});
      this.updateSong(song);
    };
    this.setGenre = (genre) => {
      this.genre = genre;
    }
  }

  checkToken() {
    if (this.user && this.user.token) {
      return;
    }
    const token = this.$route.current.params.token ? this.$route.current.params.token : null;
    if (!token) {
      return;
    }
    const user = {
      token: token
    }
    this.$user.spotifyMe(token).then((resp) => {
      user.name = resp.data.display_name;
      this.$app.setUser(user);
    }, (err) => {
      this.$app.error(err.data);
    })
  }

  getSongs(){
    if (!this.user) {
      return;
    }
    this.$song.getSongs().then((resp) => {
      this.songs = resp.data;
      this.genres = this.parseGenres(resp.data);
      for (let i in this.songs){
        this.songs[i] = this.calcTotal(this.songs[i]);
      }
    }, (err) => {
      this.$app.error(err.data);
    });
  }

  calcTotal(song) {
    song.total = 0;
    song.user_vote = 'Vote';
    let count = 0;
    for (let j in song.votes){
      song.total += song.votes[j].rank;
      if (song.votes[j].rank && song.votes[j].rank > 0){
        count++;
      }
      if (song.votes[j].user && song.votes[j].user.id === this.user.id){
        song.user_vote = song.votes[j].rank;
      }
    }
    if (count){
      song.total = song.total/(count);
    }
    return song;
  }

  updateSong(song){
    this.$song.update(song).then((resp) => {
        this.$app.success('Song ' + resp.data.name + ' saved.');
        for (const i in this.songs) {
          if (this.songs[i].id === song.id) {
            this.songs[i] = this.calcTotal(song);
          }
        }
      }, (err) => {
        this.$app.error(err.data);
      });
  }

  voteOnSong(song, option){
    if (!option || option === 'Vote'){
      this.$app.error('Invalid vote value.');
      return;
    }
    for (let i in song.votes){
      if (song.votes[i].user.id === this.user.id){
        song.votes[i].rank = parseInt(option);
        return this.updateSong(song);
      }
    }
    if (!song.votes){
      song.votes = [];
    }
    song.votes.push({rank: parseInt(option), user: this.user});
        return this.updateSong(song);
  }

  deleteSong(song){
    this.$song.remove(song).then(() => {
      for (const i in this.songs) {
        if (this.songs[i].id === song.id) {
          this.songs.splice(i, 1);
        }
      }
    }, (err) => {
      this.$app.error(err);
    });
  }

  login(user){
    this.$user.login(user).then((resp) => {
        this.$app.setUser(resp.data);
        this.$app.setToken(resp.data.token);
        this.user = resp.data;
        this.$route.reload();
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

  parseGenres(songs){
    let genres = [];
    let genreIDs = [];
    for (let i in songs){
      if (songs[i].genre !== null && angular.isDefined(songs[i].genre) && genreIDs.indexOf(songs[i].genre.id) === -1){
        genres.push(songs[i].genre);
        genreIDs.push(songs[i].genre.id)
      }
    }
    return genres;
  }

}
