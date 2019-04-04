import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import './icon';
export declare class SosoCheckbox extends LitElement {
    checked: boolean;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    private toggle;
}
