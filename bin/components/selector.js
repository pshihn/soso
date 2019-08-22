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
import { fire } from '../utils/ui-utils';
let SosoSelector = class SosoSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.default = 'home';
        this.pages = [];
        this.pageMap = new Map();
    }
    set selectedForced(value) {
        this.selected = value;
        this.requestUpdate();
    }
    static get styles() {
        return css `
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
    render() {
        return html `
    <slot id="slot" @slotchange="${this.mapPages}"></slot>
    `;
    }
    mapPages() {
        this.pages = [];
        this.pageMap.clear();
        if (this.slotElement) {
            const assigned = this.slotElement.assignedNodes();
            if (assigned && assigned.length) {
                for (let i = 0; i < assigned.length; i++) {
                    const n = assigned[i];
                    if (n.nodeType === Node.ELEMENT_NODE) {
                        const e = n;
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
    firstUpdated() {
        this.mapPages();
    }
    updated() {
        const newPage = this.getElement();
        const samePage = newPage === this.current;
        if (this.current && (!samePage) && this.current.onDeactivate) {
            try {
                this.current.onDeactivate();
            }
            catch (err) {
                console.error(err);
            }
        }
        for (let i = 0; i < this.pages.length; i++) {
            const p = this.pages[i];
            if (p === newPage) {
                p.classList.remove('hidden');
            }
            else {
                p.classList.add('hidden');
            }
        }
        this.current = newPage || undefined;
        if (this.current && this.current.onActivate) {
            try {
                this.current.onActivate();
            }
            catch (err) {
                console.error(err);
            }
        }
        if (this.current) {
            fire(this, 'node-select', { node: this.current }, false);
        }
    }
    getElement() {
        let e = undefined;
        if (this.selected) {
            e = this.pageMap.get(this.selected);
        }
        if ((!e) && this.default) {
            e = this.pageMap.get(this.default);
        }
        if (e) {
            return e;
        }
        return null;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoSelector.prototype, "selected", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoSelector.prototype, "default", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLSlotElement)
], SosoSelector.prototype, "slotElement", void 0);
SosoSelector = __decorate([
    customElement('soso-selector')
], SosoSelector);
export { SosoSelector };
