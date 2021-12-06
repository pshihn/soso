import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { flex } from '../styles/flex';
import { fire } from '../utils/ui-utils';
import { element } from '../registry';

@element('soso-app-bar')
export class SosoAppBar extends LitElement {
  static get styles(): CSSResultGroup {
    return [
      flex,
      css`
      :host {
        display: block;
        color: white;
        background: #018786;
        font-size: 1.25rem;
      }
      #toolbar {
        padding: 4px;
        height: 52px;
        overflow: hidden;
        box-sizing: border-box;
      }
      #nav {
        display: var(--soso-appbar-nav-display, block);
      }
      #center {
        padding: 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        box-sizing: border-box;
        line-height: 1;
      }
      #center ::slotted(*) {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .hidden {
        display: none !important;
      }
      `
    ];
  }

  render(): TemplateResult {
    return html`
    <header id="toolbar" class="horizontal layout center">
      <section id="nav" @click="${this.navClick}">
        <slot name="nav"></slot>
      </section>
      <section id="leading" class="horizontal layout center">
        <slot name="leading"></slot>
      </section>
      <section id="center" class="flex">
        <slot name="title"></slot>
      </section>
      <section id="actions" class="horizontal layout center">
        <slot name="actions"></slot>
      </section>
    </header>
    `;
  }

  private navClick() {
    fire(this, 'toggle-nav');
  }
}