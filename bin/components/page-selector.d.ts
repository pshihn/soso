import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export interface PageElement extends HTMLElement {
    onActivate?: () => void;
    onDeactivate?: () => void;
}
export declare class SosoPageSelector extends LitElement {
    private _selected?;
    private slotElement?;
    private pages;
    private pageMap;
    private current?;
    static get styles(): CSSResult;
    render(): TemplateResult;
    get selected(): string;
    set selected(value: string);
    firstUpdated(): void;
    private getElement;
    updated(): void;
}
