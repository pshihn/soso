import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoSwitch extends LitElement {
    checked: boolean;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private toggle();
}
