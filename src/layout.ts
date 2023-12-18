import { Enum, Instance, Properties, UDim, createInstance } from "./roblox";

export function createUIPadding(node: FrameNode): Instance {
    const props: Properties = {}

    if (node.paddingLeft > 0)
        props.PaddingLeft = new UDim(0, node.paddingLeft)

    if (node.paddingRight > 0)
        props.PaddingRight = new UDim(0, node.paddingRight)

    if (node.paddingTop > 0)
        props.PaddingTop = new UDim(0, node.paddingTop)

    if (node.paddingBottom > 0)
        props.PaddingBottom = new UDim(0, node.paddingBottom)

    return createInstance("UIPadding", props)
}

export function createUIListLayout(node: FrameNode): Instance {
    const props: Properties = {}

    if (node.itemSpacing > 0)
        props.Padding = new UDim(0, node.itemSpacing)

    if (node.layoutWrap == "WRAP")
        props.Wraps = true

    if (node.layoutMode == "HORIZONTAL") {
        props.FillDirection = new Enum("FillDirection", "Horizontal")

        switch (node.primaryAxisAlignItems) {
            case "CENTER":
                props.HorizontalAlignment = new Enum("HorizontalAlignment", "Center")
                break
            case "MAX":
                props.HorizontalAlignment = new Enum("HorizontalAlignment", "Right")
                break
            case "SPACE_BETWEEN":
                props.HorizontalFlex = new Enum("UIFlexAlignment", "SpaceBetween")
                break
        }

        switch (node.counterAxisAlignItems) {
            case "CENTER":
                props.VerticalAlignment = new Enum("VerticalAlignment", "Center")
                break
            case "MAX":
                props.VerticalAlignment = new Enum("VerticalAlignment", "Bottom")
                break
        }
    } else {
        switch (node.primaryAxisAlignItems) {
            case "CENTER":
                props.VerticalAlignment = new Enum("VerticalAlignment", "Center")
                break
            case "MAX":
                props.VerticalAlignment = new Enum("VerticalAlignment", "Bottom")
                break
            case "SPACE_BETWEEN":
                props.VerticalFlex = new Enum("UIFlexAlignment", "SpaceBetween")
                break
        }

        switch (node.counterAxisAlignItems) {
            case "CENTER":
                props.HorizontalAlignment = new Enum("HorizontalAlignment", "Center")
                break
            case "MAX":
                props.HorizontalAlignment = new Enum("HorizontalAlignment", "Right")
                break
        }
    }

    return createInstance("UIListLayout", props)
}

export function createUIFlexItem(): Instance {
    return createInstance("UIFlexItem", {
        FlexMode: new Enum("UIFlexMode", "Fill")
    })
}
