const commando = require('discord.js-commando');

module.exports = class Help extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'help',
			memberName: 'help',
			description: 'Help command, showing all available commands.',
			details: "Index toutes les commandes disponibles selon vos privilèges sur le server : \n  ```?help``` Permet de listé tout les modules accessibles. ```?help Role``` Permet de lister toute les commandes du module 'Role'.",
			example: ["?help", "?help role"],
			args:
			[
				{
					key: 'module',
					prompt: 'The user wich will be warn.',
					type: 'string',
					default: ''
				},
			]
		});
 	}


	async run(msg, args){

		const client = msg.client;
		if (!checkPerm(msg, "Membres") == 0) {

			if (args.module) {

				if (args.module === 'Admin') {

					if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0 && checkPerm(msg, "Modo étagères <3") == 0){

						msg.reply("Vous n'avez pas acces à ce module.");
						return;

					}else {
						const module = await client.registry.groups.find('name', args.module);
						console.log(module);
						msg.channel.send(`Voici toute les commandes du module ${args.module} :`)
						module.commands.forEach(function(value, key, map) {

							msg.channel.send({
								embed: {
									color: 0x0099de,
									author: {
										name: "Ikaros",
									},
									title: value.name.toUpperCase(),
									description: `Module : ${args.module}`,
									fields: [
										{
											name: 'Description :',
											value: value.description
										},
										{
											name: 'Details :',
											value: value.details
										},
									],
									footer: {
										text: "© Ikaros, Hentai Univers"
									}
								}
							})
						})

					}
				}else {
					const module = await client.registry.groups.find('name', args.module);
					if (module != undefined) {

						msg.channel.send(`Voici toute les commandes du module ${args.module} :`)
						module.commands.forEach(function(value, key, map) {

							msg.channel.send({
								embed: {
									color: 0x0099de,
									author: {
										name: "Ikaros",
									},
									title: `Module ${args.module}`,
									description: value.name,
									fields: [
										{
											name: 'Description :',
											value: value.description
										},
										{
											name: 'Details :',
											value: value.details
										},
										// {
										// 	name: "Exemple : ",
										// 	value: value.examples
										// }
									],
									footer: {
										text: "© Ikaros, Hentai Univers"
									}
								}
							})
						})
					}else {
						msg.reply("Le module demandé n'existe pas ou vous avez surement oublié la majuscule sur le nom du module.");
					}
				}
			}else {
				if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0 && checkPerm(msg, "Modo étagères <3") == 0){
					//Je montre les modules autorisés aux membres.
					const exCommand = "`?help <module>`";
					msg.channel.send(`Voici la liste de tout les modules dont vous avez accès.
Utilisez la commande ${exCommand} pour voir les commandes du module souhaité.`);
						client.registry.groups.forEach(function(value, key, map) {

							if (value.name != 'Admin') {

								msg.channel.send({
									embed: {
										color: 0x0099de,
										author: {
											name: "Nom du module :",
										},
										title: value.name,
									}
								})
							}
						});

					}else {
						//Je montre tout les modules
						const exCommand = "`?help <module>`";
						msg.channel.send(`Voici la liste detout les modules dont vous avez accès.
Utilisez la commande ${exCommand} pour voir les commandes du module souhaité.`);
							client.registry.groups.forEach(function(value, key, map) {

								msg.channel.send({
									embed: {
										color: 0x0099de,
										author: {
											name: "Nom du module :",
										},
										title: value.name,
									}
								})
							});

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
