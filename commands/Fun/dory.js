const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Dory extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dory',
			group: 'fun',
			memberName: 'dory',
			description: "Vous voulez vous prendre pour Dory ?",
			details: "Utilisez la commande `?dory` et vous saurez imiter la baleine !"
			});
	}

	async run(msg, args){
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
		let message_list = messages.findAll('content', 'dory');
		let choose = Math.round(Math.random() * message_list.length);
		if (choose >= message_list.length){
			choose -= 1;
		}
		let message = message_list[choose];
		let url = message.attachments.array();
		const embed = new Discord.RichEmbed()
		.setTitle(`${msg.author.username} se prend pour Dory`)
		.setColor(0xE70AC8)
		.setImage(url[0].url)
		msg.channel.send(embed);
	}
}
