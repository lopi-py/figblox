import { SCROLLING_CONTENT_NAME, SCROLLING_SCROLLBAR_NAME } from "./constants";
import { Children, Enum, Font, Instance, Properties, UDim, UDim2, Vector2, createInstance } from "./roblox";
import { Framework, translate } from "./translators/index";
import { findChildNamed, findFirstChild, getColor, getFont, getParent } from "./util";

/**
 * Create a UIListLayout or UIGridLayout depending on the needs
 * @param node current node
 * @param parent node's parent
 * @returns UIListLayout or UIGridLayout
 */
function createLayout(node: FrameNode, parent: SceneNode): Instance {
    const template = findFirstChild(node);
    if (!template || template.type != "FRAME") {
        throw `${node.name} does not have a valid template`;
    }

    const props: Properties = {};

    if (node.layoutWrap == "WRAP") {
        props.CellPadding = new UDim2(node.itemSpacing / parent.width, node.counterAxisSpacing! / parent.height);
        props.CellSize = new UDim2(template.width / node.width, template.height / node.height);
    } else if (node.layoutMode == "HORIZONTAL") {
        props.Padding = new UDim(node.itemSpacing / node.width, 0);
        props.FillDirection = new Enum("FillDirection", "Horizontal");
    } else {
        props.Padding = new UDim(node.itemSpacing / node.height, 0);
        props.FillDirection = new Enum("FillDirection", "Vertical");
    }

    props.SortOrder = new Enum("SortOrder", "LayoutOrder");

    return createInstance(node.layoutWrap == "WRAP" ? "UIGridLayout" : "UIListLayout", props);
}

/**
 * Create a TextLabel with the given node
 * @param node current node
 * @returns TextLabel
 */
function createText(node: TextNode): Instance {
    const font = node.fontName as FontName;
    const [weight, style] = getFont(font);

    let xAlign: string | undefined;
    switch (node.textAlignHorizontal) {
        case "LEFT":
            xAlign = "Left";
            break;
        case "RIGHT":
            xAlign = "Right";
            break;
    }

    let yAlign: string | undefined;
    switch (node.textAlignVertical) {
        case "TOP":
            yAlign = "Top";
            break;
        case "BOTTOM":
            yAlign = "Right";
            break;
    }

    return createInstance("TextLabel", {
        BackgroundTransparency: 1,
        FontFace: new Font(font.family, new Enum("FontWeight", weight), new Enum("FontStyle", style)),
        Text: node.characters,
        TextScaled: true,
        TextColor3: getColor(node),
        TextXAlignment: xAlign ? new Enum("TextXAlignment", xAlign) : undefined,
        TextYAlignment: yAlign ? new Enum("TextYAlignment", yAlign) : undefined,
    });
}

/**
 * Create a ScrollingFrame using its children (scrollbar and content)
 * @param node current node
 * @param scrollbar scrolling frame's scrollbar
 * @param content scrolling frame's content
 * @returns ScrollingFrame
 */
function createScrolling(node: FrameNode, scrollbar: FrameNode, content: FrameNode): Instance {
    const template = findFirstChild(content);
    if (!template || template.type != "FRAME") {
        throw `${node.name} does not have a valid template`;
    }

    return createInstance("ScrollingFrame", {
        CanvasSize: new UDim2(0, 0),
        AutomaticCanvasSize: new Enum("AutomaticSize", "Y"),
        ScrollingDirection: new Enum("ScrollingDirection", "Y"),
        ScrollBarThickness: scrollbar.width,
    }, {
        Layout: createLayout(content, node),
    });
}

/**
 * Create a ReactElement that will be converted into code 
 * @param node current node
 * @param parent node's parent
 * @returns the element to be converted into code
 */
function createNode(node: SceneNode, parent: FrameNode): Instance {
    // initialize element properties
    let className = "Frame";
    let props: Properties = {};
    let children: Children = {};

    // screen frame (ui container)
    const ancestor = parent ? getParent(parent) : undefined;

    // merge the given element with the current node's element
    function merge(element: Instance) {
        className = element.className;
        props = { ...props, ...element.properties };
        children = { ...children, ...element.children };
    }

    if (parent && ancestor) {
        // the node has a parent and it is under the screen container
        props.Position = new UDim2(node.x / parent.width, node.y / parent.width);
        props.Size = new UDim2(node.width / parent.width, node.height / parent.height);
    } else {
        // the node is under the screen container so center it
        props.AnchorPoint = new Vector2(0.5, 0.5);
        props.Position = new UDim2(0.5, 0.5);
        props.Size = new UDim2(node.width / parent.width, node.height / parent.height);

        // add an aspect ratio to keep the dimensions
        children.Aspect = createInstance("UIAspectRatioConstraint", {
            AspectRatio: node.width / node.height,
        });
    }

    // TODO: add an option for this?
    props.BackgroundTransparency = 0.5;

    if (node.type == "FRAME") {
        const scrollbar = findChildNamed(node, SCROLLING_SCROLLBAR_NAME);
        const content = findChildNamed(node, SCROLLING_CONTENT_NAME);

        // check if the node could be a scrolling frame
        if (scrollbar && scrollbar.type == "FRAME" && content && content.type == "FRAME") {
            merge(createScrolling(node, scrollbar, content));
        } else if (node.layoutMode != "NONE" && parent) {
            // add a ui layout if needed
            children.Layout = createLayout(node, parent);
        }
    } else if (node.type == "TEXT") {
        // text label
        merge(createText(node));
    }

    return createInstance(className, props, children);
}

function raiseError(e: string): CodegenResult[] {
    return [{ title: "ERROR!", code: `"${e}"`, language: "JSON" }]
}

figma.codegen.on("generate", ({ node, language }) => {
    const parent = getParent(node);
    if (!parent)
        return raiseError(`Cannot find parent for ${node.name}`)

    try {
        return [translate(language as Framework, createNode(node, parent))];
    } catch (e) {
        return raiseError(e as string)
    }
});
