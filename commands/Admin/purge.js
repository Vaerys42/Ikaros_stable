const commando = require('discord.js-commando');

module.exports = class purge extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			group: 'admin',
			memberName: 'purge',
			description: "Permet de supprimer un nombre donné de messages dans le channel",
            details: "Faire `?puge nb_messages` pour supprimer le nombre associé de messages",
			examples: ["?purge nb"],
			args:
			[
				{
					key: 'nb',
					prompt: 'The number of messages that will be delete',
					type: 'float',
					default: '0'
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
		if (!(msg.content.startsWith("?purge")))
			return ;
		if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
			msg.reply("Vous n'avez pas la permission d'utiliser cette commande");
			return ;
        }
        if (args.nb < 0 || args.nb > 100)
        {
            msg.channel.send("Merci de donner un nombre correct de messages a supprimer, My Master (entre 0 et 100)");
            return ;
		}
		let messages = await msg.channel.fetchMessages({limit :args.nb + 1});
		messages.array().forEach(message => {
			message.delete();
		});
	}	
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
