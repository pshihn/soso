import { MQDispatcher } from './core';
export interface Route {
    path: string;
    segments: string[];
    context?: any;
}
export interface ReturnPath {
    successPath: string;
    cancelPath: string;
}
export declare class Router {
    route?: Route;
    private bus?;
    private changeListener;
    private clickEvent;
    private clickListener;
    constructor(bus?: MQDispatcher);
    goto(url: string, context?: any): void;
    goHome(): void;
    goAppHome(context?: any): void;
    updateContext(context: any): void;
    replace(url: string, context?: any): void;
    connect(): void;
    private _which;
    private _isSameOrigin;
    private onLinkClick;
    private detachHandlers;
    private onChanged;
}
