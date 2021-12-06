import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { flex } from '../styles/flex';
import { element } from '../registry';

@element('soso-dialog-container')
export class SosoDialogContainer extends LitElement {
  @property() open = false;

  static get styles(): CSSResultGroup {
    return [
      flex,
      css`
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
        box-sizing: border-box;
        z-index: var(--soso-dialog-z-index, var(--slick-discovery-zindex, var(--slick-toolbar-zindex, 900002)));
      }
      #contentCell {
        padding: var(--soso-dialog-content-padding, 5px);
      }
      #contentPanel {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.3s ease, transform 0.5s ease;
      }
      #glass {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--soso-dialog-glass-color, rgba(0,0,0,0.36));
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      #main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      #container.showing {
        pointer-events: auto;
      }
      #container.showing #glass {
        opacity: 1;
      }
      #container.showing #contentPanel {
        opacity: 1;
        transform: scale(1);
      }
      `
    ];
  }

  render(): TemplateResult {
    return html`
    <div id="container" class="${this.open ? 'showing' : ''}">
      <div id="glass"></div>
      <div id="main" class="vertical layout">
        <div class="flex"></div>
        <div id="contentCell">
          <div id="contentPanel">
            <slot></slot>
          </div>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `;
  }
}

export class SosoDialogHelper {
  private dlg?: SosoDialogContainer;
  private view?: HTMLElement;
  private originalOverflows = ['', ''];

  show(node: HTMLElement) {
    if (!node) {
      this.hide();
      return;
    }
    if (this.view && this.view.parentElement) {
      this.view.parentElement.removeChild(this.view);
      this.view = undefined;
    }
    if (!this.dlg) {
      this.dlg = document.createElement('soso-dialog-container') as SosoDialogContainer;
      document.body.appendChild(this.dlg);
    }
    this.dlg.appendChild(node);
    this.view = node;
    setTimeout(() => {
      this.dlg!.open = true;
    }, 150);
    this.originalOverflows = [document.body.style.overflow || '', document.documentElement!.style.overflow || ''];
    document.body.style.overflow = 'hidden';
    document.documentElement!.style.overflow = 'hidden';
  }

  hide() {
    if (this.dlg) {
      this.dlg.open = false;
      setTimeout(() => {
        if (this.dlg && (!this.dlg.open)) {
          document.body.style.overflow = this.originalOverflows[0] || '';
          document.documentElement!.style.overflow = this.originalOverflows[1] || '';
        }
      }, 500);
    }
  }
}

export const dialogs = new SosoDialogHelper();