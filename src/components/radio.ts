import { LitElement, html, TemplateResult, customElement, property, css, CSSResult, query } from 'lit-element';
import { iconMap } from './icon-map';
import { fire } from './utils/element-helper';
import './icon';
import { SelectionController, Checkable } from './utils/selection-controller';

const ICON_KEY = 'soso-radio';
iconMap.define({
  'filled': 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
  'unfilled': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
}, ICON_KEY);

@customElement('soso-radio')
export class SosoRadio extends LitElement implements Checkable {
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) name = '';

  @query('button')
  private button?: HTMLButtonElement;

  controller?: SelectionController;

  constructor() {
    super();
    if (!this.controller) {
      this.controller = SelectionController.getController(this);
    }
  }

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
    button:hover::before {
      opacity: 0.06;
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
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <label>
      <button role="radio" class="${this.checked ? 'checked' : 'unchecked'}" @click="${this.toggle}" @focus="${this.focusHandler}">
        <soso-icon .iconkey="${ICON_KEY}" .icon="${this.checked ? 'filled' : 'unfilled'}"></soso-icon>
      </button>
      <span>
        <slot></slot>
      </span>
    </label>
    `;
  }

  private toggle() {
    let fireEvent = false;
    if (!this.checked) {
      this.checked = true;
      fireEvent = true;
    }
    if (this.controller) {
      this.controller.update(this);
    }
    if (fireEvent) {
      fire(this, 'change', { checked: this.checked });
    }
  }

  private focusHandler() {
    if (this.controller) {
      this.controller.focus(this);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.controller) {
      this.controller.register(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.controller) {
      this.controller.unregister(this);
    }
  }

  firstUpdated() {
    if (this.controller) {
      this.controller.update(this);
    }
  }

  focusNative(): void {
    if (this.button) {
      this.button.focus();
    }
  }
}