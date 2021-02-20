const Discord = require('discord.js')
module.exports = {
    name: "help",
    aliases: ["yardım"],
    run: async(client, message, args) => {
        message.channel.send(new Discord.MessageEmbed().setDescription(`\`.afk [sebep]
.ban [kullanıcı/İD] [sebep]
.mute [kullanıcı/İD] [süre] [sebep]
.jail [kullanıcı/İD] [süre] [sebep]
.fçek [kullanıcı/İD]
.fgit [kullanıcı/İD]
.git [kullanıcı/İD]
.çek [kullanıcı/İD]
.isim [kullanıcı/İD] [isim] [yaş]
.isimler [kullanıcı/İD]
.istatistik 
.kayıt [kullanıcı/İD] [isim] [yaş]
.kayıtsız [kullanıcı/İD]
.kilit
.say
.sicil-temizle [kullanıcı/İD]
.sicil [kullanıcı/İD]
.uyarılar [kullanıcı/İD]
.sil
.stat
.teyit
.toplu-temizle
.toplutaşı [odaİD]
.topteyit
.topstat
.unban [kullanıcı/İD]
.unjail [kullanıcı/İD]
.unmute [kullanıcı/İD]
.uyar [kullanıcı/İD]
.vip [kullanıcı/İD] [isim] [yaş]
.seskontrol [kullanıcı/İD]
.yetkilises\``)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        )
    }
}