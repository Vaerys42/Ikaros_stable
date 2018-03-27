const commando = require('discord.js-commando');

module.exports = class Ban extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: "Ban un membre de manière permanante. Une raison doit obligatoirement etre spécifié.",
			details: "```?ban @utilisateur raison``` ou ```?ban <@id_utilisateur> raison``` Permet de bannir l'utilisateur ciblé, à condition qu'il soit sur le server.",
			examples: ["?ban @utilisateur raison", "?ban <@id_utilisateur> raison"],
			args:
			[
				{
					key: 'member',
					prompt: 'The user wich will be ban.',
					type: 'user',
					default: '<@393898001577410561>'
				},
				{
					key: 'reason',
					prompt: 'The specific reason of this ban.',
					type: 'string',
					default: ''
				}
			]
		});
 	}

	async run(msg, args){
		if (!(msg.content.startsWith("?ban")))
			return ;
		if (!msg.member.permissions.has("BAN_MEMBERS")){
			msg.reply("Vous n'êtes pas autorisé a éxécuter cette commande");
			return ;
		}
		if (args.member.id == 393898001577410561)
		{
			msg.channel.send("Vous voulez me ban ? Mais je ne suis pas comme Monika ?!\n");
			return ;
		}
		if (args.reason.length == 0)
		{
			msg.channel.send("Merci d'indiquer une raison au bannissement, My Master\n");
			return ;
		}
		try{
			const embedMessageStaff = {
				embed: {
					color: 0xc75a4d,
					author: {
						name: "Ikaros",
					},
					title: "Ban :",
					description: `L'utilisateur ${args.member} s'est fait ban.`,
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
					color: 0xc75a4d,
					author: {
						name: "Ikaros",
					},
					title: "Ban",
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

			const is_member = msg.guild.members.exists('user', args.member);
			if (is_member == true){
				await args.member.send(embedMessageUser);
			}
			msg.guild.ban(args.member, {reason: args.reason});
			msg.channel.send(embedMessageStaff)

		}catch (err){
			msg.reply(`L'utilisateur ${args.member} n\'a pas été banni du serveur`);
			console.log(err);
		}
	}
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}

