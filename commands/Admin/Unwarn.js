const commando = require('discord.js-commando');

module.exports = class Warn extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'unwarn',
			group: 'admin',
			memberName: 'unwarn',
			description: "Retire un warn de la liste des warns de l'utilisateur ciblé.",
			details: "```?unwarn @utilisateur``` Permet de consulter la liste des warns de l'utilisateur ciblé. ```?unwarn @utilisateur 1``` ou ```?unwarn <@utilisateur_id> 1``` Permet de retirer le warn Numéro : 1 de la liste des warns de l'utilisateur ciblé.",
			examples: ["?unwarn @utilisateur", "?unwarn @utilisateur 1"],
			args:
			[
				{
					key: 'member',
					prompt: 'The user wich will be warn.',
					type: 'user'
				},
				{
					key: 'num',
					prompt: 'The index of the warn to unwarn.',
					type: 'integer',
					default: ''
				}
			]
		});
 	}

	// hasPermission(msg) {
	// 	const allowTo = msg.member.roles.every(function () {
	// 		role.hasPermissions(['BAN_MEMBERS']);
	// 	}, role)
	// 	// return msg.client.isOwner(msg.author);
	// }

	async run(msg, args){
		if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0 && checkPerm(msg, "Modo étagères <3") == 0){
			msg.reply("Nous n'avez pas l'autorisation pour executer cette commande.");
			return ;
		}
		let warnTab = [];
		const client = msg.client;
		if (!args.num) {
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
									value: `${i+1}`
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
				const index = args.num - 1;
				const embedMessageStaff = {
					embed: {
						color: 0xffc500,
						author: {
							name: "Ikaros",
						},
						title: "Unwarn :",
						description: `L'utilisateur ${args.member.username} s'est fait unwarn.`,
						fields: [
							{
								name: "Auteur :",
								value: warnTab[index].banAuthor
							},
							{
								name: "Motif :",
								value: warnTab[index].banReason
							}
						],
						timestamp: warnTab[index].date,
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
						title: "Unwarn",
						description: ' ',
						fields: [
							{
								name: "Motif :",
								value: warnTab[index].banReason
							}
						],
						timestamp: warnTab[index].date,
						footer: {
							text: "© Ikaros, Hentai Univers"
						}
					}
				}
				msg.channel.send(embedMessageStaff)
				args.member.sendMessage(`Le warn ci dessous à été retiré il vous en reste ${3 - (warnTab.length-1)} desormais.`);
				args.member.sendMessage(embedMessageUser);
				warnTab.splice(args.num-1, 1);
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
			}catch(err){
				if (err.notFound) {
					msg.reply(`L'utilisateur <@${args.member.id}> n'as pas de warn pour le moment.`);
				}
			}
		}

	}
}

function checkPerm(msg, args)
{
	if (msg.member.roles == undefined){
		msg.reply("Error");
		return ;
	}
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
