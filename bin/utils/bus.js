export class MessageBus {
    constructor() {
        this.listeners = new Map();
        this.counter = 0;
    }
    subscribe(name, handler) {
        if (!this.listeners.has(name)) {
            this.listeners.set(name, new Map());
        }
        this.listeners.get(name).set(++this.counter, handler);
        return this.counter;
    }
    unsubscrive(name, token) {
        if (this.listeners.has(name)) {
            return this.listeners.get(name).delete(token);
        }
        return false;
    }
    async dispatch(name, value) {
        const map = this.listeners.get(name);
        if (map) {
            map.forEach(async (handler) => {
                try {
                    await handler(value, name);
                }
                catch (err) {
                    console.error(err);
                }
            });
        }
    }
}
export const bus = new MessageBus();
