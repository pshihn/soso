var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, css, query, property } from 'lit-element';
import { flex } from '../styles/flex';
let SosoTextInput = class SosoTextInput extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.type = 'text';
        this.minimal = false;
        this.autocomplete = '';
    }
    static get styles() {
        return [
            flex,
            css `
        :host {
          display: inline-block;
          width: 240px;
          color: #000;
          --soso-border-color: rgba(0,0,0,0.24);
          --soso-text-input-highlight: var(--soso-highlight-color, #6200ee);
          --soso-text-input-border: 1px solid;
        }
        #container {
          position: relative;
          display: -ms-flexbox;
          display: flex;
          height: 56px;
          width: 100%;
          box-sizing: border-box;
        }
        input {
          font-family: Roboto, system-ui, sans-serif;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-size: 1rem;
          line-height: 1.75rem;
          font-weight: 400;
          letter-spacing: .009375em;
          text-decoration: inherit;
          text-transform: inherit;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 0;
          background: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          -ms-flex-item-align: end;
          align-self: flex-end;
          color: var(--soso-input-color, rgba(0,0,0,.87));
          display: flex;
          padding: 12px 16px 14px;
          background-color: transparent;
        }
        #overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          pointer-events: none;
        }
        #leftOverlay {
          width: 12px;
          border: var(--soso-text-input-border);
          border-radius: 4px 0 0 4px;
          border-right: none;
          border-color: var(--soso-border-color);
          box-sizing: border-box;
        }
        #rightOverlay {
          border: var(--soso-text-input-border);
          border-radius: 0 4px 4px 0;
          border-left: none;
          border-color: var(--soso-border-color);
          box-sizing: border-box;
        }
        #midOverlay {
          border: var(--soso-text-input-border);
          border-left: none;
          border-right: none;
          position: relative;
          border-color: var(--soso-border-color);
          padding-right: 8px;
        }
        #midOverlay.empty {
          padding-right: 0;
        }
        #midOverlay span {
          opacity: 0;
          font-size: 0.75rem;
          white-space: nowrap;
        }
        label {
          position: absolute;
          left: 0;
          top: 17px;
          opacity: 0.6;
          font-size: 1rem;
          line-height: 1;
          transition: transform .15s cubic-bezier(.4,0,.2,1);
          white-space: nowrap;
        }
        #container.focussed {
          --soso-border-color: var(--soso-text-input-highlight, #000);
          --soso-text-input-border: 2px solid;
          color: var(--soso-border-color);
        }
        #container.focussed label {
          transform: translateX(-0.5em) translateY(-26px) scale(0.75);
          opacity: 1;
        }
        #container.focussed #midOverlay {
          border-top: none;
        }
        #container.notched label {
          transform: translateX(-0.5em) translateY(-26px) scale(0.75);
        }
        #container.notched #midOverlay {
          border-top: none;
        }

        #container.minimal #leftOverlay {
          display: none;
        }
        #container.minimal #rightOverlay {
          display: none;
        }
        #container.minimal #midOverlay {
          border: none;
        }
        #container.minimal #overlay {
          border-radius: 0;
          border: var(--soso-text-input-border);
          border-left: none;
          border-top: none;
          border-right: none;
        }
        #container.minimal input {
          padding: 12px 8px 14px;
        }
        #container.minimal label {
          transform: translateX(8px);
        }
        #container.minimal.notched label {
          transform: translateX(-0.5em) translateY(-26px) scale(0.75);
        }
        #container.minimal.focussed label {
          transform: translateX(-0.5em) translateY(-26px) scale(0.75);
          opacity: 1;
        }

        @media (hover: hover) {
          #container:hover {
            --soso-border-color: rgba(0,0,0,0.65);
          }
          #container.focussed {
            --soso-border-color: var(--soso-text-input-highlight, #000);
            --soso-text-input-border: 2px solid;
            color: var(--soso-border-color);
          }
        }
      `
        ];
    }
    render() {
        const midOverlayClass = (this.label || '').trim() ? '' : 'empty';
        return html `
    <div id="container" class="${this.minimal ? 'minimal' : ''}">
      <input type="${this.type}" autocomplete="${this.autocomplete}" @focus="${this.onFocus}" @blur="${this.onBlur}" @input="${this.onInput}">
      <div id="overlay" class="horizontal layout">
        <div id="leftOverlay"></div>
        <div id="midOverlay" class="${midOverlayClass}">
          <span>${this.label}</span>
          <label>${this.label}</label>
        </div>
        <div id="rightOverlay" class="flex"></div>
      </div>
    </div>
    `;
    }
    firstUpdated() {
        if (this.pendingValue) {
            this.input.value = this.pendingValue;
            this.pendingValue = undefined;
            this.onInput();
        }
    }
    onInput() {
        const text = this.input.value;
        if (text) {
            this.container.classList.add('notched');
        }
        else {
            this.container.classList.remove('notched');
        }
    }
    onFocus() {
        this.container.classList.add('focussed');
    }
    onBlur() {
        this.container.classList.remove('focussed');
    }
    get value() {
        if (this.input) {
            return this.input.value;
        }
        else if (this.pendingValue !== undefined) {
            return this.pendingValue;
        }
        return '';
    }
    set value(v) {
        if (this.input) {
            this.input.value = v;
            this.onInput();
        }
        else {
            this.pendingValue = v;
        }
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoTextInput.prototype, "label", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoTextInput.prototype, "type", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoTextInput.prototype, "minimal", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], SosoTextInput.prototype, "autocomplete", void 0);
__decorate([
    query('#container'),
    __metadata("design:type", HTMLDivElement)
], SosoTextInput.prototype, "container", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], SosoTextInput.prototype, "input", void 0);
SosoTextInput = __decorate([
    customElement('soso-text-input')
], SosoTextInput);
export { SosoTextInput };
