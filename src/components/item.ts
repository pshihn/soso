import { LitElement, html, TemplateResult, customElement, property, css, CSSResult } from 'lit-element';

@customElement('soso-item')
export class SosoItem extends LitElement {
  @property() value = '';
  @property() name = '';
  @property({ type: Boolean }) selected = false;

  static get styles(): CSSResult {
    return css`
    :host {
      display: inline-block;
      font-size: 14px;
      text-align: left;
    }
    button {
      cursor: pointer;
      outline: none;
      overflow: hidden;
      color: inherit;
      user-select: none;
      position: relative;
      font-family: inherit;
      text-align: inherit;
      font-size: inherit;
      letter-spacing: 1.25px;
      padding: 1px 10px;
      min-height: 36px;
      text-transform: inherit;
      background: none;
      border: none;
      transition: background-color 0.3s ease, color 0.3s ease;
      width: 100%;
      box-sizing: border-box;
    }
    button.selected {
      background: var(--soso-highlight-color, #018786);
      color: var(--soso-highlight-foreground, white);
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      opacity: 0;
    }
    button:hover::before {
      opacity: 0.05;
    }
    button span {
      display: inline-block;
      transition: transform 0.2s ease;
    }
    button:active span {
      transform: scale(1.02);
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <button class="${this.selected ? 'selected' : ''}">
      <span>
        <slot></slot>
      </span>
    </button>`;
  }
}