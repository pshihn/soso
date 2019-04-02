type NVPairs = { [name: string]: string };

export class IconMap {
  private map: Map<string, string> = new Map();
  private maps: Map<string, Map<string, string>> = new Map();

  get(icon: string, key?: string): string {
    const map = key ? this.maps.get(key) : this.map;
    if (map && map.has(icon)) {
      return map.get(icon)!;
    }
    return '';
  }

  define(icons: NVPairs, key?: string) {
    let map = this.map;
    if (key) {
      if (!this.maps.has(key)) {
        this.maps.set(key, new Map());
      }
      map = this.maps.get(key)!;
    }
    for (const icon in icons) {
      map.set(icon, icons[icon]);
    }
  }
}

export const iconMap = new IconMap();