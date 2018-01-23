const commando = require('discord.js-commando');

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
		const channel = getChannelRequest(img_server, args.tag);
		if (channel == undefined){
			msg.channel.send("```Merci de demander un tag valide, My Master```");
			return ;
		}
		channel.fetchMessages({limit: 100})
		.then(messages => {
			if (args.nb == 'nb'){
				msg.channel.send(`\`\`\`Il y a ${messages.size} images (ou plus) dans la base de données de la catégorie ${args.tag}, My Master\`\`\``);
				return ;
			}
			if (messages.size == 0){
				msg.channel.send("```Aucune image de cette catégorie n'est disponble, My Master.```");
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
			msg.channel.send(image[0].url);
		});
	}
}

function getChannelRequest(img_server, tag){
	let channel_name = 'nsfw-' + tag;
	let img_chan = img_server.channels.find('name', channel_name);
	return img_chan;
}
