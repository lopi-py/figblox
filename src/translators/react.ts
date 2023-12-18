import { Instance } from "../roblox";
import { LuauSerializer } from "../seralizers/luau";
import { Snippet } from "../snippet";
import { getLength } from "../util";

function translate(instance: Instance, indent: number = 0): string {
    const serializer = new LuauSerializer();
    const snippet = new Snippet(indent);

    snippet.writeLine(`e("${instance.className}", {`)
    snippet.indent++

    Object.entries(instance.properties).forEach(([property, value]) =>
        snippet.writeLine(`${property} = ${serializer.ser(value)},`)
    )

    snippet.indent--
    snippet.write("}")

    if (getLength(instance.children) > 0) {
        snippet.writeLine(", {")
        snippet.indent++

        Object.entries(instance.children).forEach(([name, child]) =>
            snippet.writeLine(`${name.toLowerCase()} = ${translate(child, snippet.indent)},`)
        )

        snippet.indent--
        snippet.write("}")
    }

    snippet.write(")")

    return snippet.build()
}

export function TranslateReact(instance: Instance): CodegenResult {
    return { title: "Luau", code: translate(instance), language: "PYTHON" }
}
