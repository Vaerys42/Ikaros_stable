const commando = require('discord.js-commando');

module.exports = class Warn extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			group: 'admin',
			memberName: 'warn',
			description: "Délivre un avertissement (warn) à l'utilisateur ciblé. \n Au bout de 3 avertissements, l'utilisateur est automatiquement banni.",
			details: "```?warn @utilisateur``` Permet de consulter la liste des warns de l'utilisateur ciblé. ```?warn @utilisateur raison``` ou ```?warn <@utilisateur_id> raison``` Permet de warn un utilisateur.",
			examples: ["?warn @utilisateur raison", "?warn <@utilisateur_id> raison"],
			args:
			[
				{
					key: 'member',
					prompt: 'The user wich will be warn.',
					type: 'user'
				},
				{
					key: 'reason',
					prompt: 'The specific reason of this warn.',
					type: 'string',
					default: ''
				}
			]
		});
 	}

	async run(msg, args){
		if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0 && checkPerm(msg, "Modo étagères <3") == 0){
			msg.reply("Vous n'avez pas la permission d'utiliser cette commande");
			return ;
		}
		let warnTab = [];
		const client = msg.client;
		if (!args.reason) {
			try {
				let value = await client.warnTable.get(args.member.id);
				warnTab = JSON.parse(value);
				if (warnTab.length === 0) {
					msg.reply(`L'utilisateur <@${args.member.id}> n'as pas de warn pour le moment.`);
					return
				}
				msg.reply(`Ci-dessou le(s) warn(s) de l'utilisateur <@${args.member.id}> :`);
				for (let i = 0; i < warnTab.length; i++) {
					msg.channel.send({
						embed: {
							color: 0xffc500,
							author: {
								name: "Ikaros",
							},
							title: "Warn :",
							description: `L'utilisateur ${args.member.username} s'est fait warn.`,
							fields: [
								{
									name: 'Warn No°',
									value: `${i}`
								},
								{
									name: "Auteur :",
									value: `<@${warnTab[i].banAuthor.id}>`
								},
								{
									name: "Motif :",
									value: warnTab[i].banReason
								}
							],
							timestamp: warnTab[i].date,
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					})
				}
			} catch (err) {
				msg.reply(`L'utilisateur <@${args.member.id}> n'as pas de warn pour le moment.`);
			}
		}else {

			try{
				let value = await client.warnTable.get(args.member.id);
				warnTab = JSON.parse(value);
				warnTab.push(
					{
						banAuthor: msg.author,
						banReason: args.reason,
						date: new Date()
					}
				);
				var cache = [];
				await client.warnTable.put(args.member.id, JSON.stringify(warnTab, function(key, value) {
					if (typeof value === 'object' && value !== null) {
						if (cache.indexOf(value) !== -1) {
							// Circular reference found, discard key
							return;
						}
						// Store value in our collection
						cache.push(value);
					}
					return value;
				}));
				cache = null;
				const embedMessageStaff = {
					embed: {
						color: 0xffc500,
						author: {
							name: "Ikaros",
						},
						title: "Warn :",
						description: `L'utilisateur ${args.member.username} s'est fait warn.`,
						fields: [
							{
								name: "Auteur :",
								value: msg.author.username
							},
							{
								name: "Motif :",
								value: args.reason
							}
						],
						timestamp: new Date(),
						footer: {
							text: "© Ikaros, Hentai Univers"
						}
					}
				}

				const embedMessageUser = {
					embed: {
						color: 0xffc500,
						author: {
							name: "Ikaros",
						},
						title: "Warn",
						description: ' ',
						fields: [
							{
								name: "Motif :",
								value: args.reason
							}
						],
						timestamp: new Date(),
						footer: {
							text: "© Ikaros, Hentai Univers"
						}
					}
				}
				args.member.sendMessage(`Vous êtes un(e) vilain (e) pervers(e), vous venez d'avoir un warn attention il vous en reste  ${3 - warnTab.length} avant de vous faire ban! Soyez sage!`);
				args.member.sendMessage(embedMessageUser);
				msg.channel.send(embedMessageStaff)
				if (warnTab.length >= 3) {

					const embedBanMessageUser = {
						embed: {
							color: 0xffc500,
							author: {
								name: "Ikaros",
							},
							title: "Ban",
							description: ' ',
							fields: [
								{
									name: "Motif :",
									value: 'Cet user à recu 3 avertissement.'
								}
							],
							timestamp: new Date(),
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					}

					const embedBanMessageStaff = {
						embed: {
							color: 0xffc500,
							author: {
								name: "Ikaros",
							},
							title: "Ban :",
							description: `L'utilisateur ${args.member.username} s'est fait Ban.`,
							fields: [
								{
									name: "Auteur :",
									value: msg.author.username
								},
								{
									name: "Motif :",
									value: 'Cet user à recu 3 avertissement.'
								}
							],
							timestamp: new Date(),
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					}
					args.member.sendMessage(embedBanMessageUser);
					msg.guild.ban(args.member.id, {reason: 'Cet user à recu 3 avertissement.'});
					msg.channel.send(embedBanMessageStaff)
				}
			}catch(err){
				if (err.notFound) {
					warnTab.push(
						{
							banAuthor: msg.author,
							banReason: args.reason,
							date: new Date()
						}
					);
					var cache = [];
					await client.warnTable.put(args.member.id, JSON.stringify(warnTab, function(key, value) {
						if (typeof value === 'object' && value !== null) {
							if (cache.indexOf(value) !== -1) {
								// Circular reference found, discard key
								return;
							}
							// Store value in our collection
							cache.push(value);
						}
						return value;
					}));
					cache =null;
					const embedMessageStaff = {
						embed: {
							color: 0xffc500,
							author: {
								name: "Ikaros",
							},
							title: "Warn :",
							description: `L'utilisateur ${args.member.username} s'est fait warn.`,
							fields: [
								{
									name: "Auteur :",
									value: msg.author.username
								},
								{
									name: "Motif :",
									value: args.reason
								}
							],
							timestamp: new Date(),
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					}

					const embedMessageUser = {
						embed: {
							color: 0xffc500,
							author: {
								name: "Ikaros",
							},
							title: "Warn",
							description: ' ',
							fields: [
								{
									name: "Motif :",
									value: args.reason
								}
							],
							timestamp: new Date(),
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					}
					args.member.sendMessage(`Vous êtes un(e) vilain (e) pervers(e), vous venez d'avoir un warn attention il vous en reste  ${3 - warnTab.length} avant de vous faire ban! Soyez sage!`);
					args.member.sendMessage(embedMessageUser);
					msg.channel.send(embedMessageStaff)
				}
			}
		}

	}
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
