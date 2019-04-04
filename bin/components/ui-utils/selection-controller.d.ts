export interface Checkable extends HTMLElement {
    checked: Boolean;
    name: string;
    focusNative(): void;
}
declare class SelectionSet {
    selected: Checkable | null;
    ordered: Checkable[] | null;
    readonly set: Set<Checkable>;
}
export declare class SelectionController {
    private sets;
    private focusedSet;
    private mouseIsDown;
    private updating;
    static getController(element: HTMLElement): SelectionController;
    constructor(element: Node);
    protected keyDownHandler(e: KeyboardEvent): void;
    protected mousedownHandler(): void;
    protected mouseupHandler(): void;
    has(element: Checkable): boolean;
    previous(element: Checkable): void;
    next(element: Checkable): void;
    select(element: Checkable): void;
    focus(element: Checkable): void;
    getOrdered(element: Checkable): Checkable[];
    getSet(name: string): SelectionSet;
    register(element: Checkable): void;
    unregister(element: Checkable): void;
    update(element: Checkable): void;
}
export {};
