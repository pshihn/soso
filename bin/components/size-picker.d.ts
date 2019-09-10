import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoSizePicker extends LitElement {
    private range?;
    private pendingValue?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    focus(): void;
    private onInput;
    value: number;
    firstUpdated(): void;
}
