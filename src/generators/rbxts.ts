import { Color3, Enum, Font, ReactElement, UDim, UDim2, Vector2 } from "../roblox";
import { objectLength, round } from "../util";
import BaseGenerator from "./generator";

export default class RbxtsGenerator extends BaseGenerator {
    element(e: ReactElement, name?: string): void {
        this.write(`<${e.className.toLowerCase()}`);
        this.indent();

        if (!e.props || objectLength(e.props) == 0) {
            this.write(` `);
        } else {
            this.newline();

            if (name) {
                this.writeLine(`Key="${name}"`);
            }

            Object.entries(e.props).forEach(([prop, value]) => {
                if (value == undefined) {
                    return;
                }

                this.write(`${prop}=`);

                if (value instanceof Vector2) {
                    this.vector2(value);
                } else if (value instanceof UDim) {
                    this.udim(value);
                } else if (value instanceof UDim2) {
                    this.udim2(value);
                } else if (value instanceof Enum) {
                    this.write("{");
                    this.enum(value);
                    this.writeLine("}");
                } else if (value instanceof Font) {
                    this.font(value);
                } else if (value instanceof Color3) {
                    this.color(value);
                } else if (typeof value == "number") {
                    this.writeLine(`{${round(value)}}`);
                } else if (typeof value == "string") {
                    this.writeLine(`"${value}"`);
                } else {
                    this.writeLine(`{${value}}`);
                }
            });
        }

        this.dedent();

        if (!e.children || objectLength(e.children) == 0) {
            this.writeLine(`/>`);
            return;
        }

        this.writeLine(`>`);
        this.indent();

        Object.entries(e.children).forEach(([name, child]) => {
            if (child) {
                this.element(child, name);
            }
        });

        this.dedent();
        this.writeLine(`</${e.className.toLowerCase()}>`);
    }

    vector2(v: Vector2) {
        if (v.x == "0" && v.y == "0") {
            this.writeLine(`{new Vector2()}`);
            return;
        }
        this.writeLine(`{new Vector2(${v.x}, ${v.y})}`);
    }

    udim(u: UDim) {
        if (u.scale == "0") {
            this.writeLine(`{new UDim()}`);
            return;
        }
        this.writeLine(`{new UDim(${u.scale})}`);
    }

    udim2(u: UDim2) {
        if (u.x == "0" && u.y == "0") {
            this.writeLine(`{new UDim2()}`);
            return;
        }
        this.writeLine(`{UDim2.fromScale(${u.x}, ${u.y})}`);
    }

    font(f: Font) {
        this.write(`{Font.fromName("${f.family}", `);
        this.enum(f.weight);
        this.write(`, `);
        this.enum(f.style);
        this.writeLine(`)}`);
    }

    color(c: Color3) {
        this.writeLine(`{new Color3(${c.r}, ${c.g}, ${c.b})}`);
    }

    generate(): CodegenResult {
        return { title: "TypeScript", language: "TYPESCRIPT", code: this.code.trim() };
    }
}
