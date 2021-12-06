import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, query } from 'lit/decorators';
import { SosoItem } from './item';
import { flex } from '../styles/flex';
import { fire } from '../utils/ui-utils';
import { element } from '../registry';

@element('soso-list')
export class SosoList extends LitElement {
  @property() selected?: string;
  @property({ type: Boolean }) horizontal = false;

  @query('slot')
  private slotElement?: HTMLElement;

  static get styles(): CSSResultGroup {
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
    const assigned = ((this.slotElement! as HTMLSlotElement).assignedNodes() || []).filter((d) => d.nodeType === Node.ELEMENT_NODE);
    assigned.forEach((d) => {
      const item = d as SosoItem;
      item.selected = !!(this.selected && item.value === this.selected);
    });
  }

  private onClick(event: Event) {
    event.stopPropagation();
    const value = event.target && (event.target as SosoItem).value;
    if (value && (value !== this.selected)) {
      this.selected = value;
      fire(this, 'change', { selected: value });
    }
  }
}