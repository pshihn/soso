import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoDialogContainer extends LitElement {
    open: boolean;
    static readonly styles: CSSResultArray;
    render(): TemplateResult;
}
export declare class SosoDialogHelper {
    private dlg?;
    private view?;
    show(node: HTMLElement): void;
    hide(): void;
}
export declare const dialogs: SosoDialogHelper;
