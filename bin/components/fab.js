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
import './icon';
let SosoFab = class SosoFab extends LitElement {
    static get styles() {
        return css `
    :host {
      display: inline-block; 
      color: white;
    }
    button {
      background: var(--soso-fab-background, #018786);
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 50%;
      overflow: hidden;
      padding: var(--soso-fab-padding, 16px);
      color: inherit;
      user-select: none;
      position: relative;
      box-shadow: var(--soso-fab-shadow, 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12));
      transition: box-shadow 0.28s ease;
    }
    button:focus {
      box-shadow: var(--soso-fab-focus-shadow, 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12));
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
      transition: opacity 0.28s ease;
    }
    button:focus::before {
      opacity: 0.18;
    }
    button:active::before {
      opacity: 0;
    }
    button soso-icon {
      transition: transform 0.3s ease;
    }
    button:active soso-icon {
      transform: scale(1.15);
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.08;
      }
      button:hover,button:focus {
        box-shadow: var(--soso-fab-focus-shadow, 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12));
      }
    }
    `;
    }
    render() {
        return html `
    <button>
      <soso-icon .icon="${this.icon}" .iconkey="${this.iconkey}"></soso-icon>
    </button>`;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoFab.prototype, "icon", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoFab.prototype, "iconkey", void 0);
SosoFab = __decorate([
    customElement('soso-fab')
], SosoFab);
export { SosoFab };
