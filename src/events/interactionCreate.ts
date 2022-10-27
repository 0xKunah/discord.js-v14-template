import { Interaction } from "discord.js";
import Event from "structures/Event";
import { client } from "../bot";

export default new class implements Event
{
	// There will be more than one interaction
	// That's why once is set to false here
	public once = false;

	public run(interaction: Interaction)
	{
		// Check if interaction is a slash command
		if(interaction.isChatInputCommand())
		{
			// Prevents bots to run commands
			if(interaction.user.bot) return

			// Check if bot has this command
			if(client.slash_commands.has(interaction.commandName))
			{
				// Get and run the command
				client.slash_commands.get(interaction.commandName)?.run(interaction)

			} else return interaction.reply({ content: `Command not found` })
		}

	}
}