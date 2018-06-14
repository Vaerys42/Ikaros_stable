const Commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EventHandler {
	constructor(client){
		this.getUserArrive(client);
		this.getDeleteMessage(client);
		this.getDeleteRole(client);
		this.getNewUser(client);
		this.userLeave(client);
		this.getNewRole(client);
		this.userBan(client);
		this.userUnban(client);
		this.getMemberUpdate(client);
		this.mentionMessage(client);
		this.addReaction(client);
	}
	getUserArrive(client){
		client.on('guildMemberAdd', member => {
			const channel = member.guild.channels.find('name', 'hall_d_entree');
			if (!channel)
				return ;

				const command = '```?age 16```'
				channel.send(
					`Bonjour <@${member.id}> et bienvenue sur le serveur L'Antre de la Succube !
Je t'invite a nous indiquer ton age avec la commande suivante avant de recevoir plus d'informations.
Exemple :
${command}
Si tu as 16 ans.

PS : Si tu es mineur, sois honnête, tu ne seras pas banni du serveur`);
	});
	}
	getDeleteMessage(client) {
		client.on('messageDelete', message => {
			if (message.author.bot == true){
				return ;
			}
		const logs_channel = message.guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setTitle("Log - Message supprimé")
		.setColor(0x50f0b0)
		.addField("Channel:", `Message supprimé dans ${message.channel}`)
		.setFooter("© Ikaros, L'Antre de la Succube")
		.setTimestamp();
		if (message.content.length != 0)
			embed.addField("Message:", `${message.content}`);
		else
			embed.addField("Image supprimée", ":arrow_down: :arrow_down: :arrow_down:");
		if (message.attachments.size != 0){
			let image = message.attachments.array();
			embed.setImage(image[0].url);
		}
		embed.addField("Auteur:", `${message.author}`);
		embed.addField("Date:", `${message.createdAt}`);
		logs_channel.send(embed);
	});
};
	getNewUser(client){
	client.on('guildMemberAdd', membre => {
		const logs_channel = membre.guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setColor(0x50f0b0)
		.addField("Log - Nouveau membre", `Le membre ${membre} a rejoint le serveur`)
		.setTimestamp()
		.setFooter("© Ikaros, L'Antre de la Succube");
		logs_channel.send(embed);
	});
};
	userLeave(client){
	client.on('guildMemberRemove', membre =>{
		const logs_channel = membre.guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setColor(0x50f0b0)
		.addField("Log - Membre parti", `Le membre ${membre} a quitté le serveur`)
		.setTimestamp()
		.setFooter("© Ikaros, L'Antre de la Succube");
		logs_channel.send(embed);
	});
};
	getNewRole(client){
	client.on('roleCreate', role => {
		const logs_channel = role.guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setColor(0x50f0b0)
		.addField("Log - Nouveau role", `Le role ${role} a été créé.`)
		.setTimestamp()
		.setFooter("© Ikaros, L'Antre de la Succube");
		logs_channel.send(embed);
	});
};
	getDeleteRole(client) {
		client.on('roleDelete', role => {
		const logs_channel = role.guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setColor(0x50f0b0)
		.addField("Log - Suppression role", `Le role ${role} a été supprimé.`)
		.setTimestamp()
		.setFooter("© Ikaros, L'Antre de la Succube");
		logs_channel.send(embed);
	});
};
	getMemberUpdate(client){
	client.on('guildMemberUpdate', function(oldMember, newMember){
		const logs_channel = oldMember.guild.channels.find('name', 'logs');
		let oldRole = oldMember.roles.array();
		let newRole = newMember.roles.array();
		oldRole = oldRole.sort();
		newRole = newRole.sort();
		if (oldRole.length == newRole.length){
			console.log(oldRole.length);
			return ;
		}
		else if (oldRole.length < newRole.length){
			memberGetRole(oldRole, newRole, newMember, logs_channel);
			return ;
		}
		memberRemoveRole(oldRole, newRole, newMember, logs_channel);
	});
};
	userBan(client){
	client.on('guildBanAdd', function(guild, user){
		const logs_channel = guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setColor(0x50f0b0)
		.addField("Log - Membre banni", `Le membre ${user} a été banni du serveur`)
		.setTimestamp()
		.setFooter("© Ikaros, L'Antre de la Succube");
		logs_channel.send(embed);
	})
};
	userUnban(client){
	client.on('guildBanRemove', function(guild, user){
		const logs_channel = guild.channels.find('name', 'logs');
		let embed = new Discord.RichEmbed()
		.setColor(0x50f0b0)
		.addField("Log - Membre débanni", `Le membre ${user} a été débanni du serveur`)
		.setTimestamp()
		.setFooter("© Ikaros, L'Antre de la Succube");
		logs_channel.send(embed);
	})
};
	mentionMessage(client){
		client.on('message', function(message){
			if (message.content.includes("OBJECTION") == true)
				ft_get_image(message, "OBJECTION");
			else if (message.content.includes("EXPLOSION") == true)
				ft_get_image(message, "EXPLOSION");
			else if (message.content.includes("SION") == true)
				ft_get_image(message, "SION");
			else if (message.content.includes("Amwa") == true || message.content.includes("amwa") == true || message.content.includes("AMWA") == true)
				ft_get_image(message, "AMWA");
			else if (message.content.includes("JARIV") == true || message.content.includes("Jariv") == true || message.content.includes("jariv") == true)
				ft_get_image(message, "JARIV");
			else if (message.mentions.users.size != 0 && (message.content.includes("patpat") || message.content.includes("Patpat")))
				ft_mention(message, message.mentions.users, "PATPAT");
			else if (message.mentions.users.size != 0 && (message.content.includes("ban") || message.content.includes("Ban")))
				ft_mention(message, message.mentions.users, "BAN");
			else if (message.mentions.users.size != 0)
				ft_mention(message, message.mentions.users, "IKAROS");
		})
	};

	addReaction(client){
		client.on('messageReactionAdd', function(messageReaction, user){
			if (messageReaction.message.attachments.size == 0)
				return ;
			if (messageReaction.message.channel.nsfw == false)
				return ;
			let notif = messageReaction.message.member.roles.find('name', 'Posteur');
			if (notif == null)
				return ;
			let emoji = messageReaction.emoji.name;
			let userReact = user;
			let channelReact = messageReaction.message.channel;
			messageReaction.message.author.send(`Félicitations ! ${userReact} a réagi sur votre image avec ${emoji} dans le channel ${channelReact}`);
		})
	};
}

