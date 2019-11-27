import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoSizePicker extends LitElement {
    private range?;
    private pendingValue?;
    static get styles(): CSSResult;
    render(): TemplateResult;
    focus(): void;
    private onInput;
    get value(): number;
    set value(v: number);
    firstUpdated(): void;
}
