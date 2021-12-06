import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { element } from '../registry';

@element('soso-dialog-view')
export class SosoDialogView extends LitElement {
  @property() label = '';

  static get styles(): CSSResultGroup {
    return css`
    :host {
      display: block;
      max-width: 500px;
      margin: 0 auto;
      box-sizing: border-box;
      background: white;
      border-radius: 3px;
      overflow: hidden;
      box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
    }
    #toolbar {
      padding: 16px;
      text-transform: capitalize;
      text-align: var(--soso-dialog-title-align, left);
      background: var(--soso-dialog-title-bg, var(--slick-discovery-highlight-color, #018786));
      color: var(--soso-dialog-title-color, white);
      border-bottom: var(--soso-dialog-title-border, none);
      letter-spacing: 0.8px;
      font-size: 1.15em;
      display: var(--soso-dialog-title-display, block);
    }
    #content {
      padding: var(--soso-dialog-content-padding, 16px);
    }
    #footer {
      padding: 16px;
      text-align: var(--soso-dialog-footer-align, right);
      background: var(--soso-dialog-footer-bg, none);
      border-top: var(--soso-dialog-footer-border, none);
    }
    #footer ::slotted(*) {
      margin-left: 8px;
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <div id="toolbar">${this.label}</div>
    <div id="content">
      <slot name="main"></slot>
    </div>
    <div id="footer">
      <slot name="footer"></slot>
    </div>
    `;
  }
}