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
let SosoButton = class SosoButton extends LitElement {
    constructor() {
        super(...arguments);
        this.outlined = false;
        this.solid = false;
        this.disabled = false;
    }
    static get styles() {
        return css `
    :host {
      display: inline-block;
      font-size: 14px;
      text-transform: uppercase;
    }
    button {
      cursor: pointer;
      outline: none;
      border-radius: 4px;
      overflow: hidden;
      color: inherit;
      user-select: none;
      position: relative;
      font-family: inherit;
      text-align: center;
      font-size: inherit;
      letter-spacing: 1.25px;
      padding: 1px 8px;
      min-height: 36px;
      text-transform: inherit;
      width: 100%;
      box-sizing: border-box;
    }
    button.flat {
      background: none;
      border: none;
    }
    button.outlined {
      background: none;
      border: 2px solid;
      padding: 1px 10px;
    }
    button.solid {
      background: currentColor;
      border: none;
      padding: 1px 10px;
      transition: box-shadow 0.3s ease;
      min-height: 40px;
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
      pointer-events: none;
    }
    button:focus::before {
      opacity: 0.1;
    }
    button.solid::before {
      display: none;
    }
    button.solid:focus {
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
    }
    
    button.solid span {
      color: var(--soso-button-text-color, white);
    }
    button span {
      display: inline-block;
      transition: transform 0.2s ease;
    }
    button:active span {
      transform: scale(1.02);
    }

    button:disabled {
      opacity: 0.8;
      color: var(--soso-disabled-color, #808080);
      cursor: initial;
      pointer-events: none;
    }
    button:disabled::before {
      opacity: 0.2;
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.05;
      }
      button.solid:hover {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
      }
      button:focus::before {
        opacity: 0.1;
      }
      button.solid:focus {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
      }
    }
    `;
    }
    render() {
        const buttonClass = this.solid ? 'solid' : (this.outlined ? 'outlined' : 'flat');
        return html `
    <button class="${buttonClass}" ?disabled="${this.disabled}">
      <span>
        <slot></slot>
      </span>
    </button>`;
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoButton.prototype, "outlined", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoButton.prototype, "solid", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoButton.prototype, "disabled", void 0);
SosoButton = __decorate([
    customElement('soso-button')
], SosoButton);
export { SosoButton };
