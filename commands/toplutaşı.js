const Discord = require('discord.js');

module.exports = {
    name: "toplutaşı",
    run: async(client, message, args) => {
        if (!client.config.üstYönetim.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!').setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL))
        }
        let channel = args[0];
        if (!channel) return message.channel.send("Kulanıcılar nereye taşınıcak?").then(x => x.delete({ timeout: 5000 }))
        message.channel.send('Kullanıcılar taşınmaya başlandı')
        await message.guild.members.cache.forEach(async xx => {
            if (!xx.voice.channel) return;
            if (xx.voice.channel.id == channel) return;
            await xx.voice.setChannel(channel)

        })
        message.edit("Kullanıcı taşıma işlemi bitti!").then(x => x.delete({ timeout: 5000 }))
    }
}
