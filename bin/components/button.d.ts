import { LitElement, TemplateResult, CSSResult, PropertyValues } from 'lit-element';
export declare class SosoButton extends LitElement {
    outlined: boolean;
    solid: boolean;
    disabled: boolean;
    static get styles(): CSSResult;
    render(): TemplateResult;
    updated(changed: PropertyValues): void;
}
