import { LitElement, html, TemplateResult, customElement, property, css, query, CSSResultArray } from 'lit-element';
import { SosoItem } from './item';
import { flex } from '../styles/flex';

@customElement('soso-list')
export class SosoList extends LitElement {
  @property() selected?: string;
  @property({ type: Boolean }) horizontal = false;

  @query('slot')
  private slotElement?: HTMLSlotElement;

  static get styles(): CSSResultArray {
    return [
      flex,
      css`
      :host {
        display: inline-block;
        box-sizing: border-box;
      }
      `
    ];
  }

  render(): TemplateResult {
    return html`
    <div class="${this.horizontal ? 'horizontal' : 'vertical'} layout" @click="${this.onClick}">
      <slot></slot>
    </div>
    `;
  }

  updated() {
    const assigned = (this.slotElement!.assignedNodes() || []).filter((d) => d.nodeType === Node.ELEMENT_NODE);
    assigned.forEach((d) => {
      const item = d as SosoItem;
      item.selected = !!(this.selected && item.value === this.selected);
    });
  }

  private onClick(event: Event) {
    event.stopPropagation();
    const value = event.target && (event.target as SosoItem).value;
    if (value) {
      this.selected = value;
    }
  }
}