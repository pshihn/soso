const selectionController = Symbol('soso-selection-controller');

export interface Checkable extends HTMLElement {
  checked: boolean;
  name: string;
  focusNative(): void;
}

class SelectionSet {
  selected: Checkable | null = null;
  ordered: Checkable[] | null = null;
  readonly set = new Set<Checkable>();
}

export class SelectionController {
  private sets = new Map<string, SelectionSet>();
  private focusedSet: SelectionSet | null = null;
  private mouseIsDown = false;
  private updating = false;

  static getController(element: HTMLElement): SelectionController {
    const root = element.getRootNode() as any;
    if (!root[selectionController]) {
      root[selectionController] = new SelectionController(root);
    }
    return root[selectionController] as SelectionController;
  }

  constructor(element: Node) {
    element.addEventListener('keydown', (e: Event) => this.keyDownHandler(e as KeyboardEvent));
    element.addEventListener('mousedown', () => this.mousedownHandler());
    element.addEventListener('mouseup', () => this.mouseupHandler());
  }

  protected keyDownHandler(e: KeyboardEvent) {
    const element = e.target as Checkable;
    if (!this.has(element)) {
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      this.next(element);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      this.previous(element);
    }
  }

  protected mousedownHandler() {
    this.mouseIsDown = true;
  }

  protected mouseupHandler() {
    this.mouseIsDown = false;
  }

  has(element: Checkable) {
    const set = this.getSet(element.name);
    return set.set.has(element);
  }

  previous(element: Checkable) {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    this.select(order[i - 1] || order[order.length - 1]);
  }

  next(element: Checkable) {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    this.select(order[i + 1] || order[0]);
  }

  select(element: Checkable) {
    element.click();
  }

  focus(element: Checkable) {
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

  getOrdered(element: Checkable) {
    const set = this.getSet(element.name);
    if (!set.ordered) {
      set.ordered = Array.from(set.set);
      set.ordered.sort((a, b) =>
        a.compareDocumentPosition(b) === Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
      );
    }
    return set.ordered;
  }

  getSet(name: string): SelectionSet {
    if (!this.sets.has(name)) {
      this.sets.set(name, new SelectionSet());
    }
    return this.sets.get(name)!;
  }

  register(element: Checkable) {
    const set = this.getSet(element.name);
    set.set.add(element);
    set.ordered = null;
  }

  unregister(element: Checkable) {
    const set = this.getSet(element.name);
    set.set.delete(element);
    set.ordered = null;
    if (set.selected === element) {
      set.selected = null;
    }
  }

  update(element: Checkable) {
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