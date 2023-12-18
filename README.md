Done with the tedious Figma to Roblox conversion? Our **codegen** plugin automates it for a hassle-free, time-saving, and seamless experience. Focus on creativity, not translations!

## Usage

Get the [figma plugin](https://www.figma.com/community/plugin/1259633080534983873/Figblox), select one frame, enable dev mode and set the codegen feature to this plugin and there you go!

> [!NOTE]
> Your designs must be inside of a `1920x1080` frame, so the plugin can get proper scales

## Demo

![image](https://github.com/lopi-py/figblox/assets/70210066/1d2fb315-7c85-441b-b5ae-fbc5dcad40bc)
![image](https://github.com/lopi-py/figblox/assets/70210066/8852fe42-fc24-40ed-ac21-66c2317c456f)
![image](https://github.com/lopi-py/figblox/assets/70210066/03f2a95e-8801-4f8a-8539-39a07e56036e)

## Supported codegen frameworks

- [React](https://github.com/jsdotlua/react-lua)
- [Fusion](https://elttob.uk/Fusion/0.2/)
- [JSX](https://roblox-ts.com/docs/guides/roact-jsx)

## Supported properties

- Position (scale)
- Size (scale)

Those are shared properties between all instances

## Supported instances

### Frame

- BackgroundColor3
- BackgroundTransparency
- ClipsDescendants
- OrderLayout

### ScrollingFrame

- ScrollBarThickness

You need **two frames** inside of the frame predenting to be a scrolling frame:
| Name | Description |
| --- | --- |
| `Scrollbar` | Represents the scrollbar, should be at the right side |
| `Content` | May have auto layout wrap feature and one frame children (template) |

> [!WARNING]
> Roblox seems buggy when using `UIPadding` and `UIAspectRatioConstraint` inside of `ScrollingFrame`

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
- Padding (offset)
- VerticalAlignment
- VerticalFlex
- Wraps

### UIPadding

- PaddingBottom (offset)
- PaddingLeft (offset)
- PaddingRight (offset)
- PaddingTop (offset)
