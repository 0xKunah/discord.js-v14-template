import Command from "./Command";
import { Collection } from "discord.js";

// This class will store all commands
// With custom methods to enable/disable commands
export default class Commands {
    public collection: Collection<string, Command>;
    constructor() {
        this.collection = new Collection();
    }
    public add(name: string, command: Command) {
        this.collection.set(name, command);
    }

    public get(name: string) {
        return this.collection.get(name);
    }

    public has(name: string) {
        return this.collection.has(name);
    }

    public delete(name: string) {
        return this.collection.delete(name);
    }

    public disable(name: string): boolean {
        const command = this.get(name);
        if (!command)
            return (false);
        command.enabled = false;
        return (true);
    }

    public enable(name: string): boolean {
        const command = this.get(name);
        if (!command)
            return (false);
        command.enabled = true;
        return (true);
    }

    public enableAll() {
        this.collection.forEach((command) => {
            command.enabled = true;
        });
    }

    public disableAll() {
        this.collection.forEach((command) => {
            command.enabled = false;
        });
    }

    public clear() {
        return this.collection.clear();
    }

    public size() {
        return this.collection.size;
    }
}