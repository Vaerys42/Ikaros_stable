const commando = require('discord.js-commando');

module.exports = class Role extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'role',
			group: 'role',
			memberName: 'role',
			description: "Commande d'auto-assignation de role.",
			details: "```?role``` Permet d'afficher la liste des roles auto-assignables. ```?role get Fan BBW``` Permet de s'assigner le role 'Fan BBW'. ```?role remove Fan BBW``` Permet de se retiré le role 'Fan BBW'.",
			examples: ["?role", "?role get Fan BBW", "?role remove BBW"],
			args: [
				{
					key: 'property',
					prompt: 'Wich type of role command',
					type: 'string',
					default: ''
				},
				{
					key: 'role',
					prompt: 'The role to del',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, args){
		if (args.property && args.role){
			if (args.property == "get"){
				getRole(msg, args);
				return ;
			}
			else if (args.property == "remove"){
				remRole(msg, args);
				return ;
			}
			else if (args.property == "add"){
				if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
					msg.reply("Vous n'êtes pas autorisé a éxécuter cette commande");
					return ;
				}
				addRole(msg, args);
				return ;
			}
			else if (args.property == "delete"){
				if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
					msg.reply("Vous n'êtes pas autorisé a éxécuter cette commande");
					return ;
				}
				delRole(msg, args);
				return ;
			}
			else{
				errorMessage(msg, args);
				return ;
			}
		}
		else if (!args.property && !args.role){
			getRoleList(msg, args);
			return ;
		}
		else{
			errorMessage(msg, args);
			return ;
		}
	}
}

function errorMessage(msg, args){

	if (checkPerm(msg, "Mastermodo") == 1 || checkPerm(msg, "Supermodo") == 1 || checkPerm(msg, "Modo") == 1){
		msg.channel.send({
			embed: {
				color: 0x50f0b0,
				title: "Commandes du module Role :",
				fields: [
					{
						name: "Permet de creer un role auto-assignable.",
						value: "```?role add nom_du_role```"
					},
					{
						name: "Permet de se supprimé un role auto-assignable.",
						value: "```?role delete nom_du_role```"
					},
					{
						name: "Permet de s'auto-assigner un role.",
						value: "```?role get nom_du_role```"
					},
					{
						name: "Permet de se désassigner un role.",
						value: "```?role remove nom_du_role```"
					}
				],
			}
		});
		return;
	}
	msg.channel.send({
		embed: {
			color: 0x50f0b0,
			title: "Commandes du module Role :",
			fields: [
				{
					name: "Permet de s'auto-assigner un role.",
					value: "```?role get nom_du_role```"
				},
				{
					name: "Permet de se désassigner un role.",
					value: "```?role remove nom_du_role```"
				},
			],
		}
	});
}

function addRole(msg, args){
	if (msg.guild.roles.find('name', args.role) != undefined){
		msg.channel.send("```Ce role existe déja```");
		return ;
	}
	msg.guild.createRole({
		name : args.role,
		color: [149, 240, 178],
	});
	msg.channel.send({
		embed: {
			color: 0x50f0b0,
			author: {
				name: "Role crée",
			},
			title: args.role,
		}
	});
}

function getRole(msg, args){
	if (msg.guild.roles.find('name', args.role) == undefined){
		msg.channel.send("```Ce role n'existe pas ou n'est pas assignable```");
		return ;
	}
	if (!args.role.startsWith("Fan")){
		msg.channel.send(`Vous n'avez pas a vous assigner ce role, ${msg.member.user.username}`);
		return ;
	}
	if (msg.member.roles.find('name', args.role) != undefined){
		msg.channel.send("```Vous avez déja ce role```");
		return ;
	}
	let id = msg.guild.roles.find('name', args.role);
	msg.member.addRole(id);
	msg.channel.send({
		embed: {
			color: 0x50f0b0,
			author: {
				name: "Role attribué",
			},
			title: args.role,
		}
	});
}

function delRole(msg, args){
	if (msg.guild.roles.find('name', args.role) == undefined){
		msg.channel.send("```Ce role n'existe pas```");
		return ;
	}
	let role = msg.guild.roles.find('name', args.role);
	role.delete();
	msg.channel.send({
		embed: {
			color: 0x50f0b0,
			author: {
				name: "Role supprimé",
			},
			title: args.role,
		}
	});
}

function remRole(msg, args){
	if (!args.role.startsWith("Fan")){
		msg.channel.send(`Vous n'avez pas a vous retirer ce role, ${msg.member.user.username}`);
		return ;
	}
	if (msg.member.roles.find('name', args.role) == undefined){
		msg.channel.send("```Vous ne possèdez pas ce role```");
		return ;
	}
	let id = msg.guild.roles.find('name', args.role);
	msg.member.removeRole(id);
	msg.channel.send({
		embed: {
			color: 0x50f0b0,
			author: {
				name: "Role retiré",
			},
			title: args.role,
		}
	});
}

function getRoleList(msg, args){

	let roleString = "```";
	let roleTable = [];
	msg.channel.guild.roles.forEach(function(value){

		if (value.name.startsWith('Fan')) {
			roleTable.push({
				value: `${value.name}`
			})
		}
	})
	roleTable.sort((function(a, b){
    if(a.value < b.value) return -1;
    if(a.value > b.value) return 1;
    return 0;
}));
	roleTable.forEach(function(value){
		roleString += `${value.value}\n`;
	})
	roleString += "```";
	msg.channel.send({
		embed: {
			color : 0x50f0b0,
		fields : [{
			name: "Liste des roles auto-assignables",
			value: roleString
		}]
	}
	})
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
