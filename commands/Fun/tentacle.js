const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Tentacle extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tentacle',
			group: 'fun',
			memberName: 'tentacle',
			description: "L'héritage ancestral du Tentacle no Jutsu",
			details: "Utilisez la commande `?boobs` pour INVOQUER LA PUISSANCE DES TENTACULES",
			args: [
				{
					key: 'member',
					prompt: 'La personne que vous voulez tentaculer <3',
					type: 'user',
					default: '',
				},
				{
					key: 'extra',
					prompt: 'Extra Text in command',
					type: 'string',
					default: '',
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
		let gif_server = msg.client.guilds.find('name', 'ikaros-dev');
		if (gif_server == undefined){
			msg.reply("Une erreur est survenue, veuillez contacter <@219011984878731264> merci");
			return ;
		}
		let gif_channel = gif_server.channels.find('name', 'gifs');
		if (gif_channel == undefined){
			msg.reply("Une erreur est survenue, veuillez contacter <@219011984878731264> merci");
			return ;
		}
		let messages = await gif_channel.fetchMessages({limit: 100});
		let newMessages;
		let listSize = messages.size - 1;
		let lastMess = messages.last();
		while (listSize != messages.size){
			newMessages = await gif_channel.fetchMessages({limit: 100, before: lastMess.id});
			listSize = messages.size;
			messages = messages.concat(messages, newMessages);
			lastMess = messages.last();
		}
        let message_list = messages.findAll('content', 'tentacle');
		let choose = Math.round(Math.random() * message_list.length);
		if (choose >= message_list.length){
			choose -= 1;
		}
        let message = message_list[choose];
        if (message == undefined)
        {
            msg.channel.send("Aucune animation n'est disponible");
            return ;
        }
        let url = message.attachments.array();
		let str;
		if (args.member.length == 0)
			str = `${msg.author} se fait dominer par ses tentacules`;
		else
			str = `${msg.author} envoie ses tentacules sur ${args.member}`;
		const embed = new Discord.RichEmbed()
		.setDescription(str)
		.setColor(0xE70AC8)
		.setImage(url[0].url)
        msg.channel.send(embed);
	}
}