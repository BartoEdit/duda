const Discord = require("discord.js");
const fs = require('fs');
const https = require('https');
const client = new Discord.Client({fetchAllMembers: true, disableEveryone: true});
//restart with crash
process.on('unhandledRejection', (reason, promise) => {
	reason = String(reason);
	if (reason.indexOf("Missing Permissions")==-1) {
		console.log(reason, promise);
		process.exit(1);
	}
});
//bot
client.on('ready', async () => {
	client.user.setActivity(`GHOSTEMANE`, {type: "LISTENING"});
	console.log("I'm ready!")
});
client.on('message', async message => {
	if(message.author.bot) return;
	var messageArray = message.content.split(" ");
	if (messageArray.length>0) {var cmd = messageArray[0].toLowerCase()} else {return}
	var messageArray2 = [];
	for (i=0; i<messageArray.length; i++) {if (messageArray[i]!=="") {messageArray2.push(messageArray[i])}}
	messageArray=messageArray2;
	var prefix = "pt2";
	if (cmd.indexOf(prefix)!=0) return;
	var args = messageArray.slice(1);
	var commandfile = cmd.slice(prefix.length);
	//commands
	if (commandfile==="ping") {
		var the_ping = Math.round(client.ping);
		if (the_ping<200) {var color = "#00ff00"}
		else if (the_ping>199&&the_ping<500) {var color = "#ffff00"}
		else {var color = "#ff0000"}
		const n_embed = new Discord.RichEmbed()
		.setColor(color)
		.setDescription("<:dudatf:860424843946360842> **"+the_ping+"ms**")
		message.channel.send(n_embed);
	} else if (commandfile==="say") {
		if (args.length>0) {
			if (message.channel.type!=="dm") {
				message.delete(msg => msg.delete(1)).catch(()=>{});
			}
			return message.channel.send(args.join(" "));
		} else {
			return message.reply("<:duda:855141040549658635> ło baben xd nic nie napisałeś kretynie");
		}
	}
});

client.login(process.env.BOT_TOKEN);