function memberGetRole(oldRole, newRole, Member, logs_channel){
	for (let i = 0; i < newRole.length; i++){
		if (oldRole[i] != newRole[i]){
			let embed = new Discord.RichEmbed()
			.setColor(0x50f0b0)
			.addField("Log - Role obtenu", `Le membre ${Member} a obtenu le role ${newRole[i]}.`)
			.setTimestamp()
			.setFooter("© Ikaros, L'Antre de la Succube");
			logs_channel.send(embed);
			return ;
		}
	}
}

function memberRemoveRole(oldRole, newRole, Member, logs_channel){
	for (let i = 0; i < oldRole.length; i++){
		if (oldRole[i] != newRole[i]){
			let embed = new Discord.RichEmbed()
			.setColor(0x50f0b0)
			.addField("Log - Role retiré", `Le membre ${Member} n'a plus le role ${oldRole[i]}.`)
			.setTimestamp()
			.setFooter("© Ikaros, L'Antre de la Succube");
			logs_channel.send(embed);
			return ;
		}
	}
}

function printRoles(role1, role2){
	role1.forEach(value => {
		console.log(value.name);
	})
	role2.forEach(value1 =>{
		console.log(value1.name);
	})
}

async function ft_get_image(message, type){
	if (await is_monika(message) == 1)
		return ;
	let img_server = message.client.guilds.find('name', 'ikaros-dev');
	if (img_server == undefined){
		msg.reply("Une erreur est survenue, veuillez contacter <@219011984878731264> merci");
		return ;
	}
	let img_channel = img_server.channels.find('name', 'images');
	if (img_channel == undefined){
		msg.reply("Une erreur est survenue, veuillez contacter <@219011984878731264> merci");
		return ;
	}
	let messages = await img_channel.fetchMessages({limit: 100});
	let result = messages.find('content', type);
	let url = result.attachments.array();
	const embed = new Discord.RichEmbed()
	.setColor(0xE70AC8)
	.setImage(url[0].url)
	message.channel.send(embed);
}

async function ft_mention(message, ment, name)
{
	let ika = ment.find('id', `418151600297607188`);
	if (ika != null){
		if (await is_monika(message) == 1)
			return ;
		ft_get_image(message, name);
	}
}

async function is_monika(msg){
	let bot = msg.guild.members.find('id', '418151600297607188');
	bot = bot.user;
	if (bot.username != "Monika")
		return (0);
	const img_server = msg.client.guilds.find('name', 'ikaros-dev');
	const monika_channel = img_server.channels.find('name', 'monika');
	if (monika_channel == undefined)
		return ;
	let monika_message = await monika_channel.fetchMessages({limit: 1});
	monika_message = monika_message.array()[0];
	monika_message = monika_message.attachments.array();
	const monika_embed = new Discord.RichEmbed()
	.setTitle("Tu es venu t'amuser avec moi ?")
	.setColor(0xE70AC8)
	.setImage(monika_message[0].url)
	msg.channel.send(monika_embed);
	return (1);
}