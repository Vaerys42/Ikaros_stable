const commando = require('discord.js-commando');

module.exports = class clear extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			group: 'admin',
			memberName: 'clear',
			description: "Permet de supprimer tous les messages d'un membre",
            details: "Faire `?clear @membre` pour supprimer tous les messages d'un membre",
			examples: ["?purge nb"],
			args:
			[
				{
					key: 'member',
					prompt: 'The member you want to delete the messages',
					type: 'user',
					default: '<@418151600297607188>'
				}
			]
		});
 	}

	async run(msg, args){
        if (msg.guild == undefined)
		{
			msg.channel.send("Je suis désolée my Master, mais vous ne pouvez pas encore me parler\n");
			return ;
		}
		if (!(msg.content.startsWith("?clear")))
			return ;
		if (checkPerm(msg, "Administrateur") == 0 && checkPerm(msg, "Soubrette") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
			msg.reply("Vous n'avez pas la permission d'utiliser cette commande");
			return ;
        }
        let channels = msg.guild.channels;
        channels.forEach(channel => {
            if (channel.type == 'text'){
                clearMessages(msg, channel, args.member);
            }
        });
	}	
}

async function clearMessages(msg, channel, member)
{
    let messages = await channel.fetchMessages({limit: 100});
    let newMessages;
    let listSize = messages.size - 1;
    let lastMess = messages.last();
    while (listSize != messages.size){
        newMessages = await channel.fetchMessages({limit: 100, before: lastMess.id});
        listSize = messages.size;
        messages = messages.concat(messages, newMessages);
        lastMess = messages.last();
    }
    messages = await messages.findAll('author', member);
    if (messages.length == 0)
        return ;
    messages.forEach(message => {
        message.delete();
    })
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
