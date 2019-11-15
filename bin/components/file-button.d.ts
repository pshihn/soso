import { LitElement, TemplateResult, CSSResult } from 'lit-element';
export declare class SosoFileButton extends LitElement {
    accept?: string;
    private fileInput?;
    private file?;
    static get styles(): CSSResult;
    render(): TemplateResult;
    private fileChanged;
    clear(): void;
}
