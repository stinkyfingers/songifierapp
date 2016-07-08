export class SongsController {
	constructor (SongService, AppService, $routeParams, $location) {
		'ngInject';
		this.$song = SongService;
		this.$app = AppService;
		this.$location = $location;

		this.songs = [{
			name: '',
			artist: '',
			youtube: '',
			comments: ''
		}];

		this.increaseSongs = () => {
			this.songs.push({});
		}
		this.cancel = () => {
			this.songs = undefined;
			this.$location.path('/');
		}

		this.save = () => {
			this.saveSongs(this.songs);
		};
	}

	saveSongs(songs) {
		const user = this.$app.getUser();
		for (const i in songs) {
			if (!songs[i].comments){
				songs[i].comments = [];
			}
			if(songs[i].comment){
				songs[i].comments.push({text: songs[i].comment, user: user});
			}
			songs[i].user = user;
			songs[i].link = songs[i].youtube;
			this.$song.create(songs[i]).then(() => {}, (err) => {
				this.error = err;
				return;
			})
		}
		this.songs = undefined;
		this.$location.path('/');
	}

}
