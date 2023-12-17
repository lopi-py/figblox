import { Color3 } from "./roblox";

type FindResult = FrameNode | GroupNode | undefined;

export function round(x: number): string {
    const text = x.toString();

    if (text.includes(".")) {
        const decimals = text.split(".")[1];

        if (decimals.length > 5) {
            return x.toFixed(5);
        }
    }

    return text;
}

export function getParent(child: SceneNode): FrameNode | undefined {
    if (!child.parent) {
        return;
    }

    const page = figma.currentPage;
    const parent = page.findOne((node) => node.id == child.parent!.id);

    if (parent && parent.type === "FRAME") {
        return parent;
    }

    return;
}

export function findFirstChild(node: FrameNode): FindResult {
    return node.findChild((child) => child.type == "GROUP" || child.type == "FRAME") as FindResult;
}

export function findChildNamed(node: FrameNode, name: string): FindResult {
    return node.findChild((child) => (child.type == "GROUP" || child.type == "FRAME") && child.name == name) as FindResult;
}

export function getLength(obj: object): number {
    return Object.keys(obj).length;
}

export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function getColor(node: GeometryMixin): Color3 | undefined {
    const fills = node.fills as Paint[];
    const first = fills[0];

    if (!first || first.type != "SOLID") {
        return;
    }

    const { r, g, b } = first.color;

    if (r == 0 && g == 0 && b == 0) {
        return;
    }

    return new Color3(r, g, b);
}

export function getFont(font: FontName): [string, string] {
    let weight = font.style.match("Thin|ExtraLight|Light|Regular|Medium|SemiBold|Bold|ExtraBold|Black")?.[0];
    if (!weight) {
        weight = "Regular"
    } else if (weight == "Black") {
        weight = "Heavy";
    }

    const style = font.style.includes("Italic") ? "Italic" : "Normal";

    return [weight, style];
}
