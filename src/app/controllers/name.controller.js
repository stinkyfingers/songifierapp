export class NameController {
	constructor (NameService, AppService, $routeParams, $location) {
		'ngInject';
		this.$name = NameService;
		this.$app = AppService;
		this.$location = $location;
		this.names = this.getNames();

		this.save = () => {this.createName();}
		this.delete = (name) => {
			this.deleteName(name);
		}


	}

	getNames() {
		this.$name.getNames().then((resp) => {
			this.names = resp.data;
		}, (err) => {
			this.error = err;
		});
	}

	createName() {
		this.name.user = this.$app.getUser();
		this.$name.createName(this.name).then((resp) => {
			if (!this.names) {
				this.names = [];
			}
			this.names.push(resp.data);
			this.name = null;
		}, (err) => {
			this.error = err;
		});
	}

	deleteName(name) {
		this.$name.deleteName(name).then(() => {
			for (const i in this.names) {
				if (this.names[i].id === name.id) {
					this.names.splice(i, 1);
				}
			}
		}, (err) => {
			this.error = err;
		});
	}

}
