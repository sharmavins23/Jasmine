require("dotenv").config();
const commando = require("discord.js-commando");
const path = require("path");

// * Client initialization
const client = new commando.Client({
    owner: process.env.OWNER,
    commandPrefix: process.env.BOTANIST_PREFIX,
    nonCommandEditable: true,
});

// * Event handlers
// Startup
client.on("ready", () => {
    client.user.setStatus("online");
    client.user.setActivity("Jasmine", { type: "WATCHING" }).then(
        console.log(
            // Now logs size of GuildManager's cache
            `Jasmine testbot is online on ${client.guilds.cache.size} servers.`
        )
    );
});

// Guild events
client.on("guildCreate", (guild) =>
    console.log(`Jasmine testbot has joined ${guild.name}. ID: ${guild.id}`)
);
client.on("guildDelete", (guild) =>
    console.log(`Jasmine testbot has left ${guild.name}. ID: ${guild.id}`)
);

// Error handling
client.on("error", (e) => {
    client.user.setStatus("dnd");
    console.error(e);
});
client.on("warn", (e) => {
    client.user.setStatus("idle");
    console.warn(e);
});

// * Command registry
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["basic", "Basic commands"],
        ["owner", "Owner-locked commands"],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, "commands"));

// * Magic!
client.login(process.env.BOTANIST_TOKEN);
