export type Value = boolean | number | string | Color3 | Enum | Font | UDim | UDim2 | Vector2 | undefined;

export interface Properties {
    [key: string]: Value;
}

export type Children = Record<string, Instance>;

export interface Instance {
    readonly className: string;
    readonly properties: Properties;
    readonly children: Children;
}

export class Color3 {
    constructor(public r: number, public g: number, public b: number) { }
}

export class Enum {
    constructor(public enumType: string, public enumItem: string) { }
}

export class Font {
    constructor(public family: string, public weight: Enum, public style: Enum) { }
}

export class UDim {
    constructor(public scale: number, public offset: number) { }
}

export class UDim2 {
    x: UDim
    y: UDim

    constructor(x: number, y: number) {
        this.x = new UDim(x, 0)
        this.y = new UDim(y, 0)
    }
}

export class Vector2 {
    constructor(public x: number, public y: number) { }
}

export function createInstance(className: string, properties: Properties, children?: Children): Instance {
    return { className, properties, children: children || {} }
}
