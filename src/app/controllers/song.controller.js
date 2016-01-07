export class SongController {
  constructor (SongService) {
    'ngInject';
    this.$song = SongService;
    this.genres = this.getGenres();
    this.save = () => {this.save(this.song)};
    this.remove = () =>{ this.remove(this.song)};
  }

	getGenres (){
		this.$song.getGenres().then((resp) => {
			this.genres = resp.data;
		}, (err) => {

		});
	}

	save(song){
		if (!song){
			//err
		}
		if (song.id){
			this.$song.create(song).then((resp) => {
				this.song = resp.data;
			}, (err) => {

			});
		} else{
			this.$song.update(song).then((resp) => {
				this.song = resp.data;
			}, (err) => {

			});
		}
	}

	remove(song){
		this.$song.remove(song).then(()=> {

		}, (err) => {

		});
	}

  
}
