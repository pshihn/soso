import { LitElement, html, TemplateResult, customElement, property, css, CSSResult } from 'lit-element';
import { iconMap } from './icon-map';
import { fire } from './ui-utils/element-helper';
import './icon';

const ICON_KEY = 'soso-checkbox';
iconMap.define({
  'filled': 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'unfilled': 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'
}, ICON_KEY);

@customElement('soso-checkbox')
export class SosoCheckbox extends LitElement {
  @property({ type: Boolean }) checked = false;

  static get styles(): CSSResult {
    return css`
    :host {
      display: inline-block;
    }
    button {
      background: none;
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 50%;
      overflow: hidden;
      padding: 10px;
      color: inherit;
      user-select: none;
      position: relative;
      vertical-align: middle;
    }
    soso-icon {
      width: 24px;
      height: 24px;
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--soso-highlight-color, #018786);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    button:focus::before {
      opacity: 0.12;
    }
    button:active::before {
      opacity: 0.22;
    }
    button soso-icon {
      transition: transform 0.3s ease, color 0.3s ease;
    }
    button:active soso-icon {
      transform: scale(1.05);
    }
    button.checked soso-icon {
      color: var(--soso-highlight-color, #018786);
    }
    span {
      display: inline;
      vertical-align: middle;
      user-select: none;
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.06;
      }
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <label>
      <button role="checkbox" class="${this.checked ? 'checked' : 'unchecked'}" @click="${this.toggle}">
        <soso-icon .iconkey="${ICON_KEY}" .icon="${this.checked ? 'filled' : 'unfilled'}"></soso-icon>
      </button>
      <span>
        <slot></slot>
      </span>
    </label>
    `;
  }

  private toggle() {
    this.checked = !this.checked;
    fire(this, 'change', { checked: this.checked });
  }
}