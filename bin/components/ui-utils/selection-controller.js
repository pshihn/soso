const selectionController = Symbol('soso-selection-controller');
class SelectionSet {
    constructor() {
        this.selected = null;
        this.ordered = null;
        this.set = new Set();
    }
}
export class SelectionController {
    constructor(element) {
        this.sets = new Map();
        this.focusedSet = null;
        this.mouseIsDown = false;
        this.updating = false;
        element.addEventListener('keydown', (e) => this.keyDownHandler(e));
        element.addEventListener('mousedown', () => this.mousedownHandler());
        element.addEventListener('mouseup', () => this.mouseupHandler());
    }
    static getController(element) {
        const root = element.getRootNode();
        if (!root[selectionController]) {
            root[selectionController] = new SelectionController(root);
        }
        return root[selectionController];
    }
    keyDownHandler(e) {
        const element = e.target;
        if (!this.has(element)) {
            return;
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            this.next(element);
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            this.previous(element);
        }
    }
    mousedownHandler() {
        this.mouseIsDown = true;
    }
    mouseupHandler() {
        this.mouseIsDown = false;
    }
    has(element) {
        const set = this.getSet(element.name);
        return set.set.has(element);
    }
    previous(element) {
        const order = this.getOrdered(element);
        const i = order.indexOf(element);
        this.select(order[i - 1] || order[order.length - 1]);
    }
    next(element) {
        const order = this.getOrdered(element);
        const i = order.indexOf(element);
        this.select(order[i + 1] || order[0]);
    }
    select(element) {
        element.click();
    }
    focus(element) {
        if (this.mouseIsDown) {
            return;
        }
        const set = this.getSet(element.name);
        const currentFocusedSet = this.focusedSet;
        this.focusedSet = set;
        if (currentFocusedSet !== set && set.selected && set.selected !== element) {
            set.selected.focusNative();
        }
    }
    getOrdered(element) {
        const set = this.getSet(element.name);
        if (!set.ordered) {
            set.ordered = Array.from(set.set);
            set.ordered.sort((a, b) => a.compareDocumentPosition(b) === Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0);
        }
        return set.ordered;
    }
    getSet(name) {
        if (!this.sets.has(name)) {
            this.sets.set(name, new SelectionSet());
        }
        return this.sets.get(name);
    }
    register(element) {
        const set = this.getSet(element.name);
        set.set.add(element);
        set.ordered = null;
    }
    unregister(element) {
        const set = this.getSet(element.name);
        set.set.delete(element);
        set.ordered = null;
        if (set.selected === element) {
            set.selected = null;
        }
    }
    update(element) {
        if (this.updating) {
            return;
        }
        this.updating = true;
        if (element.checked) {
            const set = this.getSet(element.name);
            for (const e of set.set) {
                e.checked = (e === element);
            }
            set.selected = element;
        }
        this.updating = false;
    }
}
