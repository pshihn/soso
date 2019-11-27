var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, css, query, property } from 'lit-element';
import { flex } from '../styles/flex';
import { fire } from '../utils/ui-utils';
import './button';
let SosoTab = class SosoTab extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = false;
        this.value = '';
    }
    static get styles() {
        return [
            css `
      :host {
        position: relative;
        display: block;
        max-width: 360px;
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      soso-button {
        width: 100%;
        min-width: 90px;
        box-sizing: border-box;
        --soso-button-radius: 0px;
        --soso-button-padding: 13px 16px;
        color: var(--soso-tab-color, #808080);
        white-space: nowrap;
      }
      soso-button.selected {
        color: var(--soso-tab-highlight-color, var(--soso-highlight-color, #6200ee));
      }
      `
        ];
    }
    render() {
        return html `
    <soso-button class="${this.selected ? 'selected' : ''}" @click="${this.buttonClick}"><slot></slot></soso-button>
    `;
    }
    buttonClick(e) {
        e.stopPropagation();
        e.preventDefault();
        fire(this, 'select', { value: this.value });
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoTab.prototype, "selected", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], SosoTab.prototype, "value", void 0);
SosoTab = __decorate([
    customElement('soso-tab')
], SosoTab);
export { SosoTab };
let SosoTabBar = class SosoTabBar extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = '';
    }
    static get styles() {
        return [
            flex,
            css `
      :host {
        display: block;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        overflow-y: hidden;
      }
      #container {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 1px;
      }
      #tabPanel {
        position: relative;
      }
      #tabPanel::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 2px;
        background: var(--soso-tab-highlight-color, var(--soso-highlight-color, #6200ee));
        pointer-events: none;
        width: var(--soso-tab-selection-width, 0px);
        transform: var(--soso-tab-selection-transform, none);
        transition: transform 0.3s ease;
      }
      `
        ];
    }
    render() {
        return html `
    <div id="container" class="horizontal layout">
      <div id="tabPanel" class="horizontal layout flex" @select="${this.onTabSelect}">
        <slot></slot>
      </div>
    </div>
    `;
    }
    onTabSelect(e) {
        e.stopPropagation();
        const newSelection = e.detail.value;
        if (newSelection !== this.selected) {
            this.selected = newSelection;
            fire(this, 'change', { value: this.selected });
        }
    }
    updated() {
        if (this.slotElement) {
            const assigned = (this.slotElement.assignedNodes() || []).filter((d) => d.nodeType === Node.ELEMENT_NODE);
            for (const n of assigned) {
                const tab = n;
                if (tab.value === this.selected) {
                    this.selectTab(tab);
                    break;
                }
            }
        }
    }
    selectTab(tab) {
        if (this.activeTab !== tab) {
            if (this.activeTab) {
                this.activeTab.selected = false;
            }
            this.activeTab = tab;
            tab.selected = true;
            requestAnimationFrame(() => requestAnimationFrame(() => this.refreshSelectionBar()));
        }
    }
    refreshSelectionBar() {
        if (this.activeTab && this.tabPanel) {
            const parentRect = this.tabPanel.getBoundingClientRect();
            const rect = this.activeTab.getBoundingClientRect();
            this.style.setProperty('--soso-tab-selection-width', `${rect.width}px`);
            this.style.setProperty('--soso-tab-selection-transform', `translateX(${rect.left - parentRect.left}px)`);
        }
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], SosoTabBar.prototype, "selected", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLElement)
], SosoTabBar.prototype, "slotElement", void 0);
__decorate([
    query('#tabPanel'),
    __metadata("design:type", HTMLDivElement)
], SosoTabBar.prototype, "tabPanel", void 0);
SosoTabBar = __decorate([
    customElement('soso-tab-bar')
], SosoTabBar);
export { SosoTabBar };
