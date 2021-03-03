const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "afk",
    run: async(client, message, args) => {
  let kullanıcı = message.guild.members.cache.filter(s => s.roles.cache.has(client.config)).filter(s => !s.voice.channel).size
  for(var i = 0;i < kullanıcı;i++){
    let a = message.guild.members.cache.filter(s => s.roles.cache.has(client.config)).filter(s => !s.voice.channel).map(a => a)[i]
    const userDM = await a.createDM()
try {
    await userDM.send("Lütfen seslere giriniz discord.gg/floria")
} catch {
    await message.channel.send(`<@${a.user.id}> adlı kullanıcının dm kutusu kapalı. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin`)
}
  }
    
};
    }
}
