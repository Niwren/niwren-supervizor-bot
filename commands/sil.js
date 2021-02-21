const Discord = require('discord.js');
module.exports = {
    name: "sil",
    aliases: ["sil", "clear"],
    run: async(client, message, args) => {
        if (!client.config.üstYönetim.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!').setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL))
        }
        let adet = args[0];
        if (!adet) return message.channel.send("Ne kadar mesaj silineceğini belirtin").then(x => x.delete({ timeout: 5000 }))
        message.channel.bulkDelete(adet).then(() => {
            return message.channel.send(`**${adet}** adet mesaj sildim.`).then(x => x.delete({ timeout: 2000 }))
        }).catch(err => {
            return message.channel.send("Beklenmedik bir arıza yaşandı lütfen bot sahibine haber verin!")
        })

    }
}
