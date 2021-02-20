const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ["katliam", "yasakla"],
    run: async(client, message, args) => {

        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp()
        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "ban-log") //log kanalının ismi
        if (!client.config.banMembers.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 }))
        }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let moment = require('moment')
        moment.locale('tr')
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı etiketlenmedi veya bulunamadı!")).then(x => x.delete({ timeout: 5000 }))
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({ timeout: 5000 }))
        }
        let reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(embed.setDescription("Kullanıcıyı neden banlamak istiyorsunuz.")).then(x => x.delete({ timeout: 5000 }))
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı ${message.author} tarafından **${reason}** sebebiyle sunucudan yasaklandı!`).setImage('https://cdn.discordapp.com/attachments/812314337770471424/812316199554777098/tenor.gif')).then(x => x.delete({ timeout: 5000 }))
        channel.send(embed.setTitle('Kullanıcı Yasaklandı').setDescription(`Yetkili: ${message.author} - \`${message.author.id}\` \n Banlanan: ${member} - \`${member.id}\` \n Sebep: ${reason}`))
        member.send(embed.setDescription(`**${member.guild.name}** sunucusundan **${reason}** sebebi ile  ${message.author} tarafından **yasaklandın!**`))
        db.delete(`kayıt_${member.id}`)
        message.guild.members.ban(member.id, { reason: `Yetkili: ${message.author} || Sebep ${reason} || Aptal Botcu Niwren!}` })
        db.add(`${message.author.id}_ban`, 1)
        db.push(`${member.id}_sicil`, `\`[BAN]\`${message.author} tarafından **${reason}**  sebebiyle **${moment().format('LLL')}** tarihinde sunucudan **banlandı**.`)
        db.push(`${message.author.id}_banlıüyelers`, { id: member.id })
    }
}