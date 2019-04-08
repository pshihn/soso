import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoList extends LitElement {
    selected?: string;
    private slotElement?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    updated(): void;
    private onClick;
}
