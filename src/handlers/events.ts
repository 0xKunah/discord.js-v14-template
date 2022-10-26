import { readdir } from 'fs'
import { join } from 'path'
import { client } from '../bot';
import Event from '../structures/Event';
export default () => {
	// Read content of "events" directory
	readdir(join(__dirname, "../events"), (err, events) => {
		// For each file
		events.forEach(async event => {

			// Ignore all non js/ts files
			if(!event.endsWith('.js') && !event.endsWith('.ts')) return

			// Import the event class instance from the file
			const evt: Event = (await import(join(__dirname, "../events/", event))).default
			
			// Listen for the event (once or multiple times)
			if(evt.once)
				client.once(event.replace(/\.(js|ts)/g, ""), evt.run)
			else
				client.on(event.replace(/\.(js|ts)/g, ""), evt.run)
			console.log(`Client is listening for ${event.replace(/\.(js|ts)/g, "")} event`)
		})
	})
}