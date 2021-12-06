import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { element } from '../registry';
import './icon';

@element('soso-fab')
export class SosoFab extends LitElement {
  @property({ type: String }) icon?: string;
  @property({ type: String }) iconkey?: string;
  @property({ type: String }) image?: string;
  @property() customSvg?: string;
  @property() label?: string;

  static get styles(): CSSResultGroup {
    return css`
    :host {
      display: inline-block; 
      color: white;
    }
    button {
      background-color: var(--soso-fab-background, #018786);
      background-size: cover;
      background-origin: border-box;
      background-position: 50% 50%;
      box-sizing: border-box;
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 50%;
      overflow: hidden;
      padding: var(--soso-fab-padding, 16px);
      color: inherit;
      user-select: none;
      position: relative;
      box-shadow: var(--soso-fab-shadow, 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12));
      transition: box-shadow 0.28s ease;
    }
    button:focus {
      box-shadow: var(--soso-fab-focus-shadow, 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12));
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
      transition: opacity 0.28s ease;
    }
    button:focus::before {
      opacity: 0.18;
    }
    button:active::before {
      opacity: 0;
    }
    button soso-icon {
      transition: transform 0.3s ease;
    }
    button:active soso-icon {
      transform: scale(1.15);
    }

    @media (hover: hover) {
      button:hover::before {
        opacity: 0.08;
      }
      button:focus::before {
        opacity: 0.18;
      }
      button:active::before {
        opacity: 0;
      }
      button:hover,button:focus {
        box-shadow: var(--soso-fab-focus-shadow, 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12));
      }
    }
    `;
  }

  render(): TemplateResult {
    const style = (this.image || '').trim() ? `background-image:url("${this.image!.trim()}")` : '';
    return html`
    <button aria-label="${this.label || this.icon || ''}" style="${style}">
      <soso-icon .icon="${this.icon}" .iconkey="${this.iconkey}" .customSvg="${this.customSvg}"></soso-icon>
    </button>`;
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