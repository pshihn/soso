export class Router {
    constructor(bus) {
        this.changeListener = () => this.onChanged();
        this.clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';
        this.clickListener = (e) => this.onLinkClick(e);
        this.bus = bus;
    }
    goto(url, context) {
        url = url || '/';
        const state = context ? { context } : {};
        window.history.pushState(state, '', url);
        return this.onChanged();
    }
    goHome() {
        window.location.href = '/';
    }
    goAppHome(context) {
        this.goto('/', context);
    }
    updateContext(context) {
        if (this.route) {
            this.route.context = context;
            const state = context ? { context } : {};
            window.history.replaceState(state, '', window.location.href);
        }
    }
    replace(url, context) {
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
    _which(e) {
        e = e || window.event;
        return (null === e.which) ? e.button : e.which;
    }
    _isSameOrigin(href) {
        let origin = location.protocol + '//' + location.hostname;
        if (location.port)
            origin += ':' + location.port;
        if (href) {
            return href.indexOf(origin) === 0;
        }
        return false;
    }
    onLinkClick(e) {
        if (1 !== this._which(e))
            return;
        if (e.metaKey || e.ctrlKey || e.shiftKey)
            return;
        if (e.defaultPrevented)
            return;
        let el = e.path ? e.path[0] : e.target;
        while (el && 'A' !== el.nodeName)
            el = el.parentNode;
        if (!el || 'A' !== el.nodeName)
            return;
        if (el.hasAttribute('download') || el.getAttribute('rel') === 'external')
            return;
        const link = el.getAttribute('href');
        if (el.pathname === location.pathname && (el.hash || '#' === link))
            return;
        if (link && link.indexOf('mailto:') > -1)
            return;
        if (el.target)
            return;
        if (!this._isSameOrigin(el.href))
            return;
        const path = el.pathname + el.search + (el.hash || '');
        e.preventDefault();
        this.goto(path);
    }
    detachHandlers() {
        window.removeEventListener('popstate', this.changeListener);
        document.removeEventListener(this.clickEvent, this.clickListener);
    }
    onChanged() {
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
