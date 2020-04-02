import { bus } from './utils/bus';

const pendingWebComponents = new Map<string, any>();

bus.subscribe('webcomponents-ready', () => {
  for (const [tagName, clazz] of pendingWebComponents) {
    registerComponent(tagName, clazz);
  }
  pendingWebComponents.clear();
});

function registerComponent(tagName: string, clazz: any) {
  try {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, clazz);
    }
  } catch (err) {
    console.log('Failed to register element: ' + tagName, err);
  }
}

export function element(tagName: string) {
  return (c: any) => {
    if (window.customElements) {
      registerComponent(tagName, c);
    } else {
      pendingWebComponents.set(tagName, c);
    }
  };
}