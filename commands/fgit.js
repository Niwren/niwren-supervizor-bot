const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "forcegit",
    aliases: ["fgit"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp();
        if (!message.member.voice.channel) return message.channel.send(embed.setDescription("Önce sesli kanala girmen gerekiyor"))
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Yanına gideceğin kişiyi belirtmedin!")).then(x => x.delete({ timeout: 5000 }))
        if (!member.voice.channel) return message.channel.send(embed.setDescription("Etiketlediğin kullanıı seste bulunmuyor!")).then(x => x.delete({ timeout: 5000 }))
        message.member.voice.setChannel(member.voice.channel.id)
        return message.channel.send(embed.setDescription(`${member} adlı kullanıcının bulunduğu odaya gidildi`)).then(x => x.delete({ timeout: 5000 }));

    }
}