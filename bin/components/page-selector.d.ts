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
    static readonly styles: CSSResult;
    render(): TemplateResult;
    selected: string;
    firstUpdated(): void;
    private getElement;
    updated(): void;
}
