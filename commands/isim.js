const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'isim',
    aliases: ['isim', 'nick', 'name', 'i'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp();

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 }))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!")).then(x => x.delete({ timeout: 5000 }))

        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!")).then(x => x.delete({ timeout: 5000 }))

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş yazılmak zorunda!")).then(x => x.delete({ timeout: 5000 }))

        message.guild.members.cache.get(member.id).setNickname(`${client.config.tag} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (isim değiştirme>)`);
        message.channel.send(embed.setDescription(`${member} adlı kullanıcının ismi \`${name} | ${age}\` olarak değiştirildi`)

        )
    }
}
