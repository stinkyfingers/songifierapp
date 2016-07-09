export class SongsFilter {
	constructor(){
		'ngInject';
		return (songs, genre) => {
			if (!genre){
				return songs;
			}
			let result = [];
			for (let i in songs){
				if (songs[i].genre.id === genre.id){
					result.push(songs[i]);
				}
			}

			return result;
		}
	}
}
