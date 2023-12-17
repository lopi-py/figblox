// import { round } from "./util";

// export interface Props {
//     [key: string]: string | number | boolean | Font | Vector2 | UDim | UDim2 | Enum | Color3 | undefined,
// }

// export type Children = Record<string, ReactElement | undefined>;

// export interface ReactElement {
//     readonly className: string;
//     readonly props?: Props;
//     readonly children?: Children;
// };

// export class UDim {
//     readonly scale: string;

//     constructor(scale: number) {
//         this.scale = round(scale);
//     }
// }

// export class UDim2 {
//     readonly x: string;
//     readonly y: string;

//     constructor(x: number, y: number) {
//         this.x = round(x);
//         this.y = round(y);
//     }
// }

// export class Vector2 {
//     readonly x: string;
//     readonly y: string;

//     constructor(x: number, y: number) {
//         this.x = round(x);
//         this.y = round(y);
//     }
// }

// export class Enum {
//     readonly items: string[];

//     constructor(...items: string[]) {
//         this.items = items;
//     }
// }

// export class Font {
//     readonly family: string;
//     readonly weight: Enum;
//     readonly style: Enum;

//     constructor(familiy: string, weight: string, style: string) {
//         this.family = familiy;
//         this.weight = new Enum("FontWeight", weight);
//         this.style = new Enum("FontStyle", style);
//     }
// }

// export class Color3 {
//     readonly r: string;
//     readonly g: string;
//     readonly b: string;

//     constructor(r: number, g: number, b: number) {
//         this.r = round(r);
//         this.g = round(g);
//         this.b = round(b);
//     }
// }

// export function createElement(className: string, props?: Props, children?: Record<string, ReactElement | undefined>): ReactElement {
//     return { className, props, children };
// }
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
    constructor(public offset: number, public scale: number) { }
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
