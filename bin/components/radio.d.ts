import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import { SelectionController, Checkable } from './ui-utils/selection-controller';
import './icon';
export declare class SosoRadio extends LitElement implements Checkable {
    checked: boolean;
    name: string;
    private button?;
    controller?: SelectionController;
    constructor();
    static get styles(): CSSResult;
    render(): TemplateResult;
    private toggle;
    private focusHandler;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    focusNative(): void;
}
