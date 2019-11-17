import { LitElement, html, TemplateResult, customElement, css, CSSResultArray, query, property } from 'lit-element';
import { flex } from '../styles/flex';

@customElement('soso-group')
export class SosoGroup extends LitElement {
  @property() label = '';
  @query('#container') private container?: HTMLDivElement;

  static get styles(): CSSResultArray {
    return [
      flex,
      css`
        :host {
          display: inline-block;
          box-sizing: border-box;
          color: #000;
          --soso-border-color: rgba(0,0,0,0.24);
          --soso-text-input-highlight: var(--soso-highlight-color, #6200ee);
          --soso-text-input-border: 1px solid;
        }
        #container {
          position: relative;
          box-sizing: border-box;
          padding: 12px 16px 14px;
          outline: none;
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
          border-top: none;
          position: relative;
          border-color: var(--soso-border-color);
          padding-right: 8px;
        }
        #midOverlay.empty {
          padding-right: 0;
        }
        #midOverlay span {
          opacity: 0;
          font-size: 0.75em;
          white-space: nowrap;
        }
        label {
          position: absolute;
          left: 0;
          top: 17px;
          font-size: 1em;
          line-height: 1;
          transform: translateX(-4px) translateY(-26px) scale(0.75);
          transition: transform .15s cubic-bezier(.4,0,.2,1);
          white-space: nowrap;
        }
        #container.focussed {
          --soso-border-color: var(--soso-text-input-highlight, #000);
          --soso-text-input-border: 2px solid;
          color: var(--soso-border-color);
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
    <div id="container" tabindex="0" @focus="${this.onFocus}" @blur="${this.onBlur}">
      <slot></slot>
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

  private onFocus() {
    this.container!.classList.add('focussed');
  }

  private onBlur() {
    this.container!.classList.remove('focussed');
  }
}