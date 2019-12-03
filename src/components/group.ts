import { LitElement, html, TemplateResult, customElement, css, CSSResultArray, property, query } from 'lit-element';
import { flex } from '../styles/flex';
import { iconMap } from './icon-map';
import './icon';

const ICON_KEY = 'soso-group';
iconMap.define({
  'right': 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  'down': 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'
}, ICON_KEY);

@customElement('soso-group')
export class SosoGroup extends LitElement {
  @property() label = '';
  @property() collapsed = true;

  @query('#inner') private inner?: HTMLDivElement;
  @query('#innerContent') private innerContent?: HTMLDivElement;

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
          color: var(--soso-text-input-highlight);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 15px;
          margin: 0 8px;
          transform: translateY(-50%);
          display: flex;
          letter-spacing: 1.25px;
          pointer-events: auto;
          cursor: pointer;
        }
        #inner {
          position: relative;
          overflow: hidden;
          opacity: 0;
          height: 0;
          transition: opacity 0.3s ease, height 0.3s ease;
        }
        soso-icon {
          padding: 0 6px;
          margin-left: -8px;
        }
      `
    ];
  }

  render(): TemplateResult {
    const midOverlayClass = (this.label || '').trim() ? '' : 'empty';
    return html`
    <div id="container">
      <div id="inner">
        <div id="innerContent">
          <slot></slot>
        </div>
      </div>
      <div id="overlay" class="horizontal layout">
        <div id="leftOverlay"></div>
        <div id="midOverlay" class="${midOverlayClass}">
          <span class="horizontal layout center" @click="${() => this.collapsed = !this.collapsed}">
            <soso-icon .iconkey="${ICON_KEY}" .icon="${this.collapsed ? 'right' : 'down'}"></soso-icon>${this.label}
          </span>
        </div>
        <div id="rightOverlay" class="flex"></div>
      </div>
    </div>
    `;
  }

  updated() {
    if (this.collapsed) {
      this.inner!.style.height = `${this.innerContent!.getBoundingClientRect().height}px`;
      this.inner!.style.opacity = `0`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (this.collapsed) {
          this.inner!.style.height = `6px`;
        }
      }));
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!this.collapsed) {
          this.inner!.style.height = `${this.innerContent!.getBoundingClientRect().height}px`;
          this.inner!.style.opacity = `1`;
          setTimeout(() => {
            if (!this.collapsed) {
              this.inner!.style.height = 'auto';
            }
          }, 300);
        }
      }));
    }
  }
}