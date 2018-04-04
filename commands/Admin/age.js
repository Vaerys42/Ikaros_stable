const commando = require('discord.js-commando');

module.exports = class Age extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'age',
			group: 'admin',
			memberName: 'age',
			description: "Vérifier l'age d'un nouveau membre.",
			details: "C'est la jolie commande qui vous réceptionné dans le hall <3.\nExemple: `?age 16`"
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
		if (args.length == 0){
			msg.reply("Indiquez un age merci");
			return ;
		}
		if (msg.member.roles.find("name", "Membres") != undefined)
		{
			msg.reply("Vous avez déja le role membre");
			return ;
		}
		if (checkAgeChar(args) == 1){
			if (args >= 85)
				msg.reply("Désolée nous n'acceptons que les personnes en condition physique pour pouvoir se Fap, Next.");
			else if (args >= 0 && args <= 84){
				if (args <= 17)
					msg.member.addRole(msg.guild.roles.find("name", "Membres SFW"));
				else
					msg.member.addRole(msg.guild.roles.find("name", "Membres"));
				msg.channel.send("Bienvenue dans l'Antre de la Succube");
				sendRules(msg);
			}
			}
			else
				msg.reply("Rentrez un age valide merci");
 		}
	}

function checkAgeChar (age){
  let i = 0;

  while (i < age.length){
    if (age.charCodeAt(i) <= 47 || age.charCodeAt(i) >= 58)
      return 0;
    i++;
  }
  return 1;
}

function sendRules (msg){
	channel = msg.guild.channels.find('name', 'reglement');
	msg.member.send(`Bonjour et bienvenue a toi, jeune pervers(e) :heart:.
Tu viens d'arriver sur le serveur L'Antre de la Succube et je suis la pour t'aider.
Je t'invite à aller lire la charte située dans le channel ${channel} du serveur pour être au
courant des règles a respecter ici ^^ pense aussi a vérifier les messages épinglés,
ils contiennent des infos utiles !
Sinon, si tu as des questions, n'hésite pas a contacter les Modos !
Sur ce, je te laisse découvrir le monde du Hentai et sa communauté sur le serveur :heart:`);
}
