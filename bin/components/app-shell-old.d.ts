import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoAppShell extends LitElement {
    drawerOpen: boolean;
    disableDrawer: boolean;
    private resizeListener;
    static readonly styles: CSSResultArray;
    render(): TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(): void;
    private toggleDrawer;
    private closeDrawer;
    private onResize;
}
