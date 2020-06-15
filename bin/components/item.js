var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, property, css } from 'lit-element';
import { element } from '../registry';
let SosoItem = class SosoItem extends LitElement {
    constructor() {
        super(...arguments);
        this.value = '';
        this.selected = false;
    }
    static get styles() {
        return css `
    :host {
      display: inline-block;
      font-size: 14px;
      text-align: left;
    }
    button {
      cursor: pointer;
      outline: none;
      overflow: hidden;
      color: inherit;
      user-select: none;
      position: relative;
      font-family: inherit;
      text-align: inherit;
      font-size: inherit;
      letter-spacing: 1.25px;
      padding: 1px 10px;
      min-height: 36px;
      text-transform: inherit;
      background: none;
      border: none;
      transition: background-color 0.3s ease, color 0.3s ease;
      width: 100%;
      box-sizing: border-box;
    }
    button.selected {
      background: var(--soso-highlight-color, #018786);
      color: var(--soso-highlight-foreground, white);
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      opacity: 0;
    }
    button span {
      display: inline-block;
      transition: transform 0.2s ease;
    }
    button:active span {
      transform: scale(1.02);
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.05;
      }
    }
    `;
    }
    render() {
        return html `
    <button class="${this.selected ? 'selected' : ''}">
      <span>
        <slot></slot>
      </span>
    </button>`;
    }
    focus() {
        if (this.shadowRoot) {
            const btn = this.shadowRoot.querySelector('button');
            if (btn) {
                btn.focus();
            }
        }
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoItem.prototype, "value", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoItem.prototype, "selected", void 0);
SosoItem = __decorate([
    element('soso-item')
], SosoItem);
export { SosoItem };
