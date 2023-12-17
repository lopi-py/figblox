import { Color3 } from "./roblox";

type FindResult = FrameNode | undefined;

export function getParent(child: SceneNode): FindResult {
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

export function findChildNamed(node: FrameNode, name: string): FindResult {
    return node.findChild((child) => (child.type == "GROUP" || child.type == "FRAME") && child.name == name) as FindResult;
}

export function getLength(obj: object): number {
    return Object.keys(obj).length;
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

export function getFont(node: TextNode): [string, string, string] {
    const font = node.fontName as FontName

    let weight = font.style.match("Thin|ExtraLight|Light|Regular|Medium|SemiBold|Bold|ExtraBold|Black")?.[0];
    if (!weight) {
        weight = "Regular"
    } else if (weight == "Black") {
        weight = "Heavy";
    }

    const style = font.style.includes("Italic") ? "Italic" : "Normal";

    return [font.family, weight, style];
}
