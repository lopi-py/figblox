import { Color3, Enum, Font, UDim, UDim2, Vector2 } from "../roblox"
import { Serializer } from "./index"

export class LuauSerializer extends Serializer {
    serColor3(value: Color3): string {
        return `Color3.fromRGB(${value.r}, ${value.g}, ${value.b})`
    }

    serEnum(value: Enum): string {
        return `Enum.${value.enumType}.${value.enumItem}`
    }

    serFont(value: Font): string {
        return `Font.fromName(${value.family}, ${this.serEnum(value.weight)}, ${this.serEnum(value.style)})`
    }

    serUDim(value: UDim): string {
        return `UDim.new(${value.scale}, ${value.offset})`
    }

    serUDim2(value: UDim2): string {
        return `UDim2.new(${value.x.scale}, ${value.x.offset}, ${value.y.scale}, ${value.y.offset})`
    }

    serVector2(value: Vector2): string {
        return `Vector2.new(${value.x}, ${value.y})`
    }
}
