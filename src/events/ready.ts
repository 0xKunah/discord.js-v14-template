import Event from "../structures/Event";

export default new class implements Event
{
	// After the bot is ready, it won't be a second time, so listening once is enough
	public once = true;
	public run()
	{
		console.log('Client ready !')
	}
}