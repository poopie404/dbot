const Canvas = require('canvas');
const GIFEncoder = require('gifencoder');
const readFile = require('util').promisify(require('fs').readFile);
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch')

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;
	try{
		const mDel = await msg.channel.send('Working on it...');
		const link = user.avatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=512');
		const { body } = await snekfetch.get(link);
		const attachment = await getTriggered(body);
		await msg.channel.send({file:{attachment, name: 'triggered.gif'}});
		await mDel.delete();
		return;
	}catch(e){
		return msg.channel.send(`ERROR: Please try again later or alert my dev's support server can be found on https://danbot.xyz/ Error Message: ${e.message}`);
	}
}

function streamToArray(stream) {
	if (!stream.readable) return Promise.resolve([]);
	return new Promise((resolve, reject) => {
		const array = [];
		function onData(data) {
			array.push(data);
		}
		function onEnd(error) {
			if (error) reject(error);
			else resolve(array);
			cleanup();
		}
		function onClose() {
			resolve(array);
			cleanup();
		}
		function cleanup() {
			stream.removeListener('data', onData);
			stream.removeListener('end', onEnd);
			stream.removeListener('error', onEnd);
			stream.removeListener('close', onClose);
		}
		stream.on('data', onData);
		stream.on('end', onEnd);
		stream.on('error', onEnd);
		stream.on('close', onClose);
	});
}

async function getTriggered(triggered) {
	const imgTitle = new Canvas.Image();
	const imgTriggered = new Canvas.Image();
	const encoder = new GIFEncoder(256, 256);
	const canvas = new Canvas.createCanvas(256, 256);
	const ctx = canvas.getContext('2d');
	imgTitle.src = await readFile('./images/triggered.png');
	imgTriggered.src = triggered;
	
	const stream = encoder.createReadStream();
	encoder.start();
	encoder.setRepeat(0);
	encoder.setFrameRate(60);
	encoder.setQuality(1);
	
	const coord1 = [-25, -33, -42, -14];
	const coord2 = [-25, -13, -34, -10];
	
	for (let i = 0; i < 4; i++) {
		ctx.drawImage(imgTriggered, coord1[i], coord2[i], 300, 300);
		ctx.fillStyle = 'rgba(255 , 100, 0, 0.4)';
		ctx.drawImage(imgTitle, 0, 218, 256, 38);
		ctx.fillRect(0, 0, 256, 256);
		encoder.addFrame(ctx);
	}
	encoder.finish();
	return streamToArray(stream).then(Buffer.concat);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "triggered",
    category: "Fun Commands",
    description: "Make someone very T R I G G E R E D",
    usage: "triggered @user"
};