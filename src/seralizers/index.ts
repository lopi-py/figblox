import { Color3, Enum, Font, UDim, UDim2, Value, Vector2 } from "../roblox";

export abstract class Serializer {
    abstract serColor3(value: Color3): string;
    abstract serEnum(value: Enum): string;
    abstract serFont(value: Font): string;
    abstract serUDim(value: UDim): string;
    abstract serUDim2(value: UDim2): string;
    abstract serVector2(value: Vector2): string;

    ser(value: Value) {
        if (value instanceof Color3)
            return this.serColor3(value)
        else if (value instanceof Enum)
            return this.serEnum(value)
        else if (value instanceof Font)
            return this.serFont(value)
        else if (value instanceof UDim)
            return this.serUDim(value)
        else if (value instanceof UDim2)
            return this.serUDim2(value)
        else if (value instanceof Vector2)
            return this.serVector2(value)
        else if (typeof value == "string")
            return `"${value}"`
        else
            return `${value}`
    }
}
