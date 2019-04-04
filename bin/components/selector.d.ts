import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export interface PageElement extends HTMLElement {
    onActivate(): void;
    onDeactivate(): void;
}
export declare class SosoSelector extends LitElement {
    selected?: string;
    default: string;
    private slotElement?;
    private pages;
    private pageMap;
    private current?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private mapPages();
    firstUpdated(): void;
    updated(): void;
    private getElement();
}
