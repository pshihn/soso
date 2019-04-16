import { LitElement, html, TemplateResult, customElement, css, CSSResultArray, query, property } from 'lit-element';
import { flex } from '../styles/flex';

@customElement('soso-text-area')
export class SosoTextArea extends LitElement {
  @property() label = ''

  @query('#container')
  private container?: HTMLDivElement;

  @query('textarea')
  private input?: HTMLTextAreaElement;

  static get styles(): CSSResultArray {
    return [
      flex,
      css`
        :host {
          display: inline-block;
          width: 240px;
          height: 6em;
          color: #000;
          --soso-border-color: rgba(0,0,0,0.24);
          --soso-text-input-highlight: var(--soso-highlight-color, #6200ee);
          --soso-text-input-border: 1px solid;
        }
        #container {
          position: relative;
          display: -ms-flexbox;
          display: flex;
          height: auto;
          width: 100%;
          box-sizing: border-box;
        }
        textarea {
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
          min-width: 100%;
          border: none;
          border-radius: 0;
          background: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          -ms-flex-item-align: start;
          align-self: flex-start;
          color: var(--soso-input-color, rgba(0,0,0,.87));
          display: flex;
          padding: 12px 16px 14px;
          background-color: transparent;
          height: 100%;
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
          transform: translateX(-4px) translateY(-26px) scale(0.75);
          opacity: 1;
        }
        #container.focussed #midOverlay {
          border-top: none;
        }
        #container.notched label {
          transform: translateX(-4px) translateY(-26px) scale(0.75);
        }
        #container.notched #midOverlay {
          border-top: none;
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

  render(): TemplateResult {
    const midOverlayClass = (this.label || '').trim() ? '' : 'empty';
    return html`
    <div id="container">
      <textarea @focus="${this.onFocus}" @blur="${this.onBlur}" @input="${this.onInput}"></textarea>
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

  private onInput() {
    const text = this.input!.value;
    if (text) {
      this.container!.classList.add('notched');
    } else {
      this.container!.classList.remove('notched');
    }
  }

  private onFocus() {
    this.container!.classList.add('focussed');
  }

  private onBlur() {
    this.container!.classList.remove('focussed');
  }
}