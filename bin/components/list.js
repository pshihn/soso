var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { flex } from '../styles/flex';
import { fire } from '../utils/ui-utils';
let SosoList = class SosoList extends LitElement {
    constructor() {
        super(...arguments);
        this.horizontal = false;
    }
    static get styles() {
        return [
            flex,
            css `
      :host {
        display: inline-block;
        box-sizing: border-box;
      }
      `
        ];
    }
    render() {
        return html `
    <div class="${this.horizontal ? 'horizontal' : 'vertical'} layout" @click="${this.onClick}">
      <slot></slot>
    </div>
    `;
    }
    updated() {
        const assigned = (this.slotElement.assignedNodes() || []).filter((d) => d.nodeType === Node.ELEMENT_NODE);
        assigned.forEach((d) => {
            const item = d;
            item.selected = !!(this.selected && item.value === this.selected);
        });
    }
    onClick(event) {
        event.stopPropagation();
        const value = event.target && event.target.value;
        if (value && (value !== this.selected)) {
            this.selected = value;
            fire(this, 'change', { selected: value });
        }
    }
};
__decorate([
    property(),
    __metadata("design:type", String)
], SosoList.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], SosoList.prototype, "horizontal", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLSlotElement)
], SosoList.prototype, "slotElement", void 0);
SosoList = __decorate([
    customElement('soso-list')
], SosoList);
export { SosoList };
