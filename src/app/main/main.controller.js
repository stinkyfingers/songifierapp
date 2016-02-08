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
    this.vote_options = [1,2,3,4,5];
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

  getSongs(){
    this.$song.getSongs().then((resp) => {
      this.songs = resp.data;
      this.genres = this.parseGenres(resp.data);
      for (let i in this.songs){
        this.songs[i].total = 0;
        let count = 0;
        for (let j in this.songs[i].votes){
          this.songs[i].total += this.songs[i].votes[j].rank;
          if (this.songs[i].votes[j].rank && this.songs[i].votes[j].rank > 0){
            count++;
          }
          if (this.songs[i].votes[j].user && this.songs[i].votes[j].user.id === this.user.id){
            this.songs[i].user_vote = this.songs[i].votes[j].rank;
          }
        }
        if (count){
          this.songs[i].total = this.songs[i].total/(count);
        }
      }
    }, (err) => {
      this.$app.error(err.data);
    });
  }

  updateSong(song){
    this.$song.update(song).then((resp) => {
        this.$app.success('Song ' + resp.data.name + ' saved.');
      }, (err) => {
        this.$app.error(err.data);
      });
  }

  voteOnSong(song, option){
    if (!option){
      this.$app.error('Invalid value.');
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

  updateSong(song){
    this.$song.update(song).then(() => {
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
      if (songs[i].genre !== null && !angular.isUndefined(songs[i].genre) && genreIDs.indexOf(songs[i].genre.id) === -1){
        genres.push(songs[i].genre);
        genreIDs.push(songs[i].genre.id)
      }
    }
    return genres;
  }

}
