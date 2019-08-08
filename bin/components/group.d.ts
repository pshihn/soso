import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoGroup extends LitElement {
    label: string;
    private container?;
    static readonly styles: CSSResultArray;
    render(): TemplateResult;
    private onFocus;
    private onBlur;
}
