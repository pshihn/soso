import { LitElement, html, TemplateResult, customElement, property, css, CSSResult, query } from 'lit-element';
import { SosoItem } from './item';

@customElement('soso-list')
export class SosoList extends LitElement {
  @property() selected?: string;

  @query('slot')
  private slotElement?: HTMLSlotElement;

  static get styles(): CSSResult {
    return css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }
    ::slotted(*) {
      display: block;
    }
    #container ::slotted(*) {
      display: block;
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <div id="container" @click="${this.onClick}">
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