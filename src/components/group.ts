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
        }
        #midOverlay.empty {
          padding-right: 0;
        }
        #midOverlay span {
          white-space: nowrap;
          line-height: 1;
          white-space: nowrap;
          color: #808080;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 15px;
          margin: 0 8px;
          transform: translateY(-50%);
          display: block;
          letter-spacing: 1.25px;
        }
      `
    ];
  }

  render(): TemplateResult {
    const midOverlayClass = (this.label || '').trim() ? '' : 'empty';
    return html`
    <div id="container">
      <slot></slot>
      <div id="overlay" class="horizontal layout">
        <div id="leftOverlay"></div>
        <div id="midOverlay" class="${midOverlayClass}">
          <span>${this.label}</span>
        </div>
        <div id="rightOverlay" class="flex"></div>
      </div>
    </div>
    `;
  }
}