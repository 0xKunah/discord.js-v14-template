import { Message, PermissionFlagsBits } from "discord.js";
import Command from "../structures/Command";

// Example command
export default new class implements Command
{
	// Eveyone who can send messages can run it
	public permissions = PermissionFlagsBits.SendMessages;
	
	// This function will be executed when the command will be sent on a guild with the bot
	public run(msg: Message, args: string[]){
		msg.reply({ content: "Example command works !"})
	}
}