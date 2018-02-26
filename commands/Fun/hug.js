const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Hug extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'fun',
			memberName: 'hug',
			description: "Faites un calin a la personne de votre choix <3",
			details: "Utilisez la commande `?hug` pour faire un calin a une personne que vous aimez",
			args: [
				{
					key: 'member',
					prompt: 'La personne que vous voulez caliner <3',
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
        let message_list = messages.findAll('content', 'hug');
		let choose = Math.round(Math.random() * message_list.length);
		if (choose >= message_list.length){
			choose -= 1;
		}
        let message = message_list[choose];
        if (message == undefined)
            return ;
		let url = message.attachments.array();
		let str;
		if (args.member.length == 0)
			str = `${msg.author} fait un calin dans le vide`;
		else
			str = `${msg.author} caline avec amour ${args.member}`;
		const embed = new Discord.RichEmbed()
		.setDescription(str)
		.setColor(0xE70AC8)
		.setImage(url[0].url)
        msg.channel.send(embed);
	}
}