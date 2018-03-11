const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Smile extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'smile',
			group: 'fun',
			memberName: 'smile',
			description: "Bah....un sourire quoi xD",
			details: "Utilisez la commande `?smile` et vous transmettrez votre sourire a votre entourage",
			examples: ["```?smile```"]
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
		if (await is_monika(msg) == 1)
			return ;
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
		let message_list = messages.findAll('content', 'smile');
		let choose = Math.round(Math.random() * message_list.length);
		if (choose >= message_list.length){
			choose -= 1;
		}
		let message = message_list[choose];
		let url = message.attachments.array();
		const embed = new Discord.RichEmbed()
		.setColor(0xE70AC8)
		.setImage(url[0].url)
		msg.channel.send(embed);
	}
}

async function is_monika(msg){
	let bot = msg.guild.members.find('id', '393898001577410561');
	bot = bot.user;
	if (bot.username != "Monika")
		return (0);
	const img_server = msg.client.guilds.find('name', 'ikaros-dev');
	const monika_channel = img_server.channels.find('name', 'monika');
	if (monika_channel == undefined)
		return ;
	let monika_message = await monika_channel.fetchMessages({limit: 1});
	monika_message = monika_message.attachments.array();
	const monika_embed = new Discord.RichEmbed()
	.setTitle("Reste avec moi. Je ne veux pas que tu me quittes")
	.setColor(0xE70AC8)
	.setImage(monika_message[0].url)
	msg.channel.send(monika_embed);
	return (1);
}
