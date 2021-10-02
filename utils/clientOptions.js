const Discord = require("discord.js");
module.exports.ClientOptions = 
{
    restTimeOffset: 0,
    allowedMentions: {
        parse: [/* "roles", "users", "everyone" */],
        repliedUser: false, 
    },
    partials: [ "MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ],
    presence: {
        activities: [{
            name: "Your Mum",
            type: "PLAYING",
        }],
        status: "dnd"
    }
};

