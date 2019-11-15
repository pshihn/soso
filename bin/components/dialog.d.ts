import { LitElement, TemplateResult, CSSResultArray } from 'lit-element';
export declare class SosoDialogContainer extends LitElement {
    open: boolean;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
}
export declare class SosoDialogHelper {
    private dlg?;
    private view?;
    private originalOverflows;
    show(node: HTMLElement): void;
    hide(): void;
}
export declare const dialogs: SosoDialogHelper;
