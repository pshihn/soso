import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoHuePicker extends LitElement {
    private range?;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private onInput;
    value: number;
    private updateThumbColor;
}
