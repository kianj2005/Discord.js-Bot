function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`)
}

function generateHelpEmbed(guild) {
    return new Discord.MessageEmbed()
    .setColor("BLURPLE")
    .setTitle(`My very first embed`)
    .setDescription(`Hello I am ${client.user.username} and I am cool bot! \n\n **These are my commands**`)
    .setThumbnail(client.user.displayAvatarURL())
    .addFields([
        {name: "**ping**", value: `> *Shows the Ping of me*`, inline: true},
        {name: "**help**", value: `> *Gives you help!*`, inline: true},
        {name: "**deploy**", value: `> *Sets up use of slash commands!*`, inline: true}

    ])
    .setFooter(guild.name, guild.iconURL({dynamic: true}))
}

module.exports.escapeRegex = escapeRegex;
module.exports.generateHelpEmbed = generateHelpEmbed;