import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators';
import { fire } from '../utils/ui-utils';
import { element } from '../registry';

@element('soso-switch')
export class SosoSwitch extends LitElement {
  @property({ type: Boolean }) checked = false;

  static get styles(): CSSResultGroup {
    return css`
    :host {
      display: inline-block;
    }
    button {
      background: none;
      cursor: pointer;
      outline: none;
      border: none;
      padding: 10px;
      color: inherit;
      user-select: none;
      position: relative;
    }
    #track {
      box-sizing: border-box;
      width: 32px;
      height: 14px;
      opacity: 0.38;
      border-width: 1px;
      border-style: solid;
      border-color: initial;
      border-image: initial;
      border-radius: 7px;
      transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, border-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      background-color: var(--soso-switch-track-color, rgb(0, 0, 0));
      border-color: var(--soso-switch-track-color, rgb(0, 0, 0));
      pointer-events: none;
    }
    #thumb {
      position: relative;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      pointer-events: none;
      border-width: 10px;
      border-style: solid;
      border-color: initial;
      border-image: initial;
      border-radius: 50%;
      background-color: var(--soso-switch-thumb-off-color, rgb(255, 255, 255));
      border-color: var(--soso-switch-thumb-off-color, rgb(255, 255, 255));
      transition: background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, border-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }
    #thumbPanel {
      position: absolute;
      top: 7px;
      left: 0;
      transition: transform 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      transform: translateX(0px);
      will-change: transform;
    }
    #thumbPanel::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 40px;
      height: 40px;
      background-color: var(--soso-switch-track-color, rgb(0, 0, 0));
      opacity: 0;
      border-radius: 50%;
      transition: opacity 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 90ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      pointer-events: none;
    }

    button:focus #thumbPanel::before {
      opacity: 0.08;
    }
    button:active #thumbPanel::before {
      opacity: 0.22;
    }

    button.checked  #track {
      background-color: var(--soso-highlight-color, #018786);
      border-color: var(--soso-highlight-color, #018786);
      opacity: 0.54;
    }
    button.checked #thumb {
      background-color: var(--soso-highlight-color, #018786);
      border-color: var(--soso-highlight-color, #018786);
    }
    button.checked #thumbPanel {
      transform: translateX(32px);
    }
    button.checked #thumbPanel::before {
      background-color: var(--soso-highlight-color, #018786);
    }

    @media (hover: hover) {
      button:hover #thumbPanel::before {
        opacity: 0.06;
      }
      button:focus #thumbPanel::before {
        opacity: 0.08;
      }
      button:active #thumbPanel::before {
        opacity: 0.22;
      }
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <button role="switch" class="${this.checked ? 'checked' : 'unchecked'}" @click="${this.toggle}">
      <div id="track"></div>
      <div id="thumbPanel">
        <div id="thumb"></div>
      </div>
    </button>
    `;
  }

  private toggle() {
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