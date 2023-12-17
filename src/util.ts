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

export function getUniqueFill(node: GeometryMixin): SolidPaint | undefined {
    const fills = node.fills as Paint[]
    const fill = fills[0]

    if (!fill || fill.type != "SOLID")
        return

    return fill
}

export function getColor(node: GeometryMixin): Color3 | undefined {
    const fill = getUniqueFill(node)
    if (!fill)
        return

    const { r, g, b } = fill.color
    return new Color3(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

export function getTransparency(node: GeometryMixin): number | undefined {
    const fill = getUniqueFill(node)
    if (!fill || !fill.opacity)
        return

    return (1 - fill.opacity)
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
