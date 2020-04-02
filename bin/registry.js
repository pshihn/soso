import { bus } from './utils/bus';
const pendingWebComponents = new Map();
bus.subscribe('webcomponents-ready', () => {
    for (const [tagName, clazz] of pendingWebComponents) {
        registerComponent(tagName, clazz);
    }
    pendingWebComponents.clear();
});
function registerComponent(tagName, clazz) {
    try {
        if (!customElements.get(tagName)) {
            customElements.define(tagName, clazz);
        }
    }
    catch (err) {
        console.log('Failed to register element: ' + tagName, err);
    }
}
export function element(tagName) {
    return (c) => {
        if (window.customElements) {
            registerComponent(tagName, c);
        }
        else {
            pendingWebComponents.set(tagName, c);
        }
    };
}
