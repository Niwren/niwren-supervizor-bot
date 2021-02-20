const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "git",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp();
        if (!message.member.voice.channel) return message.channel.send(embed.setDescription("Önce sesli kanala girmen gerekiyor")).then(x => x.delete({ timeout: 5000 }))
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Yanına gideceğin kişiyi belirtmedin!")).then(x => x.delete({ timeout: 5000 }))
        if (!member.voice.channel) return message.channel.send(embed.setDescription("Etiketlediğin kullanıı seste bulunmuyor!")).then(x => x.delete({ timeout: 5000 }))
        const filter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name) && user.id == member.id;
        };
        await message.channel.send(`${member}`, { embed: embed.setAuthor(member.displayName, member.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`${message.author} senin ses kanalına girmek istiyor istiyormusun?`) }).then(async msg => {
            await msg.react("✅")
            msg.awaitReactions(filter, {
                max: 1,
                time: 15000,
                errors: ['time']
            }).then((collected) => {
                message.member.voice.setChannel(member.voice.channel.id)
                return msg.edit("İsteğiniz onaylandı.").then(x => x.delete({ timeout: 5000 }));
            }).catch((err) => {
                return msg.edit("Kullanıcı isteğinizi reddetti!").then(x => x.delete({ timeout: 5000 }))
            })
        })
    }
}