import { LitElement, html, TemplateResult, customElement, css, CSSResultArray, query, property } from 'lit-element';
import { flex } from '../styles/flex';
import { fire } from '../utils/ui-utils';
import './button';

@customElement('soso-tab')
export class SosoTab extends LitElement {
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) value = '';

  static get styles(): CSSResultArray {
    return [
      css`
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

  render(): TemplateResult {
    return html`
    <soso-button class="${this.selected ? 'selected' : ''}" @click="${this.buttonClick}"><slot></slot></soso-button>
    `;
  }

  private buttonClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    fire(this, 'select', { value: this.value });
  }
}

@customElement('soso-tab-bar')
export class SosoTabBar extends LitElement {
  @property({ type: String }) selected = '';
  @query('slot') private slotElement?: HTMLElement;
  @query('#tabPanel') private tabPanel?: HTMLDivElement;

  private activeTab?: SosoTab;

  static get styles(): CSSResultArray {
    return [
      flex,
      css`
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
        justify-content: center;
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

  render(): TemplateResult {
    return html`
    <div id="container" class="horizontal layout">
      <div id="tabPanel" class="horizontal layout flex" @select="${this.onTabSelect}">
        <slot></slot>
      </div>
    </div>
    `;
  }

  private resizeListener = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => this.refreshSelectionBar()));
  }

  firstUpdated() {
    window.addEventListener('resize', this.resizeListener, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeListener);
  }

  private onTabSelect(e: CustomEvent) {
    e.stopPropagation();
    const newSelection = e.detail.value;
    if (newSelection !== this.selected) {
      this.selected = newSelection;
      fire(this, 'change', { value: this.selected });
    }
  }

  updated() {
    if (this.slotElement) {
      const assigned = ((this.slotElement as any as HTMLSlotElement).assignedNodes() || []).filter((d) => d.nodeType === Node.ELEMENT_NODE);
      for (const n of assigned) {
        const tab = n as SosoTab;
        if (tab.value === this.selected) {
          this.selectTab(tab);
          break;
        }
      }
    }
  }

  private selectTab(tab: SosoTab) {
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
}