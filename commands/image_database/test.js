const commando = require('discord.js-commando');

module.exports = class Test extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'admin',
			memberName: 'test',
			description: "Vérifier l'age d'un nouveau membre.",
			details: `utilisable une seule fois dans le Hall d'entrée.
Attribut le role "Membres" si l'utilisateur est vérifié. `,
			examples: ["```?age 16```"]
		});
	}

	async run(msg){
	}
}
