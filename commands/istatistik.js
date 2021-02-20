const Discord = require('discord.js');
const db = require('quick.db');
const moment = require("moment");

module.exports = {
        name: 'kullanıcıbilgi',
        aliases: ['kb'],
        run: async(client, message, args) => {


                var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
                var user = message.guild.member(member);

                let status = member.presence.status.replace("offline", "Gorunmez/Çevrimdışı").replace("online", "Çevrimiçi").replace("idle", "Boşta").replace("dnd", "Rahatsız Etmeyin")
                let katılma = moment(user.joinedAt).format(`HH:mm | DD/MM/YYYY`).replace("/01/", " Ocak ").replace("/02/", " Şubat ").replace("/03/", " Mart ").replace("/04/", " Nisan ").replace("/05/", " Mayıs ").replace("/06/", " Haziran ").replace("/07/", " Temmuz ").replace("/08/", "Ağustos").replace("/09/", " Eylül ").replace("/10/", " Ekim ").replace("/11/", " Kasım ").replace("/12/", " Aralık ")
                let roller = user.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(', ')
                let erkek = db.get(`erkek_${member.id}`) || 0
                let kız = db.get(`kız_${member.id}`) || 0
                let toplam = db.get(`toplam_${member.id}`) || 0
                let ban = db.get(`ban_${member.id}`) || 0
                let jail = db.get(`jail_${member.id}`) || 0
                let chatmute = db.get(`chatmute_${member.id}`) || 0
                let sesmute = db.get(`sesmute_${member.id}`) || 0
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
                message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`__**Kullanıcı Bilgisi**__ \n\nKullanıcı: ${member}\nID: ${member.id}\nTag: ${member.tag}\nDurum: ${status}\n\n**Üyelik Bilgisi**\n\nTakma ad: ${user.displayName.replace("`", "")} ${user.nickname ? "" : "[Yok]"}\nKatılma Tarihi: ${katılma}\nRolleri: ${roller}\n\n**Teyit Bilgisi**\nToplam: ${toplam}(Erkek: ${erkek} || Bayan: ${kız})\n\n**Yetkili Bilgisi**\nToplam: ${ban + jail + sesmute + chatmute}(Ban: ${ban} | Jail: ${jail} | Ses Mute: ${sesmute} | Text Mute: ${chatmute})\n\n**İstatistik Bilgisi**\n Mesaj: ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\`\nSes: ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? moment.duration(voiceData[0].totalTime).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]") : 'Veri Yok!'}\``).setThumbnail(message.author.avatarURL({ dynamic: true })))
    }
}