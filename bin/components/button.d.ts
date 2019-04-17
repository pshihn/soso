import { LitElement, TemplateResult, CSSResult, PropertyValues } from 'lit-element';
export declare class SosoButton extends LitElement {
    outlined: boolean;
    solid: boolean;
    disabled: boolean;
    static readonly styles: CSSResult;
    render(): TemplateResult;
    updated(changed: PropertyValues): void;
}
