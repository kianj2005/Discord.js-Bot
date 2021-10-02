const Discord = require("discord.js");
const config = require("../config.json");

module.exports = client => {

    const { escapeRegex, generateHelpEmbed } = require("../utils/functions.js")

    client.on("messageCreate", async (message) => {
        if(!message.guild || message.author.bot) return;
        let { prefix } = config;
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`)
        if(!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        let args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        let cmd = args.shift()?.toLowerCase();
        if(cmd.length == 0) {
            if(matchedPrefix.includes(client.user.id)) {
                return message.reply({embeds: [
                    new Discord.MessageEmbed().setColor("BLURPLE").setTitle(`:white_check_mark: **My Prefix is: \`${prefix}\`**`)
                ]}).catch(console.error);
            }
        }
        if(cmd) {
            switch(cmd) {
                case "ping":
                    {
                        message.reply("Pinging the API...").then((msg)=>{
                            msg.edit({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - msg.createdTimestamp) - (2 * client.ws.ping)}\` `}).catch(console.error);
                        }).catch(console.error);
                    }
                break;
                case "help":
                    {
                        const embed = generateHelpEmbed(message.guild)
                        message.reply({
                            embeds: [embed]
                        }).catch(console.error)
                    }
                break;
                case "deploy":
                    {
                        message.guild.commands.set(client.allSlashCommands).catch(console.error);
                        message.reply(`:white_check_mark: Deployed ${client.allSlashCommands.length} Commands to ${message.guild.name}`).catch(console.error)
                    }
                break;
                default:
                    {
                        message.reply(`:x: **Unkown Command**`).catch(console.error);
                    }
                break;
    
            }
        }
    })
    
    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isCommand()) return;
        const { member, channelId, guildId, applicationId,
        commandName, deferred, replied, ephemerial,
        options, id, createdTimestamp
        } = interaction;
        const { guild } = member;
        let channel = guild.channels.cache.get(channelId);
    
        switch(commandName) {
            case "ping": 
            {
                let choice = interaction.options.getString("what_ping");
                if(!choice) {
                interaction.reply({content: "Pinging the API...", ephemeral: true}).then((inter)=>{
                    interaction.editReply({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - createdTimestamp) - (2 * client.ws.ping)}\` `, ephemeral: true}).catch(console.error);
                }).catch(console.error);
            } else if(choice == "apiping") {
                interaction.reply({content: `**API PING:** \`${client.ws.ping}\``, ephemeral: true}).catch(console.error);
            } else {
                interaction.reply({content: "Pinging the API...", ephemeral: true}).then((inter)=>{
                    interaction.editReply({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - createdTimestamp) - (2 * client.ws.ping)}\` `, ephemeral: true}).catch(console.error);
                }).catch(console.error);
            }
    
            } break;
            case "help": 
            {
                const embed = generateHelpEmbed(guild)
                        interaction.reply({
                            embeds: [embed], ephemerial: true
                        }).catch(console.error)
            } break;
    
             
        
        }
        
    })
}