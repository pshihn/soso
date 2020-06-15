import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import './icon';
export declare class SosoFab extends LitElement {
    icon?: string;
    iconkey?: string;
    customSvg?: string;
    label?: string;
    static get styles(): CSSResult;
    render(): TemplateResult;
    focus(): void;
}
