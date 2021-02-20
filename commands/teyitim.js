const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'teyitsayım',
    aliases: ['tt', 'teyittoplam', 'teyitkontrol','teyit'],
    run: async(client, message, args) => {
        var member = message.mentions.users.first() || message.author;
        let erkek = db.get(`erkek_${member.id}`) || 0
        let kız = db.get(`kız_${member.id}`) || 0
        let toplam = db.get(`toplam_${member.id}`) || 0
        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setTitle("Kayıt Bilgisi")
            .setDescription(`Sunucudaki Toplam Teyit Sayın: \`${toplam}\` (Erkek: ${erkek} || Bayan: ${kız})`)
        message.channel.send(embed)
    }
}