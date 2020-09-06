exports.run = async (client) => {
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};
exports.help = {
    name: "play",
    category: "Music Commands",
    description: "Queue a song/playlist by URL or name",
    usage: "play song name | song url"
};