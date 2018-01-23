const Commando = require('discord.js-commando');

module.exports = class EventHandler {
	constructor(client){
		this.getDeleteMessage(client);
		this.getDeleteRole(client);
		this.getNewUser(client);
		this.userLeave(client);
		this.getNewRole(client);
		this.userBan(client);
		this.userUnban(client);
		this.getMemberUpdate(client);
	}
	getDeleteMessage(client) {
		client.on('messageDelete', message => {
			if (message.author.bot == true){
				return ;
			}
		const logs_channel = message.guild.channels.find('name', 'logs');
		if (message.content.length === 0){
			message.content = "[NO TEXT IN MESSAGE]";
		}
		logs_channel.send({
			embed :{
				color : 0x50f0b0,
				fields :[{
					name: "Log - Message Supprimé",
					value: `Message supprimé dans ${message.channel}`,
				},
				{
					name: "Message",
					value: `${message.content}`,
				},
				{
					name: "Auteur",
					value: `${message.author}`,
				},
				{
					name: "Date",
					value: `${message.createdAt}`,
				}],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		})
	});
};
	getNewUser(client){
	client.on('guildMemberAdd', membre => {
		const logs_channel = membre.guild.channels.find('name', 'logs');
		logs_channel.send({
			embed :{
				color : 0x50f0b0,
				fields :[{
					name: "Log - Nouveau Membre",
					value: `Le membre <@${membre.id}> a rejoint le serveur`,
				}],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		})
	});
};
	userLeave(client){
	client.on('guildMemberRemove', membre =>{
		const logs_channel = membre.guild.channels.find('name', 'logs');
		logs_channel.send({
			embed :{
				color : 0x50f0b0,
				fields :[{
					name: "Log - Membre Parti",
					value: `Le membre <@${membre.id}> a quitté le serveur`,
				}],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		})
	});
};
	getNewRole(client){
	client.on('roleCreate', role => {
		const logs_channel = role.guild.channels.find('name', 'logs');
		logs_channel.send({
			embed :{
				color : 0x50f0b0,
				fields :[{
					name: "Log - Création Role",
					value: `Le role ${role.name} a été créé.`,
				}],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		})
	});
};
	getDeleteRole(client) {
		client.on('roleDelete', role => {
			const logs_channel = role.guild.channels.find('name', 'logs');
			logs_channel.send({
				embed :{
					color : 0x50f0b0,
					fields :[{
						name: "Log - Suppression Role",
						value: `Le role ${role.name} a été supprimé.`,
					}],
					timestamp: new Date(),
					footer: {
						text: "© Ikaros, Hentai Univers"
					}
				}
			})
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
		logs_channel.send({
			embed :{
				color : 0x50f0b0,
				fields :[{
					name: "Log - Membre Banni",
					value: `Le membre <@${user.id}> a été banni du serveur`,
				}],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		})
	})
};
	userUnban(client){
	client.on('guildBanRemove', function(guild, user){
		const logs_channel = guild.channels.find('name', 'logs');
		logs_channel.send({
			embed :{
				color : 0x50f0b0,
				fields :[{
					name: "Log - Membre Débanni",
					value: `Le membre <@${user.id}> a été débanni du serveur`,
				}],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		})
	})
};
}

function memberGetRole(oldRole, newRole, Member, logs_channel){
	for (let i = 0; i < newRole.length; i++){
		if (oldRole[i] != newRole[i]){
			logs_channel.send({
				embed :{
					color : 0x50f0b0,
					fields :[{
						name: "Log - Role obtenu",
						value: `Le membre <@${Member.user.id}> a obtenu le role ${newRole[i]}.`,
					}],
					timestamp: new Date(),
					footer: {
						text: "© Ikaros, Hentai Univers"
					}
				}
			})
			return ;
		}
	}
}

function memberRemoveRole(oldRole, newRole, Member, logs_channel){
	for (let i = 0; i < oldRole.length; i++){
		if (oldRole[i] != newRole[i]){
			logs_channel.send({
				embed :{
					color : 0x50f0b0,
					fields :[{
						name: "Log - Role retiré",
						value: `Le membre <@${Member.user.id}> n'a plus le role ${oldRole[i]}.`,
					}],
					timestamp: new Date(),
					footer: {
						text: "© Ikaros, Hentai Univers"
					}
				}
			})
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
