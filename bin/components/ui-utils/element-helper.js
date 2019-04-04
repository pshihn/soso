export function fire(element, name, detail, bubbles = true, composed = true) {
    if (name) {
        const init = {
            bubbles: (typeof bubbles === 'boolean') ? bubbles : true,
            composed: (typeof composed === 'boolean') ? composed : true
        };
        if (detail) {
            init.detail = detail;
        }
        const CE = (window.SlickCustomEvent || CustomEvent);
        element.dispatchEvent(new CE(name, init));
    }
}
