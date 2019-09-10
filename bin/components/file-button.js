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
let SosoFileButton = class SosoFileButton extends LitElement {
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
      text-transform: inherit;
      width: 100%;
      box-sizing: border-box;
      background: currentColor;
      border: none;
      padding: 1px 10px;
      transition: box-shadow 0.3s ease;
      min-height: 40px;
    }
    button:focus {
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
    }
    button span {
      color: var(--soso-button-text-color, white);
      display: inline-block;
      transition: transform 0.2s ease;
    }
    button:active span {
      transform: scale(1.02);
    }
    #fi {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      opacity: 0;
      cursor: pointer;
    }

    @media (hover: hover) {
      button:hover {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
      }
      button:focus {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
      }
    }
    `;
    }
    render() {
        return html `
    <button>
      <span>
        <slot></slot>
      </span>
      <input id="fi" type="file" accept="${this.accept}" @change="${this.fileChanged}">
    </button>
    `;
    }
    fileChanged() {
        this.file = (this.fileInput.files || [])[0];
        if (this.file) {
            this.dispatchEvent(new CustomEvent('file', { bubbles: true, composed: true, detail: { file: this.file } }));
        }
    }
    clear() {
        this.file = undefined;
        if (this.fileInput) {
            this.fileInput.value = '';
            this.fileInput.files = null;
        }
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoFileButton.prototype, "accept", void 0);
__decorate([
    query('#fi'),
    __metadata("design:type", HTMLInputElement)
], SosoFileButton.prototype, "fileInput", void 0);
SosoFileButton = __decorate([
    customElement('soso-file-button')
], SosoFileButton);
export { SosoFileButton };
