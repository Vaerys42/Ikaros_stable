const commando = require('discord.js-commando');

module.exports = class Perm extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'perm',
			group: 'admin',
			memberName: 'perm',
			description: "Règle les permissions des roles du serveur",
			details: "```?perm @Role [paramètre] [1 / 0]```",
			examples: ["?ban @utilisateur raison", "?ban <@id_utilisateur> raison"],
			args:
			[
				{
					key: 'role',
					prompt: 'The role who get perm',
					type: 'role',
					default: ''
				},
				{
					key: 'permission',
					prompt: 'The perm that will be change',
					type: 'string',
					default: ''
				},
				{
					key: 'bol',
					prompt: 'activate or not the perms',
					type: 'float',
					default: '-1'
				}
			]
		});
	 }
	 
	 async run(msg, args){
		check_admin(msg);
	 }
}

function check_admin(msg){
	let roles = msg.member.roles;
	let ar = roles.array();
	let perms;
	ar.forEach(role => {
		if (role.permissions.has({permissions: [administrator]}) == true)
			return (1);
	});
	return (0);
}