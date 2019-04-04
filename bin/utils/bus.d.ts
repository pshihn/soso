import { MQBus, MessageHandler } from './core';
export declare class MessageBus implements MQBus {
    private listeners;
    private counter;
    subscribe<T>(name: string, handler: MessageHandler<T>): number;
    unsubscrive(name: string, token: number): boolean;
    dispatch(name: string, value?: any): Promise<void>;
}
export declare const bus: MessageBus;
