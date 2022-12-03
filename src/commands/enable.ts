import { Message, PermissionFlagsBits } from "discord.js";
import Command from "../structures/Command";
import { client } from '../bot';

// Disable command
export default new class implements Command
{
    // By default, the command is enabled
    public enabled = true;

    // Only admins can run it
    public permissions = PermissionFlagsBits.Administrator;

    // This function will be executed when the command will be sent on a guild with the bot
    public run(msg: Message, args: string[]){
        if (args[0] == "disable" || args[0] == "enable") return msg.reply({ content: `You can't enable the **${args[0]}** command, to do it, edit manually the files !`})
        if (args[0] == "all")
        {
            client.commands.enableAll()
            msg.reply({ content: `All commands enabled !`})
        }
        else if (client.commands.enable(args[0]))
            msg.reply({ content: `**${args[0]}** command enabled !`})
        else
            msg.reply({ content: `**${args[0]}** command not found !`})
    }
}