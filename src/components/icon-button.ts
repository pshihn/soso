import { LitElement, html, TemplateResult, customElement, property, css, CSSResult, PropertyValues } from 'lit-element';
import './icon';

@customElement('soso-icon-button')
export class SosoIconButton extends LitElement {
  @property({ type: String }) icon?: string;
  @property({ type: String }) iconkey?: string;
  @property({ type: Boolean }) disabled = false;

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
      padding: var(--soso-icon-button-padding, 10px);
      color: inherit;
      user-select: none;
      position: relative;
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      opacity: var(--soso-icon-button-before-opacity, 0);
      pointer-events: none;
    }
    button:focus::before {
      opacity: var(--soso-icon-button-before-opacity, 0.1);
    }
    button soso-icon {
      transition: transform 0.3s ease;
    }
    button:active soso-icon {
      transform: scale(1.15);
    }
    button:disabled {
      opacity: 0.8;
      color: var(--soso-disabled-color, #808080);
      cursor: initial;
      pointer-events: none;
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: var(--soso-icon-button-before-opacity, 0.05);
      }
      button:focus::before {
        opacity: var(--soso-icon-button-before-opacity, 0.1);
      }
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <button ?disabled="${this.disabled}">
      <soso-icon .icon="${this.icon}" .iconkey="${this.iconkey}"></soso-icon>
    </button>`;
  }

  updated(changed: PropertyValues) {
    if (changed.has('disabled')) {
      this.style.pointerEvents = this.disabled ? 'none' : null;
    }
  }
}