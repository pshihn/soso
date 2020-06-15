import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoTextArea extends LitElement {
    label: string;
    disabled: boolean;
    placeholder: string;
    private container?;
    private input?;
    private pendingValue?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    focus(): void;
    firstUpdated(): void;
    private onInput;
    private onFocus;
    private onBlur;
    get value(): string;
    set value(v: string);
}
