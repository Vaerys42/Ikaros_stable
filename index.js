const Commando = require('discord.js-commando');
const path = require('path');
const levelup = require('levelup');
const leveldown = require('leveldown');

const EventHandler = require("./commands/admin/EventHandler.js");

const client = new Commando.Client({
	owner: process.env.BOT_OWNER,
	commandPrefix: '?',
	unknownCommandResponse: false,
	disableEveryone: true
});

client.warnTable = levelup(leveldown('./warnTable'))

client.registry
.registerDefaultTypes()
.registerGroups([
	['admin', 'Admin'],
	['help', 'Help'],
	['role', 'Role'],
	['image', 'Image'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('error', error => {
	console.log(error);
	return ;
});

client.login(process.env.BOT_TOKEN);
