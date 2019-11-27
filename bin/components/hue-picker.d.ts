import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoHuePicker extends LitElement {
    private range?;
    static get styles(): CSSResult;
    render(): TemplateResult;
    focus(): void;
    private onInput;
    get value(): number;
    set value(v: number);
    private updateThumbColor;
}
