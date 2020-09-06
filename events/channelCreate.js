const Discord = require('discord.js');
module.exports = async (client, member, channel) => {
    const settings = client.getSettings(member.guild.id);
    if (settings.serverLogs !== "true") return;
    let botembed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .setTitle('__**Channel Created**__')
    .addField('Name', `${channel.name}`, true)
    .addField('Type', `${channel.type}`, true)
    await logs.send(botembed);
    await member.guild.channels.find(c => c.name === settings.serverLogsChannel).send(botembed).catch(console.error);
}