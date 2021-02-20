const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'k',
    aliases: ['erkek', 'kız', 'k', 'e', 'kayıt'],
    run: async(client, message, args) => {

        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('Muratva Stark X İngiltereli X Niwren');
        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
        }
        //    if (message.channel.id !== client.config.channelID) return message.channel.send(embed.setDescription('Komutu sadece <#${client.config.channelID}> analında kullanabilirsin'))

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))

        let name = args[1].charAt(0).replace("i", "İ").toUpperCase() + args[1].slice(1).toLowerCase();
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))

        let age = Number(args[2]);
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş kullanılmak zorunda!"))


        ////TAGLI ALIMDA ETKİNLEŞTİR
        /*  if (!member.user.username.includes(client.config.tag)  && !message.guild.members.cache.get(member.id).roles.cache.has(client.config.boosterRoles)) {
              return message.channel.send(embed.setDescription("Bu Kullanıcıda Tag veya Etiket Yok! Kayıt olabilmesi için boost basmalı veya tag almalı!"))
          } */

        if (db.get(`kayıt_${member.id}`)) return message.channel.send(embed.setDescription("Kayıtlı olan bir kullanıcı tekrar kayıt edilemez!"))
        const msg = await message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`Kullanıcının ismi \"${name} | ${age}\" olarak değiştirildi`).setColor('#2e3033').setTimestamp().setThumbnail(message.author.avatarURL).setFooter(`Emoji ile cinsiyeti belirtiniz!`))
        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
        message.guild.members.cache.get(member.id).setNickname(`${client.config.tag} ${name} | ${age}`).catch();
        await msg.react('812493696217382912') // erkek emojileri soldaki gibi giriniz
        await msg.react('812493696150142976') //kız

        collector.on("collect", async(reaction, user) => {
            await msg.reactions.removeAll()
            if (reaction.emoji.id == '812493696217382912') { //erkek
                db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (erkek)`);
                db.set(`kayıt_${member.id}`, true)
                db.add(`erkek_${message.author.id}`, 1)
                db.add(`toplam_${message.author.id}`, 1)
                await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
                await message.guild.members.cache.get(member.id).roles.add(client.config.maleRoles)
                msg.edit(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`**${member}** adlı kullanıcı \`${name} | ${age}\` olarak kayıt edildi.(<@&789476656061743124>)`).setColor('#2e3033').setFooter(`'.isimler @kullanıcı' yaparak kullanıcının eski isimlerine bakabilirsiniz.`))
            }
            if (reaction.emoji.id == '812493696150142976') { //kız
                db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (kız)`);
                db.set(`kayıt_${member.id}`, true)
                db.add(`kız_${message.author.id}`, 1) // Kafanız karışmaması için 2 sefer kayıt ettiriyorum
                db.add(`toplam_${message.author.id}`, 1)
                await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
                await message.guild.members.cache.get(member.id).roles.add(client.config.girlRoles)
                return msg.edit(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`**${member}** adlı kullanıcı \`${name} | ${age}\` olarak kayıt edildi.(<@&789476654967160854>)`).setColor('#2e3033').setFooter(`'.isimler @kullanıcı' yaparak kullanıcının eski isimlerine bakabilirsiniz.`))
            }
            client.channels.cache.get(client.config.chat).send('<@!' + member + '>, Sunuzumuza hoşgeldin seni aramızda görmek bize mutluluk veriyor.')
        })
    }
}