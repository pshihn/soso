var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, css, property } from 'lit-element';
import { flex } from '../styles/flex';
let SosoAppShell = class SosoAppShell extends LitElement {
    constructor() {
        super(...arguments);
        this.drawerOpen = false;
        this.disableDrawer = false;
        this.resizeListener = this.onResize.bind(this);
    }
    static get styles() {
        return [
            flex,
            css `
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
      #shell.nonav {
        padding-left: 0;
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
        background: var(--soso-drawer-overlay-bg, white);
      }
      #drawerToolbarPanel {
        display: none;
      }
      #shell.nonav #drawer {
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
          --soso-appbar-nav-display: block;
        }
        #shell.nonav #toolbarPanel {
          --soso-appbar-nav-display: none;
        }
      }
      `
        ];
    }
    render() {
        return html `
    <div id="shell" class="${this.disableDrawer ? 'nonav' : (this.drawerOpen ? 'open' : '')}">
      <main>
        <div class="barSpacer"></div>
        <slot name="main"></slot>
      </main>
    
      <div id="glass" @click="${this.closeDrawer}"></div>
    
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
    connectedCallback() {
        super.connectedCallback();
        window.removeEventListener('resize', this.resizeListener);
        window.addEventListener('resize', this.resizeListener, { passive: true });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this.resizeListener);
    }
    updated() {
        if (this.disableDrawer && this.drawerOpen) {
            this.closeDrawer();
        }
    }
    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
    }
    closeDrawer() {
        this.drawerOpen = false;
    }
    onResize() {
        if (this.drawerOpen) {
            this.closeDrawer();
        }
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoAppShell.prototype, "drawerOpen", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoAppShell.prototype, "disableDrawer", void 0);
SosoAppShell = __decorate([
    customElement('soso-app-shell')
], SosoAppShell);
export { SosoAppShell };
