export type MessageHandler<T> = (data: T, name: string) => void;

export interface MQDispatcher {
  dispatch(name: string, value?: any): Promise<void>;
}

export interface MQSubscriber {
  subscribe<T>(name: string, handler: MessageHandler<T>): number;
  unsubscrive(name: string, token: number): boolean;
}

export interface MQBus extends MQDispatcher, MQSubscriber { }