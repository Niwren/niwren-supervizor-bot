const ms = require('ms');
const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "unjail",
    run: async(client, message, args) => {
        if (!client.config.jailMembers.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
        }
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter('🎄Developed by Niwren🎄');
        let member = message.mentions.members.first();
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))
        if (!db.get(`xxhub_${member.id}`)) return message.channel.send(embed.setDescription("Bu Kullanıcı Jailde Değil!"))
        member.roles.set(db.get(`xxhub_${member.id}`).map(s => s.id)) //db.get(`xxhub_${member.id}`).map(s => s.id)
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı jailden çıkartıldı.`))
        message.guild.channels.cache.get(client.config.jailLog).send(embed.setDescription(`${message.author} adlı yetkili tarafından ${member} adlı kullanıcının jaili kaldırıldı!`))
    }
}
