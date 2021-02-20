const db = require('quick.db');
const { MessageEmbed } = require('discord.js')

const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

module.exports = {
        name: 'me',
        aliases: ['stat'],
        run: async(client, message, args) => {


                var member = message.mentions.users.first() || message.author;

                let dataMessage = await db.get(`messageData.${member.id}.channel`) || {};
                let dataVoice = await db.get(`voiceData.${member.id}.channel`) || {};

                let messageData = Object.keys(dataMessage).map(id => {
                    return {
                        channelID: id,
                        totalMessage: dataMessage[id]
                    }
                }).sort((a, b) => b.totalMessage - a.totalMessage);

                let voiceData = Object.keys(dataVoice).map(id => {
                    return {
                        channelID: id,
                        totalTime: dataVoice[id]
                    }
                }).sort((a, b) => b.totalTime - a.totalTime);

                let dataMessage0 = await db.get(`messageData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
                let dataVoice0 = await db.get(`voiceData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];

                let messageData0 = Object.values(dataMessage0).map(id => {
                    console.log(id)
                    return {
                        time: id.time,
                        puan: id.puan
                    };
                })
                let voiceData0 = Object.values(dataVoice0).map(id => {
                    return {
                        time: id.time,
                        puan: id.puan
                    };
                })

                let message14 = messageData0.filter(data => (Date.now() - (86400000 * 14)) < data.time).reduce((a, b) => a + b.puan, 0);
                let message7 = messageData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
                let message24 = messageData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);

                let ses14 = voiceData0.filter(data => (Date.now() - (86400000 * 14)) < data.time).reduce((a, b) => a + b.puan, 0);
                let ses7 = voiceData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
                let ses24 = voiceData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);

                const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(member.avatarURL({ dynamic: true }))
                    .setDescription(`${member} - (${member.tag})\n\nSon 14 Gündeki kullanıcı istatistikleri.`)
                    .addField("Kullanıcı Bilgi",
                        `Giriş Tarihi: \`${moment.utc(message.guild.members.cache.get(member.id).joinedTimestamp).format('D MMMM YYYY')}\`
               Kayıt Tarihi: \`${moment.utc(message.author.createdTimestamp).format('D MMMM YYYY')}\`
               Kullanıcı ID: \`${member.id}\``
                    )
                    .addField("En İyi Kanal",
                        `Mesaj: ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\`
               Ses: ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? moment.duration(voiceData[0].totalTime).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]") : 'Veri Yok!'}\``
             )
    .addField("Mesaj Verileri", `__14 Gün__: \`${message14} Mesaj\`\n7 Gün: \`${message7} Mesaj\`\n24 Saat: \`${message24} Mesaj\``, true)
    .addField("Ses Verileri", `__14 Gün__: \`${moment.duration(ses14).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\`\n7 Gün: \`${moment.duration(ses7).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\`\n24 Saat: \`${moment.duration(ses24).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\``, true)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp()
    message.channel.send(embed)
  }
}