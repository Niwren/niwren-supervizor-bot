const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "toplu-temizle",
    run: async(client, message, args) => {
        if (!client.config.üstYönetim.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!').setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL))
        }
        db.all().filter(data => data.ID.endsWith("_sicil")).forEach(data => {
            db.delete(data.ID)
        })

        message.channel.send("Bütün Siciller Temizlendi")

    }
}