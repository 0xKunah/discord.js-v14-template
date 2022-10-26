export default interface Event
{
	once: boolean
	run: (...args: any[]) => void;
}