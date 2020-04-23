import { LitElement, TemplateResult, CSSResult, PropertyValues } from 'lit-element';
import './icon';
export declare class SosoIconButton extends LitElement {
    icon?: string;
    iconkey?: string;
    disabled: boolean;
    customSvg?: string;
    label?: string;
    static get styles(): CSSResult;
    render(): TemplateResult;
    updated(changed: PropertyValues): void;
}
