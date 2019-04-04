var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, customElement, property, css } from 'lit-element';
import { iconMap } from './icon-map';
let SosoIcon = class SosoIcon extends LitElement {
    static get styles() {
        return css `
      :host {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: currentColor;
        stroke: none;
        width: 24px;
        height: 24px;
        box-sizing: initial;
      }
      svg {
        pointer-events: none;
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
    }
    render() {
        const icon = this.icon || '';
        const path = iconMap.get(icon, this.iconkey);
        return html `
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
      <g>
        <path d="${path}"></path>
      </g>
    </svg>
    `;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoIcon.prototype, "icon", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], SosoIcon.prototype, "iconkey", void 0);
SosoIcon = __decorate([
    customElement('soso-icon')
], SosoIcon);
export { SosoIcon };
