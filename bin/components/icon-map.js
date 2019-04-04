export class IconMap {
    constructor() {
        this.map = new Map();
        this.maps = new Map();
    }
    get(icon, key) {
        const map = key ? this.maps.get(key) : this.map;
        if (map && map.has(icon)) {
            return map.get(icon);
        }
        return '';
    }
    define(icons, key) {
        let map = this.map;
        if (key) {
            if (!this.maps.has(key)) {
                this.maps.set(key, new Map());
            }
            map = this.maps.get(key);
        }
        for (const icon in icons) {
            map.set(icon, icons[icon]);
        }
    }
}
export const iconMap = new IconMap();
