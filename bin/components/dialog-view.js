var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, property, css } from 'lit-element';
let SosoDialogView = class SosoDialogView extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
    }
    static get styles() {
        return css `
    :host {
      display: block;
      max-width: 400px;
      margin: 0 auto;
      box-sizing: border-box;
      background: white;
      border-radius: 3px;
      overflow: hidden;
      box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
    }
    #toolbar {
      padding: 16px;
      text-transform: capitalize;
      text-align: var(--soso-dialog-title-align, left);
      background: var(--soso-dialog-title-bg, #f5f5f5);
      color: var(--soso-dialog-title-color, #000000);
      border-bottom: var(--soso-dialog-title-border, none);
      letter-spacing: 0.8px;
      font-size: 1.15em;
      display: var(--soso-dialog-title-display, block);
    }
    #content {
      padding: 16px;
    }
    #footer {
      padding: 16px;
      text-align: var(--soso-dialog-footer-align, right);
      background: var(--soso-dialog-footer-bg, #f5f5f5);
      border-top: var(--soso-dialog-footer-border, none);
    }
    #footer ::slotted(*) {
      margin-left: 8px;
    }
    `;
    }
    render() {
        return html `
    <div id="toolbar">${this.label}</div>
    <div id="content">
      <slot name="main"></slot>
    </div>
    <div id="footer">
      <slot name="footer"></slot>
    </div>
    `;
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoDialogView.prototype, "label", void 0);
SosoDialogView = __decorate([
    customElement('soso-dialog-view')
], SosoDialogView);
export { SosoDialogView };
