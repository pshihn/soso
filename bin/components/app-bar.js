var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit-element';
import { flex } from '../styles/flex';
import { fire } from '../utils/ui-utils';
import { element } from '../registry';
let SosoAppBar = class SosoAppBar extends LitElement {
    static get styles() {
        return [
            flex,
            css `
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
    render() {
        return html `
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
    navClick() {
        fire(this, 'toggle-nav');
    }
};
SosoAppBar = __decorate([
    element('soso-app-bar')
], SosoAppBar);
export { SosoAppBar };
