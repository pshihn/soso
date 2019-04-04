import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoTextArea extends LitElement {
    label: string;
    private container?;
    private input?;
    static readonly styles: CSSResultArray;
    render(): TemplateResult;
    private onInput();
    private onFocus();
    private onBlur();
}
