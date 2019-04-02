import { LitElement, html, TemplateResult, customElement, property, css, CSSResult } from 'lit-element';
import './icon';

@customElement('soso-icon-button')
export class SosoIconButton extends LitElement {
  @property({ type: String }) icon?: string;
  @property({ type: String }) iconkey?: string;

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
    }
    button:hover {
      background: var(--soso-button-hover-color, rgba(0,0,0,0.05));
    }
    button:focus {
      background: var(--soso-button-focus-color, rgba(0,0,0,0.1));
    }
    button soso-icon {
      transition: transform 0.3s ease;
    }
    button:active soso-icon {
      transform: scale(1.15);
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <button>
      <soso-icon .icon="${this.icon}" .iconkey="${this.iconkey}"></soso-icon>
    </button>`;
  }
}