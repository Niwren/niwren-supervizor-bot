const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "afk",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setColor('#00ffff')
        let sebeb = args.slice(0).join(' ')
        let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
        if (link.test(sebeb)) {
            return message.channel.send(embed.setDescription("Afk sebebine link giremezsin!")).then(x => x.delete({ timeout: 5000 }))
        }
        if (!sebeb) return message.channel.send(embed.setDescription("AFK moduna girmek için sebep belirtmen gerekiyor.")).then(x => x.delete({ timeout: 5000 }));
        message.channel.send("Başarılı Bir Şekilde AFK Moduna Girdin. Herhangi bir kanala birşey yazana kadar afk sayılıcaksın!").then(x => x.delete({ timeout: 10000 }))
        db.set(`${message.author.id}_sebeb`, sebeb);
        db.set(`${message.author.id}_afktime`, Date.now())
    }
}