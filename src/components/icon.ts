import { LitElement, html, TemplateResult, customElement, property, css, CSSResult, svg } from 'lit-element';
import { iconMap } from './icon-map';

@customElement('soso-icon')
export class SosoIcon extends LitElement {
  @property({ type: String }) icon?: string;
  @property({ type: String }) iconkey?: string;
  @property() customSvg?: string;

  static get styles(): CSSResult {
    return css`
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

  render(): TemplateResult {
    const icon = this.icon || '';
    const path = iconMap.get(icon, this.iconkey);
    if (this.customSvg) {
      return svg`${this.customSvg}`;
    }
    return html`
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
      <g>
        <path d="${path}"></path>
      </g>
    </svg>
    `;
  }
}