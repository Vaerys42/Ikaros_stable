const commando = require('discord.js-commando');

module.exports = class Help extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'help',
			memberName: 'help',
			description: "La commande d'aide si vous ne savez pas encore vous servir des commandes !",
			details: "Index toutes les commandes disponibles selon vos privilèges sur le serveur :  ```?help``` Permet de lister tout les modules accessibles. ```?help Role``` Permet de lister toute les commandes du module 'Role'. ```?help Role role``` vous offrira un manuel détaillé de la commande",
			args:
			[
				{
					key: 'module',
					prompt: 'The module you ask',
					type: 'string',
					default: ''
				},
				{
					key: 'command',
					prompt: 'The command you need help',
					type: 'string',
					default: ''
				},
			]
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
		const client = msg.client;
		if (!checkPerm(msg, "Membres") == 0) {

			if (args.module) {

				if (args.module === 'Admin') {

					if (checkPerm(msg, "Administrateur") == 0 && checkPerm(msg, "Soubrette") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){

						msg.reply("Vous n'avez pas acces à ce module.");
						return;

					}else {
						const module = await client.registry.groups.find('name', args.module);
						if (args.command.length != 0)
						{
							help_command(msg, args, module);
							return ;
						}
						let admin_list = "";
						module.commands.forEach(function(value, key, map) {
							admin_list += '`';
							admin_list += `${value.name}`;
							admin_list += '` ';
						})
						msg.channel.send({
							embed: {
								color: 0x0099de,
								author: {
									name: "Ikaros",
								},
								title: "Module Admin",
								description: `Liste des commandes du module admin : ${admin_list}`,
								footer: {
									text: "© Ikaros, L'Antre de la Succube"
								}
							}
						})
					}
				}else {
					const module = await client.registry.groups.find('name', args.module);
					if (args.command.length != 0)
						{
							help_command(msg, args, module);
							return ;
						}
					if (module != undefined) {
						let module_list = "";
						module.commands.forEach(function(value, key, map) {
							module_list += '`';
							module_list += `${value.name}`;
							module_list += '` ';
						})
						msg.channel.send({
							embed: {
								color: 0x0099de,
								author: {
									name: "Ikaros",
								},
								title: `Module ${args.module}`,
								description: `Liste des commandes du module ${args.module} : ${module_list}`,
								footer: {
									text: "© Ikaros, L'Antre de la Succube"
								}
							}
						})
					}else {
						msg.reply("Le module demandé n'existe pas ou vous avez surement oublié la majuscule sur le nom du module.");
					}
				}
			}else {
				let all_module = "";
				if (checkPerm(msg, "Administrateur") == 0 && checkPerm(msg, "Soubrette") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
					//Je montre les modules autorisés aux membres.
						client.registry.groups.forEach(function(value, key, map) {
							if (value.name != 'Admin') {
								all_module += '`';
								all_module += `${value.name}`;
								all_module += '` ';
							}
						});
						msg.channel.send({
							embed: {
								color: 0x0099de,
								author: {
									name: "Ikaros",
								},
								title: "Liste des modules:",
								description: `Voici tous les modules disponibles sur le serveur : ${all_module}\n Il suffit de faire ?help <module> pour accèder aux particularités de chaque module.\n`,
								footer: {
									text: "© Ikaros, L'Antre de la Succube"
								}
							}
						})
					}else {
						//Je montre tout les modules
							client.registry.groups.forEach(function(value, key, map) {
							all_module += '`';
							all_module += `${value.name}`;
							all_module += '` ';
						});
						msg.channel.send({
							embed: {
								color: 0x0099de,
								author: {
									name: "Ikaros",
								},
								title: "Liste des modules:",
								description: `Voici tous les modules disponibles sur le serveur : ${all_module}\n Il suffit de faire ?help <module> pour accèder aux particularités de chaque module.\n`,
								footer: {
									text: "© Ikaros, L'Antre de la Succube"
								}
							}
						})
						}
					}
		}else {
			msg.reply("Vous n'etes pas encore membre, vous ne pouvez pas utiliser cette commade.");
		}


	}
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}

function help_command(msg, args, module)
{
	let command = module.commands.find('name', args.command);
	if (command == undefined)
	{
		msg.channel.send("La commande que vous avez demandé n'existe pas, My Master\n");
		return ;
	}
	let command_name = "`" + command.name + "`";
	msg.channel.send({
		embed: {
			color: 0x0099de,
			author: {
				name: "Ikaros",
			},
			title: `Aide de la commande: ${command_name}`,
			description: "`" + `${command.description}\n` + "`" + "\n\nDétails: " + `${command.details}`,
			footer: {
				text: "© Ikaros, L'Antre de la Succube"
			}
		}
	})
}
