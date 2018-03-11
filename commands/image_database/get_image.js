const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class getImage extends commando.Command{
	constructor(client) {
		super(client, {
			name: 'img',
			group: 'image',
			memberName: 'getimage',
			description: 'Get images from Ikaros server and put URL in file',
			details: "Pour faire une recherche d'images, utiliser la commande \n ```?img anal```\npar exemple.\nPour obtenir la liste des tags, utiliser la commande\n ```?img tags```\n. Pour finir, si vous désirez connaitre le nombre d'images dans la base de données, utiliser la commande \n```?img anal nb```",
			examples: ["?img anal", "?img mizugi"],
			args:
			[
				{
					key: 'tag',
					prompt: 'the tag that will be search',
					type: 'string',
					default: 'tags',
				},
				{
					key: 'nb',
					prompt: 'The number of images in channel',
					type: 'string',
					default: '',
				}
			]
		});
	}
	async run(msg, args){
		if (msg.guild == undefined)
		{
			msg.channel.send("Les commandes d'images doivent être utilisées sur le serveur, My Master\n");
			return ;
		}
		if (!(msg.content.startsWith("?")))
			return ;
		if (msg.channel.nsfw == false){
			msg.channel.send("```Merci d'utiliser les commandes d'images dans les channels adaptés, My Master.```");
			return ;
		}
		const img_server = msg.client.guilds.find('name', 'ikaros-dev');
		if (args.tag == 'tags'){
			let tags_list = "";
			let tags_tab = [];
			img_server.channels.forEach(channel => {
				if (channel.nsfw == true){
					tags_tab.push({
						value : `${channel.name}`
					})
				}
			});
			tags_tab.sort(((function(a, b){
			if(a.value < b.value) return -1;
			if(a.value > b.value) return 1;
			return 0;
			})));
			tags_tab.forEach(name => {
				let chan_name = name.value.substring(5, name.value.length);
				tags_list += chan_name + "\n";
			})
			msg.channel.send({
				embed :{
					color : 0x50f0b0,
					fields :[{
						name: "Liste des tags",
						value: `${tags_list}`,
					}],
				}
			})
			return ;
		}
		let bot = msg.guild.members.find('id', '390451747027681300');
		bot = bot.user;
		if (bot.username == "Monika"){
			monika_image(msg, img_server);
			return ;
		}
		const channel = getChannelRequest(img_server, args.tag);
		if (channel == undefined){
			msg.channel.send("```Merci de demander un tag valide, My Master```");
			return ;
		}
		let messages = await channel.fetchMessages({limit: 100});
		if (messages.size == 0){
			msg.channel.send("```Aucune image de cette catégorie n'est disponble, My Master.```");
			return ;
		}
		let newMessages;
		let listSize = messages.size - 1;
		let lastMess = messages.last();
		while (listSize != messages.size){
			newMessages = await channel.fetchMessages({limit: 100, before: lastMess.id});
			listSize = messages.size;
			messages = messages.concat(messages, newMessages);
			lastMess = messages.last();
		}
		if (args.nb == 'nb'){
			msg.channel.send(`\`\`\`Il y a ${messages.size} images dans la base de données de la catégorie ${args.tag}, My Master\`\`\``);
			return ;
		}
		const images = messages.array();
		let select_image = Math.round(Math.random() * images.length);
		if (select_image >= images.length){
			select_image -= 1;
		}
		let image = images[select_image];
		if (image == undefined){
		msg.channel.send("```Une erreur est apparue, veuillez rééssayer, My Master```");
			console.log(`Error report : ${select_image}`);
			return ;
		}
		image = image.attachments.array();
		const embed = new Discord.RichEmbed()
		.setColor(0xE70AC8)
		.setImage(image[0].url)
		msg.channel.send(embed);
	}
}

function getChannelRequest(img_server, tag){
	let channel_name = 'nsfw-' + tag;
	let img_chan = img_server.channels.find('name', channel_name);
	return img_chan;
}

async function monika_image(msg, img_server){
	const monika_channel = img_server.channels.find('name', 'monika');
	if (monika_channel == undefined)
		return ;
	let monika_message = await monika_channel.fetchMessage('422235115247370251');
	monika_message = monika_message.attachments.array();
	const monika_embed = new Discord.RichEmbed()
	.setTitle("Reste avec moi. Je ne veux pas que tu me quittes")
	.setColor(0xE70AC8)
	.setImage(monika_message[0].url)
	msg.channel.send(monika_embed);
}