var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, css, query } from 'lit-element';
import { fire } from './ui-utils/element-helper';
let SosoHuePicker = class SosoHuePicker extends LitElement {
    static get styles() {
        return css `
      :host {
        display: inline-block;
        width: 200px;
      }
      #container {
        width: 100%;
        box-sizing: border-box;
        height: 12px;
        border-radius: 12px;
        position: relative;
        pointer-events: none;
        background-image: linear-gradient(to right, #fff, #000);
      }
      #gradient {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 1.35%;
        right: 1.35%;
        pointer-events: none;
        border-radius: 12px;
        background-image: linear-gradient(to right, hsl(0, 97%, 59%), hsl(60, 97%, 59%), hsl(120, 97%, 59%), hsl(180, 97%, 59%), hsl(240, 97%, 59%), hsl(300, 97%, 59%), hsl(0, 97%, 59%));
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
        background: var(--x-soso-thumb-color, #ffffff);
        cursor: pointer;
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
        border: 1px solid #fff;
        height: 22px;
        width: 22px;
        margin-top: -5px;
      }

      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: var(--x-soso-thumb-color, #ffffff);
        cursor: pointer;
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
        border: 1px solid #fff;
        height: 22px;
        width: 22px;
        margin-top: -5px;
      }
    `;
    }
    render() {
        return html `
    <div id="container">
      <div id="gradient"></div>
      <input id="range" type="range" min="-5" max="365" value="-5" @input="${this.onInput}">
    </div>
    `;
    }
    onInput(e) {
        e.stopPropagation();
        const value = +this.range.value;
        this.updateThumbColor();
        fire(this, 'change', {
            value,
            isWhite: value < 0,
            isBlack: value > 360
        });
    }
    get value() {
        if (this.range) {
            return +this.range.value;
        }
        return -5;
    }
    set value(v) {
        if (this.range) {
            if (v < 0) {
                this.range.value = '-5';
            }
            else if (v > 360) {
                this.range.value = '360';
            }
            else {
                this.range.value = `${v}`;
            }
            this.updateThumbColor();
        }
    }
    updateThumbColor() {
        if (this.range) {
            const value = +this.range.value;
            if (value < 0) {
                this.style.setProperty('--x-soso-thumb-color', '#fff');
            }
            else if (value > 360) {
                this.style.setProperty('--x-soso-thumb-color', '#000');
            }
            else {
                this.style.setProperty('--x-soso-thumb-color', `hsl(${value}, 97%, 59%)`);
            }
        }
    }
};
__decorate([
    query('#range'),
    __metadata("design:type", HTMLInputElement)
], SosoHuePicker.prototype, "range", void 0);
SosoHuePicker = __decorate([
    customElement('soso-hue-picker')
], SosoHuePicker);
export { SosoHuePicker };
