const Discord = require('discord.js');
module.exports = async (client, member, message, oldMessage, newMessage) => {
    const settings = client.getSettings(member.guild.id);
    if (settings.serverLogs !== "true") return;
    let botembed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .setTitle('__**Message Edit**__')
    .addField('**User**', `<@${member.author.id}>`, true)
    .addField('**Channel**', `${member.channel}`, true)
    .addField('**Original Message**', `${oldMessage.content}`, true)
    .addField('**Edited Message**', `${newMessage.content}`, true);

    await member.guild.channels.find(c => c.name === settings.serverLogsChannel).send(botembed).catch(console.error);
}