const db = require('quick.db');

module.exports = {
    name: "sicil-temizle",
    run: async(client, message, args) => {
        //if(message.guild.ownerID !== message.author.id) return;
        if (!client.config.üstYönetim.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!').setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL))
        }
        let member = message.mentions.members.first();
        if (!member) return message.channel.send("kullanıcı belirt.")

        db.delete(`${member.id}_sicil`)
        message.channel.send("Kullanıcının Tüm Sicileri Silindi.")

    }
}
