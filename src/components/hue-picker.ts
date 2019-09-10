import { LitElement, html, TemplateResult, customElement, css, CSSResult, query } from 'lit-element';
import { fire } from '../utils/ui-utils';

@customElement('soso-hue-picker')
export class SosoHuePicker extends LitElement {
  @query('#range')
  private range?: HTMLInputElement;

  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
        width: 180px;
      }
      #container {
        width: 100%;
        box-sizing: border-box;
        height: 12px;
        border-radius: 12px;
        position: relative;
        pointer-events: none;
        background-image: linear-gradient(to right, #fff, #000);
        box-shadow: var(--soso-bar-shadow, none);
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
        box-shadow: var(--soso-thumb-shadow, 0 0 4px -1px rgba(0,0,0,0.5));
        border: 2px solid #fff;
        margin: 0;
        height: 20px;
        width: 20px;
        transform: translateY(-2px);
      }

      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: var(--x-soso-thumb-color, #ffffff);
        cursor: pointer;
        box-shadow: var(--soso-thumb-shadow, 0 0 4px -1px rgba(0,0,0,0.5));
        border: 2px solid #fff;
        height: 22px;
        width: 22px;
        margin: 0;
        transform: translateY(-5px);
      }
    `;
  }

  render(): TemplateResult {
    return html`
    <div id="container">
      <div id="gradient"></div>
      <input id="range" type="range" min="-5" max="365" value="-5" @input="${this.onInput}">
    </div>
    `;
  }

  focus() {
    if (this.range) {
      this.range.focus();
    }
  }

  private onInput(e: Event) {
    e.stopPropagation();
    const value = +this.range!.value;
    this.updateThumbColor();
    fire(this, 'change', {
      value,
      isWhite: value < 0,
      isBlack: value > 360
    });
  }

  get value(): number {
    if (this.range) {
      return +this.range.value;
    }
    return -5;
  }

  set value(v: number) {
    if (this.range) {
      if (v < 0) {
        this.range.value = '-5';
      } else if (v > 360) {
        this.range.value = '360';
      } else {
        this.range.value = `${v}`;
      }
      this.updateThumbColor();
    }
  }

  private updateThumbColor() {
    if (this.range) {
      const value = +this.range!.value;
      if (value < 0) {
        this.style.setProperty('--x-soso-thumb-color', '#fff');
      } else if (value > 360) {
        this.style.setProperty('--x-soso-thumb-color', '#000');
      } else {
        this.style.setProperty('--x-soso-thumb-color', `hsl(${value}, 97%, 59%)`);
      }
    }
  }
}