const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const invites = {};
const wait = require("util").promisify(setTimeout);

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})


client.on('message', message => {
    const prefix = "."; // prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})

client.on('ready', () => {
    wait(1000);
    client.user.setPresence({ activity: { name: 'Niwren ❤️ Serendia' }, status: 'idle' })
    client.channels.cache.get("781167012214079518").join() // ses kanalı id
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
})

client.config = {
    token: 'ODEyMjg2MTg0MTEzNDM4NzQx.YC-idQ.-BqLGv5Wlxdp_s4mN84e1aBvGmY', //token
    banMembers: ['807571845464850452'], // Ban yetkilileri
    jailMembers: ['807571845464850452'], // Jail yetkilileri
    jailRoles: ['806258056098349108'], // Jail rolleri
    muteMembers: ['807571845464850452'], // Yetkili rolleri
    muteRoles: ['806258055712866304'], // chat mute rolleri
    voicemuteRoles: ['806258055712866304'], // ses mute rolleri
    üstYönetim: ['807571845464850452'], //Üst Yönetim rolleri
    mesajLog: '', //Mesaj log
    vipRoles: ['809839955877953576'], //vip rolleri
    boosterRoles: '811611975439220776', //boosterrolü
    ekipRoles: ['807571844642504715'], //taglı rolü
    unregisteres: ['781170112186155028'], //kayıtsız rolü
    maleRoles: ['781170111691358219'], //erkek rolleri
    girlRoles: ['781170110920130583'], //kız rolleri
    mods: ['807571845464850452'], //mod rolleri
    chat: '810571293383983135', //chat idsi
    channelID: '810571293383983135', //kayıt kanalı id
    tag: '1', //tag
    guildID: '781167011787046913', //sunucu id
    taglog: '810571293383983135', //tag log id

}

client.on('message', message => {
            if (!message.guild || message.author.bot || message.content.startsWith('.')) return;
            let embed = new Discord.MessageEmbed().setColor('#00ffff')

            if (message.mentions.users.size >= 1) {
                let member = message.mentions.users.first();
                if (db.get(`${member.id}_sebeb`)) {
                    const time = moment.duration(Date.now() - db.get(`${member.id}_afktime`)).format("DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")
                    message.channel.send(embed.setDescription(`${member} adlı üye **${db.get(`${member.id}_sebeb`)}** sebebi ile **${time}dir** afk!`)).then(x => x.delete({ timeout: 3000 }))
   }
  } else {
   if(db.get(`${message.author.id}_sebeb`)){
     db.delete(`${message.author.id}_sebeb`)
     message.channel.send("Hoşgeldin artık AFK değilsin").then(x => x.delete({ timeout: 3000 }))
   }         
  }
})
let white = {// , kayup aynı şekilde devam ettirebilirsiniz
"": true,
"": true,
"": true
};
/* AYNI EVENTLERDEN BİRDEN FAZLA AÇTIM KAFANIZ KARIŞMASIN DİYE */
/*Booster olmayan kişiler chat kanalına yetkili olsa bile fotoğraf atamaz*/
client.on('message', (message) => {
  if(message.attachments.size >= 1){
   if(message.channel.id == "789476695844847637"){//chat kanalı
	if(message.member.premiumSinceTimestamp == 0){
	  if(white[message.author.id]) return;
       message.delete();	  
	}
   }
  }
})
/*Beyaz listede olmayan kişiler yönetici olsa bile reklam yapamaz */
client.on('message', async(message) => {
 if(white[message.author.id] || message.author.id == client.user.id) return;
  let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
  if (link.test(message.content)){
       db.add(`xxPornohub.${message.author.id}`, 1);
	   message.delete()
	 if(db.get(`xxPornohub.${message.author.id}`) >= 5){
    db.push(`${message.author.id}_sicil`, `Text kanallarında reklam sebebiyle **Süresiz** mutelendi  `)  
    return message.member.roles.add(client.confing.muteRoles)
	}
  }
})
/*Beyaz listede olmayan kişiler yönetici olsa bile küfür edemez */

client.on('message', async(message) => {
 if(white[message.author.id] || message.author.id == client.user.id) return;
  let kufurler = ["allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","ass","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","meme","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
  if (kufurler.some(küfür => message.content.includes(küfür))){
    db.add(`xxPornohubx.${message.author.id}`, 1);
	   message.delete()
	 if(db.get(`xxPornohubx.${message.author.id}`) >= 5){
    db.push(`${message.author.id}_sicil`, `Text kanallarında küfür sebebiyle **Süresiz** mutelendi.`)  
    return message.member.roles.add(client.confing.muteRoles)
    
	} 
  }
})
setInterval(() => {
  let timeA = (new Date().toLocaleString()).split(/(:| )/)[2]
  if(timeA == "00"){
     db.delete(`xxPornohub`);
	   db.delete(`xxPornohubx`);
  }
}, 6000)
/*Mesaj Silme Log */
client.on('messageDelete', (message) => {
  let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mesaj-log") //log kanalının ismi
  const embed = new Discord.MessageEmbed()
    .setAuthor("Mesaj Silindi", message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription(`Mesaj Sahibi: ${message.author}\nKanal: ${message.channel}\nMesaj İçeriği: \`${message.content}\``)
    .setColor("RED")
 return channel.send(embed)
})
client.on('messageUpdate', (oldMessage, newMessage) => {
  let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mesaj-log") //log kanalının ismi
  if(oldMessage.content == newMessage.content) return
  const embed = new Discord.MessageEmbed()
    .setAuthor("Mesaj Güncellendi", oldMessage.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription(`Mesaj Sahibi: ${oldMessage.author}\nKanal: ${oldMessage.channel}\nEski: \`${oldMessage.content}\`\nYeni: \`${newMessage.content}\``)
    .setColor("RED")
 return channel.send(embed)
})
/*Ufak hatalarda botun ofline olmaması için */
process.on('uncaughtException', function(err) { 
  console.log(err) 
});
/*Tag rol kısmı  */
client.on("userUpdate", async function(oldUser, newUser) {
  const guild = client.guilds.cache.get(client.config.guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === client.config.ekipRoles)
  const member = guild.members.cache.get(newUser.id)
  const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('🎄Developed by Niwren🎄');
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(client.config.tag) && !newUser.username.includes(client.config.tag)) {
          member.roles.set(client.config.ekipRoles) // taglı alımda değil iseniz "roles.set" yerine "roles.remove" yazınız
          client.channels.cache.get(client.config.taglog).send(embed.setDescription(` ${newUser} isminden \`${client.config.tag}\` çıakrtarak ailemizden ayrıldı!`))
      } else if (!oldUser.username.includes(client.config.tag) && newUser.username.includes(client.config.tag)) {
          member.roles.add(client.config.ekipRoles)
          client.channels.cache.get(client.config.chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${client.config.tag})`)
          client.channels.cache.get(client.config.taglog).send(embed.setDescription(`  ${newUser} ismine \`${client.config.tag}\` alarak ailemize katıldı`))
      }
  }

});
client.on('guildMemberAdd', (member) => {
  const mapping = {
      " ": "",
      "0": "", // Sayı İdlerini <a:isim:id> şeklinde giriniz.
      "1": "",
      "2": "",
      "3": "",
      "4": "",
      "5": "",
      "6": "",
      "7": "",
      "8": "",
      "9": "",
  };
  if (member.user.bot) return;
  member.guild.fetchInvites().then(async guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(
      i => (ei.get(i.code) == null ? i.uses - 1 : ei.get(i.code).uses) < i.uses
    );
    const daveteden = member.guild.members.cache.get(invite.inviter.id);
    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(
      `davet_${invite.inviter.id}_${member.guild.id}`
    );
    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
    else
      davetsayi = await db.fetch(
        `davet_${invite.inviter.id}_${member.guild.id}`
      );
  var toplamüye = member.guild.memberCount
  var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
  let memberDay = (Date.now() - member.user.createdTimestamp);
  let createAt = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]")
  let createAt2 = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]")
  if (memberDay > 604800000) {
      client.channels.cache.get(client.config.channelID).send(` Suncumuza hoşgeldin ${member} - \`${member.id}\`
Seninle birlikte **${toplamüye}** üyeye ulaştık
Hesabın **${createAt}** önce açılmış
Kayıt olmak için ses odalarına girip ses teyit vermen gerekiyor
Seni davet eden kişi ${daveteden} **(${davetsayi} Davet)**`)
  } else {
      client.channels.cache.get(client.config.channelID).send(
          new Discord.MessageEmbed()
          .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
          .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`)
          .setTimestamp()
          .setThumbnail(member.user.avatarURL({ dynamic: true }))
          .setFooter(`🎄Developed by Niwren🎄`))
  }
    });
})
client.on("guildMemberRemove", async member => {
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.cache.get(davetçi);
        db.delete(`kayıt_${member.id}`)
        db.add(`davet_${davetçi}_${member.guild.id}`, -1);
});
client.on('message', message => {
  const tag = message.content.toLowerCase()
  if (tag === '.tag' || tag === '!tag' || tag === 'tag') {
      message.channel.send(client.config.tag);
  }
})
client.on('message', async(message) => {
  if(!message.guild || message.author.bot || message.content.startsWith("!")) return;
  db.add(`messageData.${message.author.id}.channel.${message.channel.id}`, 1);
  db.push(`messageData.${message.author.id}.times`, {time: Date.now(), puan: 1})
  let dataOne = db.get(`messageData.${message.author.id}`) || {}
  let dataMessage =  Object.keys(dataOne).map(data => { return Object.values(dataOne[data]).reduce((a, b) => a + b, 0) })[0];

  let dataTwo = db.get(`voiceData.${message.author.id}`) || {}
  let dataVoice =  Object.keys(dataTwo).map(data => { return Object.values(dataTwo[data]).reduce((a, b) => a + b, 0) })[0];
}
})

const Activites = new Map();

client.on('voiceStateUpdate', (oldState, newState) => {
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
  if(!oldState.channelID && newState.channelID) { 
    Activites.set(oldState.id, Date.now());
  } 
      let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); 
    } else data = Activites.get(oldState.id);
  
    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) { 
        Activites.delete(oldState.id);
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    } else if(oldState.channelID && newState.channelID){
        Activites.set(oldState.id, Date.now());
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    }
  
})

client.login(client.config.token)
