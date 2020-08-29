const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_NICKNAMES"))
return message.channel.send(
`:x: Bu Komutu Kullanabilmek için \`İsimleri Yönet\` Yetkisine Sahip Olmalısın!`
);
let member = message.mentions.members.first();
let isim = args.slice(1).join(" ");
let yas = args.slice(1).join(" ");
if (!member) return message.channel.send(":x: **Bu Komutu Kullanmak İçin Bir Üyeyi Etiketlemeniz Gerekiyor!**");
if (!isim) return message.channel.send(":x: **Bir İsim ve Yaş Yaz!**");
member.setNickname(`${isim}`);
member.removeRole('746391449771442257')
member.addRole('746391449318457445')
const embed = new Discord.RichEmbed()

.setFooter('Aktuel', client.user.avatarURL)
.setColor(0xFF0000)
.addField(`Aktuel Kayıt Sistemi`,
`\n:white_check_mark: Kayıt Edilen Kullanıcı: ${member.user} \n:white_check_mark: Kayıt Eden Yetkili: \`${message.author.username}\`\n:white_check_mark: Başarıyla Kayıt Olundu!`)
client.channels.get('746738846032461865').send(embed)
};
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['k'],
permLevel: 0
};
exports.help = {
name: "kayıt",
description: "Aktuel Kayıt Sistemi",
usage: "Aktuel Kayıt"
};