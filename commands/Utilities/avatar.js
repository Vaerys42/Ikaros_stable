const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Age extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			group: 'utilities',
			memberName: 'avatar',
			description: "Obtenir l'image de profil d'un membre",
            details: "C'est si vous aimez cette pp",
            args:[
                {
                    key: 'member',
					prompt: 'La personne que vous voulez caliner <3',
					type: 'user',
					default: '',
					validate(val, msg){
						console.log(val);
						return (1);
					}
                }
            ],
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
		if (args.member.length == 0)
			args.member = msg.author;
        let url = args.member.avatarURL;
		const embed = new Discord.RichEmbed()
		.setColor(0xE70AC8)
		.setImage(url)
		msg.channel.send(embed);
	}
}
