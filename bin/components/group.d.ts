import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
import './icon';
export declare class SosoGroup extends LitElement {
    label: string;
    collapsed: boolean;
    private inner?;
    private innerContent?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    updated(): void;
}
