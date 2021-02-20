const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "sesk",
    aliases: ["seskontrol"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp();
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!")).then(x => x.delete({ timeout: 5000 }))
        if (!member.voice.channel) return message.channel.send(embed.setDescription("Etiketlediğin kullanıı seste bulunmuyor!")).then(x => x.delete({ timeout: 5000 }))
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı \`${member.voice.channel.name}\` adlı kanalda bulunuyor`))

    }
}