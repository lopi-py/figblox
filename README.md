Done with the tedious Figma to Roblox conversion? Our plugin automates it for a hassle-free, time-saving, and seamless experience. Focus on creativity, not translations!

## Usage

Get the [figma plugin](https://www.figma.com/community/plugin/1259633080534983873/Figblox), select one frame, enable dev mode and set the codegen feature to this plugin and there you go!

## Supported properties

- Position
- Size

Those are shared properties between all instances

## Supported instances

### Frame

- BackgroundColor3
- BackgroundTransparency
- ClipsDescendants

### ScrollingFrame

- ScrollBarThickness

You need **two frames** inside of the frame predenting to be a scrolling frame:
| Name | Description |
| --- | --- |
| `Scrollbar` | Represents the scrollbar, should be at the right side |
| `Content` | May have auto layout wrap feature and one frame children (template) |

[!WARNING]
Roblox seems buggy when using `UIPadding` and `UIAspectRatioConstraint` inside of `ScrollingFrame`

### TextLabel

- FontFace
- Text
- TextColor3
- TextTransparency
- TextXAlignment
- TextYAlignment

### UIAspectRatioConstraint

- AspectRatio

### UIFlexItem

- FlexMode

### UIListLayout

- FillDirection
- HorizontalAlignment
- HorizontalFlex
- Padding
- VerticalAlignment
- VerticalFlex
- Wraps

### UIPadding

- PaddingBottom
- PaddingLeft
- PaddingRight
- PaddingTop
