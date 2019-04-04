declare type NVPairs = {
    [name: string]: string;
};
export declare class IconMap {
    private map;
    private maps;
    get(icon: string, key?: string): string;
    define(icons: NVPairs, key?: string): void;
}
export declare const iconMap: IconMap;
export {};
