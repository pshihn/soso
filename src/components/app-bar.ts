import { LitElement, html, TemplateResult, customElement, css, CSSResultArray } from 'lit-element';
import { flex } from '../styles/flex';

@customElement('soso-app-bar')
export class SosoAppBar extends LitElement {
  static get styles(): CSSResultArray {
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
      `
    ];
  }

  render(): TemplateResult {
    return html`
    <header id="toolbar" class="horizontal layout center">
      <section id="nav">
        <slot name="nav"></slot>
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
}