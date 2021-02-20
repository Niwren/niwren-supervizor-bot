const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "sicil",
    run: async(client, message, args) => {
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp();

        if (!client.config.jailMembers.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed2.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
        }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Bir Kullanıcı belirt!");
        if (!db.get(`${member.id}_sicil`)) return message.channel.send("bu kullanıcı hiç işlem görmedi.");
        var sicil = db.get(`${member.id}_sicil`).map((data, index) => `\`${index+1}.\` ${data}`).join("\n")
        const embed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setAuthor(message.member.displayName, message.guild.iconURL({ dynamic: true }))
            .setDescription(`${member} Adlı kullanıcının sicili:\n${sicil}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        return message.channel.send(embed)
    }
}