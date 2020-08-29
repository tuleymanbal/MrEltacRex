const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;




client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ
client.on("userUpdate", async(old, rm) => {

 

  let tag = "∧";

  let rolid = "746391448496242722";

  let kanal = "746731881634201731";

  let sunucuid = "746389249133379675";

 

  if(old.username !== rm.username) {

  if(!rm.username.includes(tag) && client.guilds.get(sunucuid).members.get(rm.id).roles.has(rolid)) {

     client.guilds.get(sunucuid).members.get(rm.id).removeRole(rolid)

     client.channels.get(kanal).send(`**${rm}, "${tag}" tagını çıkardığı için <@&${rolid}> rolü alındı!**`)

    }

   

     if(rm.username.includes(tag) && !client.guilds.get(sunucuid).members.get(rm.id).roles.has(rolid)) {

      client.channels.get(kanal).send(`**${rm}, "${tag}" tagını aldığı için <@&${rolid}> rolü verildi!**`)

      client.guilds.get(sunucuid).members.get(rm.id).addRole(rolid)

     }

  }

  })
////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

// OYNUYOR KISMI //

const activities_list = [
    "All For Aktuel",
    "Aktuel Kayıt Botu Hizmetinizdedir.",
    ];


client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Bu Kısımları Ellemeyin
        client.user.setActivity(activities_list[index]); // Bu Kısımları Ellemeyin.
    }, 3000); // Selam 1 Saniye = 1000 MiliSaniye Yapar - Kısacası Böyle Bırakırsan - 3 Saniyede 1 Değişir. 
});

// OYNUYOR KISMI //



client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


// YENİ GELENLERE MESAJ //

client.on("guildMemberAdd", async(member) => {
  try {
    let embed= new Discord.RichEmbed()
    await(member.addRole("VERİLECEK OTOMATİK ROL"))
    await client.channels.get("MESAJ GÖNDERİLECEK KANAL İD").send(`**Sunucumuza Hoşgeldin** **${member}**\n**Kayıt İçin Buraya İsmini Ve Yaşını Yaz Bekle.**\n**Hesap: **${new Date().getTime() - member.user.createdAt.getTime() < 45*24*60*60*1000 ? " ``Tehlikeli``!" : "``Güvenli``!"} \n<@&etiketlenecek rol id> **yetkisine sahip arkadaşlar ilgilenecekler.**`,)
    if(!member.roles.has("VERİLECEK OTOMATİK ROL")) {
      member.addRole("VERİLECEK OTOMATİK ROL")

    }

  } catch(err) { console.log(err) }

})

// ÖZELDEN HOŞGELDİN //

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField(``)
    .setFooter(``)
  member.send(e);
});

// ÖZELDEN HOŞGELDİN //