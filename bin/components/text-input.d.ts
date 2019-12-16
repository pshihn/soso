import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoTextInput extends LitElement {
    label: string;
    type: string;
    disabled: boolean;
    minimal: boolean;
    autocomplete: string;
    placeholder: string;
    private container?;
    input?: HTMLInputElement;
    private pendingValue?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    firstUpdated(): void;
    private onInput;
    private onFocus;
    private onBlur;
    get value(): string;
    set value(v: string);
}
