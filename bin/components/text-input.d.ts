import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoTextInput extends LitElement {
    label: string;
    type: string;
    disabled: boolean;
    minimal: boolean;
    autocomplete: string;
    private container?;
    input?: HTMLInputElement;
    private pendingValue?;
    static readonly styles: CSSResultArray;
    render(): TemplateResult;
    firstUpdated(): void;
    private onInput;
    private onFocus;
    private onBlur;
    value: string;
}
