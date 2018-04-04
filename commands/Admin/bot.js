const commando = require('discord.js-commando');

module.exports = class Bot extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'bot',
			group: 'admin',
			memberName: 'bot',
			description: "Commande réservé a la créatrice =D",
            details: "C'est pas pour vous j'ai dit !!!!!",
            args:
            [
                {
                    key: 'command',
                    prompt: "Vous le savez déja My Eternal Master",
                    type: 'string',
                    default: ''
                },
                {
                    key: 'sup',
                    prompt: "Vous le savez aussi",
                    type: 'string',
                    default: ''
                }
            ]
		});
	}

	async run(msg, args){
        if (msg.author.id != 219011984878731264)
            return ;
        let bot = msg.guild.members.find('id', '418151600297607188');
        bot = bot.user;
        if (args.command == "name")
        {
            if (args.sup.length == 0)
                return ;
            bot.setUsername(args.sup);
        }
        if (args.command == "image")
        {
            let image = msg.attachments.array();
            if (image.length == 0)
            {
                msg.channel.send("Voyons My Master, il me faut une nouvelle image de profil");
                return ;
            }
            let url = image[0].url;
            bot.setAvatar(url);
        }
        if (args.command == "activity"){
            if (args.sup.length == 0)
                return ;
            bot.setActivity(args.sup);
        }
    }
}
