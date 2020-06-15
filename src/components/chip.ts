import { LitElement, html, TemplateResult, property, css, CSSResult } from 'lit-element';
import { fire } from '../utils/ui-utils';
import { iconMap } from './icon-map';
import { element } from '../registry';
import './icon';

const ICON_KEY = 'soso-chip';
iconMap.define({
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
}, ICON_KEY);

@element('soso-chip')
export class SosoChip extends LitElement {
  @property({ type: Boolean }) checked = false;

  static get styles(): CSSResult {
    return css`
    :host {
      display: inline-block;
      font-size: 14px;
      text-transform: uppercase;
    }
    button {
      cursor: pointer;
      outline: none;
      overflow: hidden;
      color: inherit;
      user-select: none;
      position: relative;
      font-family: inherit;
      text-align: center;
      font-size: inherit;
      text-transform: inherit;
      width: 100%;
      box-sizing: border-box;
      background: none;
      border: none;
      padding: 1px 10px;
      min-height: 40px;
      border-radius: 3em;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      opacity: 0.05;
      pointer-events: none;
    }
    button:focus::before {
      opacity: 0.12;
    }
    
    button.checked::before {
      background-color: var(--soso-highlight-color, #018786);
      opacity: 0.2;
    }
    button.checked:focus::before {
      opacity: 0.25;
    }

    span {
      vertical-align: middle;
      line-height: 1;
    }

    span.iconSpan {
      display: inline-block;
      overflow: hidden;
      width: 0;
      transition: width 0.3s ease;
    }

    button.checked span.iconSpan {
      width: 29px;
    }

    soso-icon {
      padding: 5px 0 5px 5px;
      color: var(--soso-highlight-color, #018786);
      cursor: pointer;
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.1;
      }
      button:focus::before {
        opacity: 0.12;
      }
      button.checked:hover::before {
        opacity: 0.25;
      }
      button.checked:focus::before {
        opacity: 0.25;
      }
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <button class="${this.checked ? 'checked' : 'unchecked'}" @click="${this.onCheck}">
      <span>
        <slot></slot>
      </span>
      <span class="iconSpan">
        <soso-icon .iconkey="${ICON_KEY}" icon="close" @click="${this.toggle}"></soso-icon>
      </span>
    </button>`;
  }

  private onCheck(e: Event) {
    if (!this.checked) {
      this.toggle(e);
    }
  }

  private toggle(e: Event) {
    e.stopPropagation();
    this.checked = !this.checked;
    fire(this, 'change', { checked: this.checked });
  }

  focus() {
    if (this.shadowRoot) {
      const btn = this.shadowRoot.querySelector('button');
      if (btn) {
        btn.focus();
      }
    }
  }
}