import { Message } from "discord.js";
import Event from "../structures/Event";
import { client } from '../bot';

export default new class implements Event
{
	// Setting "once" to false means that
	// EventListener won't be removed after first trigger
	public once = false;
	public run(msg: Message)
	{
		// Prevents bots to run commands
		if(msg.author.bot) return

		// Check if message is a command, or a simple message
		if(msg.content.startsWith(process.env.PREFIX!))

			// If the command is a message, remove the prefix to make it easier to get the command name later
			msg.content = msg.content.replace(new RegExp(`^${process.env.PREFIX!}`), '');
			
		else return;	

		// Check if bot has this command
		if(client.commands.has(msg.content.split(' ')[0]))
		{
			// Get the command
			const command = client.commands.get(msg.content.split(' ')[0]);

			// Check if message author has sufficient permissions to run this command
			if(msg.member?.permissions.has(command?.permissions!))

				// If all conditions have been passed, run the command,
				// with as first parameter, the message object, and then the space-splitted message content
				command?.run(msg, msg.content.split(" ").slice(1))

			else return msg.reply({ content: `You're not allowed to run this command` })
		} else return msg.reply({ content: `Command not found` })
	}
}