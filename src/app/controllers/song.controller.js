export class SongController {
  constructor (SongService, AppService) {
    'ngInject';
    this.$song = SongService;
    this.$app = AppService;
    this.genres = this.getGenres();
    this.save = () => {this.saveSong(this.song)};
    this.remove = () =>{ this.remove(this.song)};
  }

	getGenres (){
		this.$song.getGenres().then((resp) => {
			this.genres = resp.data;
		}, (err) => {
			this.$app.error(err.data);
		});
	}

	saveSong(song){
		if (!song){
			this.$app.error('No song provided.');
			return;
		}
		if (!song.comments){
			song.comments = [];
		}
		song.comments.push({text: this.comment, user: this.$app.getUser()});
		if (!song.id){
			this.$song.create(song).then((resp) => {
				this.song = {};
				this.comment = {}
				this.$app.success('Song ' + resp.data.name + ' added.');
			}, (err) => {
				this.$app.error(err.data);
			});
		} else {
			this.$song.update(song).then((resp) => {
				this.song = {};
				this.comment = {}
				this.$app.success('Song ' + resp.data.name + ' added.');
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

  
}
