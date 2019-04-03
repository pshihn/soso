import { LitElement, html, TemplateResult, customElement, css, CSSResultArray, property } from 'lit-element';
import { flex } from '../styles/flex';

@customElement('soso-app-shell')
export class SosoAppShell extends LitElement {
  @property() drawerOpen = false;

  static get styles(): CSSResultArray {
    return [
      flex,
      css`
      :host {
        display: block;
      }
      .hidden {
        display: none !important;
      }
      #shell {
        height: 100vh;
        box-sizing: border-box;
        padding-left: var(--soso-app-drawer-width, 280px);
      }
      #toolbarPanel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        --soso-appbar-nav-display: none;
      }
      main {
        display: block;
        box-sizing: border-box;
      }
      .barSpacer {
        height: var(--soso-app-toolbar-height, 52px);
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
        z-index: 1;
      }
      #drawer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: var(--soso-app-drawer-width, 280px);
        border-right: var(--soso-app-drawer-border, none);
        will-change: transform;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      #drawerToolbarPanel {
        display: none;
      }

      @media (max-width: 960px) {
        #shell {
          padding: 0;
        }
        #shell.open #glass {
          opacity: 1;
          pointer-events: auto;
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
        #drawer .barSpacer {
          display: none;
        }
        #drawerToolbarPanel {
          display: block;
        }
        #toolbarPanel {
          --soso-appbar-nav-display: unset;
        }
      }
      `
    ];
  }

  render(): TemplateResult {
    return html`
    <div id="shell" class="${this.drawerOpen ? 'open' : ''}">
      <main>
        <div class="barSpacer"></div>
        <slot name="main"></slot>
      </main>
    
      <div id="glass" @click="${this.closeNavMenu}"></div>
    
      <div id="drawer">
        <div class="barSpacer"></div>
        <div id="drawerToolbarPanel">
          <slot name="drawerHeader"></slot>
        </div>
        <div>
          <slot name="drawer"></slot>
        </div>
      </div>
    
      <div id="toolbarPanel" @toggle-nav="${this.toggleDrawer}">
        <slot name="toolbar"></slot>
      </div>
    </div>
    `;
  }

  private toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  private closeNavMenu() {
    this.drawerOpen = false;
  }
}