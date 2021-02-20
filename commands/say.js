  const db = require('quick.db');
  const { MessageEmbed } = require('discord.js')
  module.exports = {
      name: 'say',
      aliases: ['say', 'count'],
      run: async(client, message, args) => {
          var taglı = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(client.config.tag)).size;
          var toplamüye = message.guild.memberCount
          var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
          var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
          var boost = message.guild.premiumSubscriptionCount
          var boostlevel = message.guild.premiumTier
          const embed = new MessageEmbed()
              .setColor('#2F3136')
              .setDescription(`• Sunucumuzda şuanda toplam \`${toplamüye}\` kişi bulunmakta.
• Sunucumuzda şuan aktif \`${online}\` üye bulunmakta.
• Tagımızda toplam \`${taglı}\` kişi bulunmakta.
• Sunucumuzda toplam \`${boost}\` boost bulunmakta.(${boostlevel}. seviye)
• Sesli sohbetlerde toplam \`${Sesli}\` kişi bulunmakta`)
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
          message.channel.send(embed)
      }
  }