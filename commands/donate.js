exports.run = (client, message) => {
	message.author.send({
		embed: {
			author: { name: `Make a donation!` },
			description: `
Hi I'm danielpmc the owner of DanBot! Me and my team spent months create Danbot for you guys to use, and as you know nothing is free!
Maintaining this bot is not Free, we need to pay the server, the domain for the website, etc...
we do not want to be paid to code, we just need money to maintain our bot.\nIf you want to support us and DanBot. Please donate using paypal.
Thank You for using DanBot
All the donations are used for System and the dashboard that u can access by pressing [**__HERE__**](http://www.danbot.xyz/). 
All donations above 1$ we will give something back like the donators perm level on DanBot where you will soon have access to commands that normal users wont.
And you will be on \`!donators\`


[**__Paypal__**](https://www.paypal.me/danielpmc)`,
			color: 0xFFFFFF
		}
	});
	message.channel.send(":white_check_mark: I have sent my donation information to you through Direct Messages.").then(x => x.delete(10000))
};

              exports.conf = {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
              };
              exports.help = {
                name: "donate",
                category: "Info Commands",
                description: "Donate for a donation perm with access to new commands!",
                usage: "donate"
              };