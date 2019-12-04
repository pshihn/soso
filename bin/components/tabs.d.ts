import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
import './button';
export declare class SosoTab extends LitElement {
    selected: boolean;
    value: string;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    private buttonClick;
}
export declare class SosoTabBar extends LitElement {
    selected: string;
    private slotElement?;
    private tabPanel?;
    private activeTab?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    private resizeListener;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private onTabSelect;
    updated(): void;
    private selectTab;
    refreshSelectionBar(): void;
}
