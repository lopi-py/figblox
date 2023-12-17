import { UDim, Vector2 } from "../roblox"
import { LuauSerializer } from "./luau"

export class TypeScriptSerializer extends LuauSerializer {
    serUDim(value: UDim): string {
        return `new UDim(${value.scale}, ${value.offset})`
    }

    serVector2(value: Vector2): string {
        return `new Vector2(${value.x}, ${value.y})`
    }
}
