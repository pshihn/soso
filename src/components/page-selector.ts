import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, query } from 'lit/decorators.js';
import { fire } from '../utils/ui-utils';
import { element } from '../registry';

export interface PageElement extends HTMLElement {
  onActivate?: () => void;
  onDeactivate?: () => void;
}

@element('soso-page-selector')
export class SosoPageSelector extends LitElement {
  @property({ type: String }) private _selected?: string;

  @query('slot')
  private slotElement?: HTMLElement;

  private pages: HTMLElement[] = [];
  private pageMap = new Map<string, HTMLElement>();
  private current?: PageElement;

  static get styles(): CSSResultGroup {
    return css`
    :host {
      display: contents;
    }

    .hidden {
      display: none !important;
    }
  
    ::slotted(.hidden) {
      display: none !important;
    }

    :host ::slotted(.hidden) {
      display: none !important;
    }
    `;
  }

  render(): TemplateResult {
    return html`
    <slot id="slot"></slot>
    `;
  }

  get selected(): string {
    return this._selected || '';
  }

  set selected(value: string) {
    if (this._selected !== value) {
      this._selected = value;
    } else {
      this.updated();
    }
  }

  firstUpdated() {
    this.pages = [];
    this.pageMap.clear();
    if (this.slotElement) {
      const assigned = (this.slotElement as HTMLSlotElement).assignedNodes();
      if (assigned && assigned.length) {
        for (let i = 0; i < assigned.length; i++) {
          const n = assigned[i];
          if (n.nodeType === Node.ELEMENT_NODE) {
            const e = n as HTMLElement;
            this.pages.push(e);
            const name = e.getAttribute('name') || '';
            if (name) {
              name.trim().split(' ').forEach((nameSegment) => {
                if (nameSegment) {
                  this.pageMap.set(nameSegment, e);
                }
              });
            }
          }
        }
      }
    }
  }

  private getElement(): PageElement | null {
    let e: HTMLElement | undefined = undefined;
    if (this._selected) {
      e = this.pageMap.get(this._selected);
    }
    if (e) {
      return e as PageElement;
    }
    return null;
  }

  updated() {
    const newPage = this.getElement();
    const samePage = newPage === this.current;
    if (this.current && (!samePage) && this.current.onDeactivate) {
      try {
        this.current.onDeactivate();
      } catch (err) { console.error(err); }
    }
    for (let i = 0; i < this.pages.length; i++) {
      const p = this.pages[i];
      if (p === newPage as any) {
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    }
    this.current = newPage || undefined;
    if (this.current && this.current.onActivate) {
      try {
        this.current.onActivate();
      } catch (err) { console.error(err); }
    }
    if (this.current) {
      fire(this, 'node-select', { node: this.current }, false);
    }
  }
}