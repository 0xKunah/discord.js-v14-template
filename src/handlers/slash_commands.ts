import { readdir } from 'fs'
import { join } from 'path'
import { client, rest } from '../bot';
import { Routes } from 'discord.js';

export const getSlashCommands = async (): Promise<any[]> => {
	// Fetch all slash commands
	return (await rest.get(Routes.applicationGuildCommands(client.application?.id!, process.env.GUILD_ID!)) as any[])
}

export const deleteSlashCommands = async () => {
	(await getSlashCommands()).forEach(async slash => {

		// Delete all
		await rest.delete(Routes.applicationGuildCommand(client.application?.id!, process.env.GUILD_ID!, slash.id))

	});
}

export const loadSlashCommands = () => {
	// Read content of "commands" directory
	readdir(join(__dirname, "../commands/slash"), (err, cmds) => {

		// For each file
		cmds.forEach(async cmd => {

			// Ignore all non js/ts files
			if(cmd.endsWith('.js') || cmd.endsWith('.ts'))
				// Push the command in a collection
				client.slash_commands.add(cmd.replace(/\.(js|ts)/g, ""), (await import(join(__dirname, "../commands/slash/", cmd))).default)

		});

		console.log(`> ${cmds.length} Slash commands loaded`)

	})
}

export const registerSlashCommands = () => {

	// Register slash command
	rest.put(Routes.applicationGuildCommands(
		client.application?.id!, process.env.GUILD_ID!),
		{ body: client.slash_commands.map(cmd => cmd.data) }
	).then(() => {
		console.log(`> Slash commands registered`)
	})

}

export const refreshSlashCommands = async () => {

	// Delete all registered slash commands
	await deleteSlashCommands()
	loadSlashCommands()

	// Wait 2 seconds before registering again
	// I know this isn't a proper way to do
	// But using async/await or .then doenst work
	setTimeout(() => registerSlashCommands(), 2000)
}