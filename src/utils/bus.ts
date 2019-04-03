import { MQBus, MessageHandler } from './core';

export class MessageBus implements MQBus {
  private listeners: Map<string, Map<number, MessageHandler<any>>> = new Map();
  private counter = 0;

  subscribe<T>(name: string, handler: MessageHandler<T>): number {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Map());
    }
    this.listeners.get(name)!.set(++this.counter, handler);
    return this.counter;
  }

  unsubscrive(name: string, token: number): boolean {
    if (this.listeners.has(name)) {
      return this.listeners.get(name)!.delete(token);
    }
    return false;
  }

  async dispatch(name: string, value?: any): Promise<void> {
    const map = this.listeners.get(name);
    if (map) {
      map.forEach(async (handler) => {
        try {
          await handler(value, name);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }
}

export const bus = new MessageBus();