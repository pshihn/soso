import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoTextInput extends LitElement {
    label: string;
    type: string;
    minimal: boolean;
    private container?;
    private input?;
    static readonly styles: CSSResultArray;
    render(): TemplateResult;
    private onInput();
    private onFocus();
    private onBlur();
}
