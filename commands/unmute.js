const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter(client.config.fooder);

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 }))
        }  

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Lütfen Bir Kullanıcı Etiketle")).then(x => x.delete({ timeout: 5000 }))
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({ timeout: 5000 }))
        }
        await message.guild.members.cache.get(member.id).roles.remove(client.config.muteRoles)
        await message.guild.members.cache.get(member.id).roles.remove(client.config.voicemuteRoles)

        message.channel.send(embed.setDescription("Kullanıcının olan chat ve ses mutesi açıldı!")).then(x => x.delete({ timeout: 5000 }))
    }
}
