import { LitElement, html, TemplateResult, property, css, CSSResult } from 'lit-element';
import { element } from '../registry';

@element('soso-linear-progress')
export class SosoLinearProgress extends LitElement {
  @property({ type: Boolean }) closed = false;

  static get styles(): CSSResult {
    return css`
    :host {
      display: block;
      position: relative;
      background: #e6e6e6;
      height: 4px;
      overflow: hidden;
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
      opacity: 1;
    }
    #bar {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: left top;
      top: 0;
      left: -54.8889%;
      animation: 2s linear 0s infinite normal none running baranimation;
    }
    #inner {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: currentColor;
      animation: 2s linear 0s infinite normal none running inneranimation;
    }
    @keyframes baranimation {
      0% { 
        animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
        transform: translateX(0px);
      }
      25% {
        animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
        transform: translateX(37.6519%);
      }
      48% {
        animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
        transform: translateX(84.3862%);
      }
      100% {
        transform: translateX(160.278%);
      }
    }
    @keyframes inneranimation {
      0% { 
        animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
        transform: scaleX(0.08);
      }
      19% {
        animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432);
        transform: scaleX(0.457104);
      }
      44% {
        animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
        transform: scaleX(0.72796);
      }
      100% {
        transform: scaleX(0.08);
      }
    }

    `;
  }

  render(): TemplateResult {
    return html`
    <div id="bar">
      <div id="inner"></div>
    </div>
    `;
  }

  updated() {
    this.style.opacity = `${this.closed ? 0 : 1}`;
  }
}