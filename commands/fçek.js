const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "forceçek",
    aliases: ["fçek"],
    run: async(client, message, args) => {
        if (!client.config.üstYönetim.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
        return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!').setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL))
        }
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp();
        if (!message.member.voice.channel) return message.channel.send(embed.setDescription("Önce sesli kanala girmen gerekiyor"))
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Yanına çekeceğin kişiyi belirtmedin!")).then(x => x.delete({ timeout: 5000 }))
        if (!member.voice.channel) return message.channel.send(embed.setDescription("Etiketlediğin kullanıı seste bulunmuyor!")).then(x => x.delete({ timeout: 5000 }))
        member.voice.setChannel(message.member.voice.channel.id)
        return message.channel.send(embed.setDescription(`${member} adlı kullanıcı bulunduğunuz odaya çekildi.`)).then(x => x.delete({ timeout: 5000 }));

    }
}
