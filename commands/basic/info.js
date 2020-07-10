require("dotenv").config();
const commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

class info extends commando.Command {
    constructor(client) {
        super(client, {
            name: "info",
            aliases: ["av", "person"],
            group: "basic",
            memberName: "info",
            description:
                "Jasmine pastes out information of a person specified.",
            details:
                "Jasmine pastes out various information of a person specified by a tag.",
            format: "<@user>",
            examples: ["jas! info @Vins#9790", "jas! info Vins"],
            args: [
                {
                    key: "user",
                    prompt:
                        "Which person would you like to pull information of?",
                    type: "user",
                    default: "jasmine",
                },
            ],
        });
    }
    async run(message, args) {
        message.react("✅");

        let embed = new RichEmbed()
            .setAuthor(args.user.username, args.user.displayAvatarURL)
            .setURL(args.user.displayAvatarURL)
            .setColor(message.guild.member(args.user).displayHexColor)
            .setImage(args.user.displayAvatarURL)
            .setDescription(
                `[Direct Avatar Link!](${args.user.displayAvatarURL})`
            )
            .addField("User ID", args.user.id, true)
            .addField("Discriminator Tag", args.user.tag, true)
            .addField("Status", args.user.presence.status.toUpperCase(), true)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setTimestamp(args.user.createdAt)
            .setFooter("Account created on");

        if (args.user.presence.game)
            embed.addField("Activity", args.user.presence.game.name, true);

        if (args.user == "jasmine")
            embed.addField(
                "Invite Link",
                `[Invite me here!](${process.env.INVITE_LINK})`
            );

        message.channel.send({ embed });
    }
}

module.exports = info;
