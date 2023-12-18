import { Instance } from "../roblox";
import { LuauSerializer } from "../seralizers/luau";
import { Snippet } from "../snippet";

function translate(instance: Instance, indent: number = 0): string {
    const serializer = new LuauSerializer();
    const snippet = new Snippet(indent);

    snippet.writeLine(`New "${instance.className}" {`)
    snippet.indent++

    Object.entries(instance.properties).forEach(([property, value]) => {
        snippet.writeLine(`${property} = ${serializer.ser(value)},`)
    })

    if (instance.children.length > 0) {
        snippet.newLine()
        snippet.writeLine("[Children] = {")
        snippet.indent++

        instance.children.forEach((child) => {
            snippet.writeLine(`${translate(child, snippet.indent)},`)
        })

        snippet.indent--
        snippet.writeLine("},")
    }

    snippet.indent--
    snippet.write("}")

    return snippet.build()
}

export function TranslateFusion(instance: Instance): CodegenResult {
    return { title: "Luau", code: translate(instance), language: "PYTHON" }
}
