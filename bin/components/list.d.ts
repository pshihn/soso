import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoList extends LitElement {
    selected?: string;
    horizontal: boolean;
    private slotElement?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    updated(): void;
    private onClick;
}
