const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');
require("moment-duration-format");
const db = require('quick.db');


module.exports = {
    name: "uyar",
    run: async(client, message, args) => {
        if (!client.config.jailMembers.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda gerekli yetki bulunmuyor!"))
        }
        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mute-log")
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp();
        let member = message.mentions.members.first();
        moment.locale('tr')
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunmaadı eya etiketlenmedi!"))
        let reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(embed.setDescription("kullanıcıyı neden banlamak istiyorsunuz."))
        db.push(`${member.id}_uyarılar`, `${message.member} tarafından **${moment().format('LLL')}** tarhinde **${reason}** sebebi ile uyarı aldı`)
        db.add(`xxuyarı_${member.id}`, 1)
        let uyarı = db.get(`xxuyarı_${member.id}`)
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı ${message.member} adlı yetkili tarafından ${reason} sebebiyle uyarıldı!`))
        if (uyarı > 2) {
            channel.send(embed.setDescription(`${member} Adlı Kullanıcı **3** Uyarı Limitini Aştığı İçin 30 dakika Susturuldu.`))
            member.roles.add(client.config.muteRoles)
            setTimeout(() => {
                member.roles.remove(client.config.muteRoles)
            }, 1800000)
        }
    }
}