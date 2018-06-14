const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Roll extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'fun',
			memberName: 'roll',
			description: "Roll les dés",
			details: "Utilisez la commande `?roll` pour faire un lancer de dés",
			args: [
				{
					key: 'value',
					prompt: 'Le nombre du dés',
					type: 'integer',
					default: 6,
				}
			]
		});
	}

	async run(msg, args){
		if (msg.guild == undefined)
		{
			msg.channel.send("Je suis désolée my Master, mais vous ne pouvez pas encore me parler\n");
			return ;
		}
		if (!(msg.content.startsWith("?")))
			return ;
		let result = Math.round(Math.random() * args.value);
		msg.channel.send(`Vous avez obtenu un score de ${result} / ${args.value}`);
		return ;
	}
}
