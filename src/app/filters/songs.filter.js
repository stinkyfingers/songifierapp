export class SongsFilter {
	constructor($log){
		'ngInject';
		return (songs, genre) => {
			$log.debug(songs, genre);
			if (!genre){
				$log.debug('here');
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
