export class SongController {
  constructor (SongService, AppService, $routeParams) {
    'ngInject';
    this.$song = SongService;
    this.$app = AppService;
    this.genres = this.getGenres();
    this.save = () => {this.saveSong(this.song)};
    this.remove = () =>{ this.remove(this.song)};
    if ($routeParams.id){
		this.getSong({'id': $routeParams.id});
    }
    this.saveGenre = () => {this.createGenre(this.genre);};
  }

	getGenres (){
		this.$song.getGenres().then((resp) => {
			this.genres = resp.data;
		}, (err) => {
			this.$app.error(err.data);
		});
	}

	getSong(song){
		this.$song.getSong(song).then((resp) => {
			this.song = resp.data;
		}, (err) => {
			this.$app.error(err.data);
		});
	}

	saveSong(song){
		if (!song){
			this.$app.error('No song provided.');
			return;
		}
		song.user = this.$app.getUser();

		if (!song.comments && this.comment){
			song.comments = [];
		}
		if(this.comment){
			song.comments.push({text: this.comment, user: this.$app.getUser()});
		}
		if (!song.id){
			this.$song.create(song).then((resp) => {
				this.song = {};
				this.comment = {}
				this.$app.success('Song ' + resp.data.name + ' added.');
				this.song = undefined;
				this.comment = undefined;
			}, (err) => {
				this.$app.error(err.data);
			});
		} else {
			this.$song.update(song).then((resp) => {
				this.song = {};
				this.comment = {}
				this.$app.success('Song ' + resp.data.name + ' saved.');
				this.song = undefined;
				this.comment = undefined;
			}, (err) => {
				this.$app.error(err.data);
			});
		}
	}

	remove(song){
		this.$song.remove(song).then(()=> {

		}, (err) => {
			this.$app.error(err.data);
		});
	}

	createGenre(genre){
		this.$song.createGenre(genre).then((resp) => {
			if (!this.genres){
				this.genres = [];
			}
			this.genres.push(resp.data);
			this.genre = undefined;
			this.genreEditor = undefined;
		}, (err) => {
			this.genreEditor = undefined;
			this.$app.error(err);
		});
	}

  
}
