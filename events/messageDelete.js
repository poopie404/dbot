const Discord = require('discord.js');
module.exports = async (client, member, message) => {
    const settings = client.getSettings(member.guild.id);
    if (settings.serverLogs !== "true") return;
    let botembed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .setTitle('__**Message Deleted**__')
    .addField('**User**', `<@${member.author.id}>`, true)
    .addField('**Channel**', `${member.channel}`, true)
    .addField('**Message**', member.content);

    await member.guild.channels.find(c => c.name === settings.serverLogsChannel).send(botembed).catch(console.error);
}