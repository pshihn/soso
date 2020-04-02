import { LitElement, html, TemplateResult, css, CSSResult, property } from 'lit-element';
import { element } from '../registry';

@element('soso-app-shell')
export class SososAppShell extends LitElement {
  @property() drawerOpen = false;

  private resizeListener = this.onResize.bind(this);

  static get styles(): CSSResult {
    return css`
    :host {
      display: block;
    }
    .hidden {
      display: none !important;
    }
    #shell {
      min-height: 100vh;
      box-sizing: border-box;
      padding-left: var(--soso-app-drawer-width, 200px);
      position: relative;
    }
    main {
      display: block;
      box-sizing: border-box;
    }
    .barSpacer {
      height: var(--soso-app-toolbar-height, 52px);
    }
    #toolbarPanel {
      position: fixed;
      top: 0;
      left: var(--soso-app-drawer-width, 200px);
      right: 0;
      box-sizing: border-box;
      --soso-appbar-nav-display: none;
    }
    #glass {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.4);
      opacity: 0;
      transition: opacity 0.28s ease;
      pointer-events: none;
    }
    #drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--soso-app-drawer-width, 200px);
      border-right: var(--soso-app-drawer-border, none);
      will-change: transform;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      background: var(--soso-drawer-overlay-bg, #f0f0f0);
    }

    @media (max-width: 840px) {
      #shell {
        padding: 0;
      }
      #shell.open #glass {
        opacity: 1;
        pointer-events: auto;
      }
      #toolbarPanel {
        --soso-appbar-nav-display: block;
        left: 0;
      }
      #drawer {
        z-index: 1;
        transform: translate3d(-290px, 0, 0);
        background: var(--soso-drawer-overlay-bg, white);
        box-shadow: 3px 0 5px -2px rgba(0,0,0,0.4);
        transition: transform 0.3s ease;
      }
      #shell.open #drawer {
        transform: translate3d(0, 0, 0);
      }
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <div id="shell" class="${this.drawerOpen ? 'open' : ''}">
      <main>
        <div class="barSpacer"></div>
        <slot name="main"></slot>
      </main>
    
      <div id="toolbarPanel" @toggle-nav="${this.toggleDrawer}">
        <slot name="toolbar"></slot>
      </div>
    
      <div id="glass" @click="${this.closeDrawer}"></div>
    
      <div id="drawer">
        <slot name="drawer"></slot>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.removeEventListener('resize', this.resizeListener);
    window.addEventListener('resize', this.resizeListener, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeListener);
  }

  private toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  private closeDrawer() {
    this.drawerOpen = false;
  }

  private onResize() {
    if (this.drawerOpen) {
      this.closeDrawer();
    }
  }
}