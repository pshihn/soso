var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, property, css } from 'lit-element';
import { flex } from '../styles/flex';
let SosoDialogContainer = class SosoDialogContainer extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
    }
    static get styles() {
        return [
            flex,
            css `
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        z-index: var(--soso-dialog-z-index, 10);
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
    render() {
        return html `
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
};
__decorate([
    property(),
    __metadata("design:type", Object)
], SosoDialogContainer.prototype, "open", void 0);
SosoDialogContainer = __decorate([
    customElement('soso-dialog-container')
], SosoDialogContainer);
export { SosoDialogContainer };
export class SosoDialogHelper {
    show(node) {
        if (!node) {
            this.hide();
            return;
        }
        if (this.view && this.view.parentElement) {
            this.view.parentElement.removeChild(this.view);
            this.view = undefined;
        }
        if (!this.dlg) {
            this.dlg = new SosoDialogContainer();
            document.body.appendChild(this.dlg);
        }
        this.dlg.appendChild(node);
        this.view = node;
        setTimeout(() => {
            this.dlg.open = true;
        }, 150);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    hide() {
        if (this.dlg) {
            this.dlg.open = false;
            setTimeout(() => {
                if (this.dlg && (!this.dlg.open)) {
                    document.body.style.overflow = null;
                    document.documentElement.style.overflow = null;
                }
            }, 500);
        }
    }
}
export const dialogs = new SosoDialogHelper();
