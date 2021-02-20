const Discord = require('discord.js');
module.exports = {
    name: "avatar",
    run: async(client, message, args) => {

let member = message.mentions.users.first() ||  message.guild.members.cache.get() || message.author;
message.channel.send(new Discord.MessageEmbed()
.setAuthor(member.tag, member.displayAvatarURL({ dynamic: true }))
.setTitle('Avatar')
.setImage(member.displayAvatarURL({ dynamic: true, size: 512 })));
                     
 }
}
