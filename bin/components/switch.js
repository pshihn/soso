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
import { fire } from './ui-utils/element-helper';
let SosoSwitch = class SosoSwitch extends LitElement {
    constructor() {
        super(...arguments);
        this.checked = false;
    }
    static get styles() {
        return css `
    :host {
      display: inline-block;
    }
    button {
      background: none;
      cursor: pointer;
      outline: none;
      border: none;
      padding: 10px;
      color: inherit;
      user-select: none;
      position: relative;
    }
    #track {
      box-sizing: border-box;
      width: 32px;
      height: 14px;
      opacity: 0.38;
      border-width: 1px;
      border-style: solid;
      border-color: initial;
      border-image: initial;
      border-radius: 7px;
      transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, border-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      background-color: var(--soso-switch-track-color, rgb(0, 0, 0));
      border-color: var(--soso-switch-track-color, rgb(0, 0, 0));
      pointer-events: none;
    }
    #thumb {
      position: relative;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      pointer-events: none;
      border-width: 10px;
      border-style: solid;
      border-color: initial;
      border-image: initial;
      border-radius: 50%;
      background-color: var(--soso-switch-thumb-off-color, rgb(255, 255, 255));
      border-color: var(--soso-switch-thumb-off-color, rgb(255, 255, 255));
      transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, border-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }
    #thumbPanel {
      position: absolute;
      top: 7px;
      left: 0;
      transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      transform: translateX(0px);
      will-change: transform;
    }
    #thumbPanel::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 40px;
      height: 40px;
      background-color: var(--soso-switch-track-color, rgb(0, 0, 0));
      opacity: 0;
      border-radius: 50%;
      transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      pointer-events: none;
    }

    button:hover #thumbPanel::before {
      opacity: 0.06;
    }
    button:focus #thumbPanel::before {
      opacity: 0.08;
    }
    button:active #thumbPanel::before {
      opacity: 0.22;
    }

    button.checked  #track {
      background-color: var(--soso-highlight-color, #018786);
      border-color: var(--soso-highlight-color, #018786);
      opacity: 0.54;
    }
    button.checked #thumb {
      background-color: var(--soso-highlight-color, #018786);
      border-color: var(--soso-highlight-color, #018786);
    }
    button.checked #thumbPanel {
      transform: translateX(32px);
    }
    button.checked #thumbPanel::before {
      background-color: var(--soso-highlight-color, #018786);
    }
    `;
    }
    render() {
        return html `
    <button role="switch" class="${this.checked ? 'checked' : 'unchecked'}" @click="${this.toggle}">
      <div id="track"></div>
      <div id="thumbPanel">
        <div id="thumb"></div>
      </div>
    </button>
    `;
    }
    toggle() {
        this.checked = !this.checked;
        fire(this, 'change', { checked: this.checked });
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoSwitch.prototype, "checked", void 0);
SosoSwitch = __decorate([
    customElement('soso-switch')
], SosoSwitch);
export { SosoSwitch };
