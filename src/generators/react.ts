import { Color3, Enum, Font, ReactElement, UDim, UDim2, Vector2 } from "../roblox";
import { getLength, round } from "../util";
import BaseGenerator from "./generator";

export default class ReactGenerator extends BaseGenerator {
    element(e: ReactElement, name?: string) {
        this.write(`e("${e.className}"`);

        if (!e.props || getLength(e.props) == 0) {
            this.write(` `);
        } else {
            this.writeLine(`, {`);
            this.indent();

            Object.entries(e.props).forEach(([prop, value]) => {
                if (value == undefined) {
                    return;
                }

                this.write(`${prop} = `);

                if (value instanceof Vector2) {
                    this.vector2(value);
                } else if (value instanceof UDim) {
                    this.udim(value);
                } else if (value instanceof UDim2) {
                    this.udim2(value);
                } else if (value instanceof Enum) {
                    this.enum(value);
                } else if (value instanceof Font) {
                    this.font(value);
                } else if (value instanceof Color3) {
                    this.color(value);
                } else if (typeof value == "number") {
                    this.write(`${round(value)}`);
                } else if (typeof value == "string") {
                    this.write(`"${value}"`);
                } else {
                    this.write(`${value}`);
                }

                this.writeLine(`,`);
            });

            this.dedent();
        }

        if (!e.children || getLength(e.children) == 0) {
            this.writeLine(`})${name ? "," : ""}`);
            return;
        }

        this.writeLine(`}, {`);
        this.indent();

        Object.entries(e.children).forEach(([name, child]) => {
            if (child) {
                this.write(`${name.toLowerCase()} = `);
                this.element(child, name);
            }
        });

        this.dedent();
        this.writeLine(`})`);
    }

    vector2(v: Vector2) {
        if (v.x == "0" && v.y == "0") {
            this.write(`Vector2.new()`);
            return;
        }
        this.write(`Vector2.new(${v.x}, ${v.y})`);
    }

    udim(u: UDim) {
        if (u.scale == "0") {
            this.write(`UDim.new()`);
            return;
        }
        this.write(`UDim.new(${u.scale})`);
    }

    udim2(u: UDim2) {
        if (u.x == "0" && u.y == "0") {
            this.write(`UDim2.new()`);
            return;
        }
        this.write(`UDim2.fromScale(${u.x}, ${u.y})`);
    }

    font(f: Font) {
        this.write(`Font.fromName("${f.family}", `);
        this.enum(f.weight);
        this.write(`, `);
        this.enum(f.style);
        this.write(`)`);
    }

    color(c: Color3) {
        this.write(`Color3.new(${c.r}, ${c.g}, ${c.b})`);
    }

    generate(): CodegenResult {
        return { title: "Luau", language: "PYTHON", code: this.code.trim() };
    }
}
