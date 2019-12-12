import { LitElement, TemplateResult, CSSResult, PropertyValues } from 'lit-element';
export declare class SosoIcon extends LitElement {
    icon?: string;
    iconkey?: string;
    customSvg?: string;
    static get styles(): CSSResult;
    render(): TemplateResult;
    updated(changed: PropertyValues): void;
}
