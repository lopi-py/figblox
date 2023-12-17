import { SCROLLING_CONTENT_NAME, SCROLLING_SCROLLBAR_NAME } from "./constants";
import { createUIFlexItem, createUIListLayout, createUIPadding } from "./layout";
import { Children, Enum, Font, Instance, Properties, UDim2, createInstance } from "./roblox";
import { Framework, translate } from "./translators/index";
import { findChildNamed, getColor, getFont, getParent, getTransparency } from "./util";

function hasLayout(node: FrameNode): boolean {
    return node.layoutMode != "NONE"
}

function hasPadding(node: FrameNode): boolean {
    return node.paddingLeft + node.paddingRight + node.paddingTop + node.paddingBottom > 0
}

// TODO: scale and offset
function getCommonPropsChildren(node: FrameNode | TextNode): [Properties, Children] {
    const props: Properties = {};
    const children: Children = {};
    const parent = getParent(node)!;

    const paddingX = parent.paddingLeft + parent.paddingRight
    const paddingY = parent.paddingTop + parent.paddingBottom
    const width = node.width / (parent.width - paddingX)
    const height = node.height / (parent.height - paddingY)

    if (hasLayout(parent)) {
        if (node.layoutSizingHorizontal != "FIXED" || node.layoutSizingVertical != "FIXED")
            children.flex = createUIFlexItem()
    } else
        props.Position = new UDim2(node.x / parent.width, node.y / parent.width);

    props.Size = new UDim2(width, height)

    return [props, children]
}

function createTextLabel(node: TextNode): Instance {
    const [props, children] = getCommonPropsChildren(node);
    const [family, weight, style] = getFont(node);

    props.BackgroundTransparency = 1
    props.FontFace = new Font(family, new Enum("FontWeight", weight), new Enum("FontStyle", style))
    props.Text = node.characters
    props.TextScaled = true

    const color = getColor(node)
    if (color)
        props.TextColor3 = color

    switch (node.textAlignHorizontal) {
        case "LEFT":
            props.TextXAlignment = new Enum("TextXAlignment", "Left");
            break;
        case "RIGHT":
            props.TextXAlignment = new Enum("TextXAlignment", "Right");
            break;
    }

    switch (node.textAlignVertical) {
        case "TOP":
            props.TextYAlignment = new Enum("TextYAlignment", "Top");
            break;
        case "BOTTOM":
            props.TextYAlignment = new Enum("TextYAlignment", "Bottom");
            break;
    }

    return createInstance("TextLabel", props, children)
}

function createFrame(node: FrameNode): Instance {
    const [props, children] = getCommonPropsChildren(node)

    const color = getColor(node)
    if (color)
        props.BackgroundColor3 = color

    const transparency = getTransparency(node)
    if (transparency)
        props.BackgroundTransparency = transparency

    if (hasLayout(node))
        children.layout = createUIListLayout(node)

    if (hasPadding(node))
        children.padding = createUIPadding(node)

    return createInstance("Frame", props, children)
}

function createScrollingFrame(node: FrameNode, scrollbar: FrameNode, content: FrameNode): Instance {
    const [props, children] = getCommonPropsChildren(node)

    const color = getColor(node)
    if (color)
        props.BackgroundColor3 = color

    const transparency = getTransparency(node)
    if (transparency)
        props.BackgroundTransparency = transparency

    props.CanvasSize = new UDim2(0, 0)
    props.AutomaticCanvasSize = new Enum("AutomaticSize", "Y")
    props.ScrollingDirection = new Enum("ScrollingDirection", "Y")
    props.ScrollBarThickness = scrollbar.width
    props.VerticalScrollBarInset = new Enum("ScrollBarInset", "Always")

    children.layout = createUIListLayout(content)

    if (hasPadding(content))
        children.padding = createUIPadding(content)

    return createInstance("ScrollingFrame", props, children)
}

function robloxify(node: SceneNode): Instance {
    if (node.type == "FRAME") {
        const scrollbar = findChildNamed(node, SCROLLING_SCROLLBAR_NAME)
        const content = findChildNamed(node, SCROLLING_CONTENT_NAME)

        if (scrollbar && content) {
            return createScrollingFrame(node, scrollbar, content)
        }

        return createFrame(node)
    } else if (node.type == "TEXT") {
        return createTextLabel(node)
    }

    throw `Cannot convert a ${node.type} node type `
}

function codegenError(e: string): CodegenResult[] {
    return [{ title: "ERROR!", code: `"${e}"`, language: "JSON" }]
}

figma.codegen.on("generate", ({ node, language }) => {
    const parent = getParent(node);
    if (!parent)
        return codegenError(`Cannot find parent for ${node.name}`)

    try {
        return [translate(language as Framework, robloxify(node))];
    } catch (e) {
        return codegenError(e as string)
    }
});
