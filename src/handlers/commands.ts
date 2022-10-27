import { readdir } from 'fs'
import { join } from 'path'
import { client } from '../bot';
export default () => {

	// Read content of "commands" directory
	readdir(join(__dirname, "../commands"), (err, cmds) => {

		// For each file
		cmds.forEach(async cmd => {

			// Ignore all non js/ts files
			if(cmd.endsWith('.js') || cmd.endsWith('.ts'))
			{
				// Push the command to a collection, with as key, the filename without extension, and as value, the function
				client.commands.set(cmd.replace(/\.(js|ts)/g, ""), (await import(join(__dirname, "../commands/", cmd))).default)
			}
		});

		console.log(`> ${cmds.length} Commands loaded`)				
	})
}