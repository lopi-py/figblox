Done with the tedious Figma to Roblox conversion? Our plugin automates it for a hassle-free, time-saving, and seamless experience. Focus on creativity, not translations!

## Usage
Get the [figma plugin](https://www.figma.com/community/plugin/1259633080534983873/Figblox), select one frame, enable dev mode and set the codegen feature to this plugin and there you go!

## Supported instances
### Frame
* AnchorPoint
* Position
* Size

### ScrollingFrame
* ScrollBarThickness

You need **two frames** inside of the frame predenting to be a scrolling frame:
| Name | Description |
| --- | --- |
| `Scrollbar` | Represents the scrollbar, should be at the right side |
| `Content` | May have auto layout wrap feature and one frame children (template) |

### TextLabel
* FontFace
* Text
* TextColor3
* TextXAlignment
* TextYAlignment

### UIAspectRatioConstraint
* AspectRatio

### UIGridLayout
* CellPadding
* CellSize
* SortOrder

### UIListLayout
* FillDirection
* Padding
* SortOrder
