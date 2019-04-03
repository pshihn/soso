import { MQDispatcher } from './core';

export interface Route {
  path: string;
  segments: string[];
  context?: any;
}

export interface ReturnPath {
  successPath: string;
  cancelPath: string;
}

export class Router {
  route?: Route;
  private bus?: MQDispatcher;
  private changeListener = () => this.onChanged();
  private clickEvent: string = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';
  private clickListener = (e: any) => this.onLinkClick(e);

  constructor(bus?: MQDispatcher) {
    this.bus = bus;
  }

  goto(url: string, context?: any) {
    url = url || '/';
    const state = context ? { context } : {};
    window.history.pushState(state, '', url);
    return this.onChanged();
  }

  goHome() {
    window.location.href = '/';
  }

  goAppHome(context?: any) {
    this.goto('/', context);
  }

  updateContext(context: any) {
    if (this.route) {
      this.route.context = context;
      const state = context ? { context } : {};
      window.history.replaceState(state, '', window.location.href);
    }
  }

  replace(url: string, context?: any) {
    url = url || '/';
    const state = context ? { context } : {};
    if (this.route) {
      this.route.path = url;
      this.route.context = context;
    }
    window.history.replaceState(state, '', url);
  }

  connect() {
    this.detachHandlers();
    window.addEventListener('popstate', this.changeListener);
    document.addEventListener(this.clickEvent, this.clickListener);
    this.onChanged();
  }

  private _which(e: any): any {
    e = e || window.event;
    return (null === e.which) ? e.button : e.which;
  }

  private _isSameOrigin(href: string): boolean {
    let origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    if (href) {
      return href.indexOf(origin) === 0;
    }
    return false;
  }

  private onLinkClick(e: MouseEvent) {
    if (1 !== this._which(e)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;

    let el: any = (e as any).path ? (e as any).path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;
    const link: string = el.getAttribute('href');
    if (el.pathname === location.pathname && (el.hash || '#' === link)) return;
    if (link && link.indexOf('mailto:') > -1) return;
    if (el.target) return;
    if (!this._isSameOrigin(el.href)) return;

    const path: string = el.pathname + el.search + (el.hash || '');
    e.preventDefault();
    this.goto(path);
  }

  private detachHandlers() {
    window.removeEventListener('popstate', this.changeListener);
    document.removeEventListener(this.clickEvent, this.clickListener);
  }

  private onChanged() {
    let path = window.location.pathname || '';
    const state = window.history.state || {};
    const context = state.context || {};
    if (path.indexOf('/') === 0) {
      path = path.substring(1);
    }
    this.route = {
      path, context,
      segments: (path || '').split('/')
    };
    if (this.bus) {
      this.bus.dispatch('route', this.route);
    }
  }
}