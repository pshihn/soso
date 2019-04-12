var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { iconMap } from './icon-map';
import { fire } from './ui-utils/element-helper';
import { SelectionController } from './ui-utils/selection-controller';
import './icon';
const ICON_KEY = 'soso-radio';
iconMap.define({
    'filled': 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
    'unfilled': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
}, ICON_KEY);
let SosoRadio = class SosoRadio extends LitElement {
    constructor() {
        super();
        this.checked = false;
        this.name = '';
        if (!this.controller) {
            this.controller = SelectionController.getController(this);
        }
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
      border-radius: 50%;
      overflow: hidden;
      padding: 10px;
      color: inherit;
      user-select: none;
      position: relative;
      vertical-align: middle;
    }
    soso-icon {
      width: 24px;
      height: 24px;
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--soso-highlight-color, #018786);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    button:focus::before {
      opacity: 0.12;
    }
    button:active::before {
      opacity: 0.22;
    }
    button soso-icon {
      transition: transform 0.3s ease, color 0.3s ease;
    }
    button:active soso-icon {
      transform: scale(1.05);
    }
    button.checked soso-icon {
      color: var(--soso-highlight-color, #018786);
    }
    span {
      display: inline;
      vertical-align: middle;
      user-select: none;
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.06;
      }
    }
    `;
    }
    render() {
        return html `
    <label>
      <button role="radio" class="${this.checked ? 'checked' : 'unchecked'}" @click="${this.toggle}" @focus="${this.focusHandler}">
        <soso-icon .iconkey="${ICON_KEY}" .icon="${this.checked ? 'filled' : 'unfilled'}"></soso-icon>
      </button>
      <span>
        <slot></slot>
      </span>
    </label>
    `;
    }
    toggle() {
        let fireEvent = false;
        if (!this.checked) {
            this.checked = true;
            fireEvent = true;
        }
        if (this.controller) {
            this.controller.update(this);
        }
        if (fireEvent) {
            fire(this, 'change', { checked: this.checked });
        }
    }
    focusHandler() {
        if (this.controller) {
            this.controller.focus(this);
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.controller) {
            this.controller.register(this);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.controller) {
            this.controller.unregister(this);
        }
    }
    firstUpdated() {
        if (this.controller) {
            this.controller.update(this);
        }
    }
    focusNative() {
        if (this.button) {
            this.button.focus();
        }
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoRadio.prototype, "checked", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], SosoRadio.prototype, "name", void 0);
__decorate([
    query('button'),
    __metadata("design:type", HTMLButtonElement)
], SosoRadio.prototype, "button", void 0);
SosoRadio = __decorate([
    customElement('soso-radio'),
    __metadata("design:paramtypes", [])
], SosoRadio);
export { SosoRadio };
