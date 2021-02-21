const ms = require('ms');
const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "unban",
    run: async(client, message, args) => {
        if (!client.config.banMembers.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
        }
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL);
        let member = args[0];
        const banList = await message.guild.fetchBans();
        if (!member || isNaN(member) || !banList.has(member)) {
            return message.channel.send(embed.setDescription(` Kullanıcı id hatalı veya kullanıcı yasaklı değil!`))
        }
        message.guild.members.unban(member);
        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "ban-log")
        message.channel.send(embed.setDescription(`${member} adlı kullanıcının banı açıldı`))
        channel.send(embed.setDescription(`${message.author} adlı yetkili tarafından <@${member}> adlı kullanıcının banını kaldırıldı!`))
    }
}
