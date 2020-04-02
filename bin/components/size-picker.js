var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, css, query } from 'lit-element';
import { fire } from '../utils/ui-utils';
import { element } from '../registry';
let SosoSizePicker = class SosoSizePicker extends LitElement {
    static get styles() {
        return css `
      :host {
        display: inline-block;
        width: 180px;
      }
      #container {
        width: 100%;
        box-sizing: border-box;
        height: 26px;
        position: relative;
        pointer-events: none;
        box-shadow: var(--soso-bar-shadow, none);
      }
      #gradient {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
      }

      input[type=range] {
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
        pointer-events: auto;
      }
      input[type=range]:focus {
        outline: none;
      }

      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }

      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: var(--soso-thumb-color, #000);
        cursor: pointer;
        box-shadow: var(--soso-thumb-shadow, 0 0 7px 0px rgba(0,0,0,0.5));
        border: 2px solid #fff;
        margin: 0;
        height: 20px;
        width: 20px;
        transform: translateY(6px);
      }

      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: var(--soso-thumb-color, #000);
        cursor: pointer;
        box-shadow: var(--soso-thumb-shadow, 0 0 7px 0px rgba(0,0,0,0.5));
        border: 2px solid #fff;
        height: 22px;
        width: 22px;
        margin: 0;
        transform: translateY(2px);
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
      polygon {
        fill: var(--soso-bar-color, #aaa);
      }
    `;
    }
    render() {
        return html `
    <div id="container">
      <div id="gradient">
        <svg viewBox="0 0 180 26" preserveAspectRatio="xMidYMid meet" focusable="false">
          <polygon points="0,13 180,0 180,26"></polygon>
        </svg>
      </div>
      <input id="range" type="range" min="0" max="1" value="0" step="0.01" @input="${this.onInput}">
    </div>
    `;
    }
    focus() {
        if (this.range) {
            this.range.focus();
        }
    }
    onInput(e) {
        e.stopPropagation();
        const value = +this.range.value;
        fire(this, 'change', { value });
    }
    get value() {
        if (this.range) {
            return +this.range.value;
        }
        return 0;
    }
    set value(v) {
        if (this.range) {
            this.range.value = `${Math.max(0, Math.min(1, v))}`;
        }
        else {
            this.pendingValue = v;
        }
    }
    firstUpdated() {
        if (this.pendingValue !== undefined) {
            this.range.value = `${Math.max(0, Math.min(1, this.pendingValue))}`;
            this.pendingValue = undefined;
        }
    }
};
__decorate([
    query('#range'),
    __metadata("design:type", HTMLInputElement)
], SosoSizePicker.prototype, "range", void 0);
SosoSizePicker = __decorate([
    element('soso-size-picker')
], SosoSizePicker);
export { SosoSizePicker };
