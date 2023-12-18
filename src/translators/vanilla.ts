import { formatName } from "../naming";
import { Instance } from "../roblox";
import { LuauSerializer } from "../seralizers/luau";
import { Snippet } from "../snippet";

function translate(instance: Instance, indent: number = 0, parent?: Instance): string {
    const serializer = new LuauSerializer();
    const snippet = new Snippet(indent);

    const name = formatName(instance.name)
    const properties = Object.entries(instance.properties)

    snippet.writeLine(`local ${name} = Instance.new("${instance.className}")`)

    properties.forEach(([property, value], index) => {
        snippet.write(`${name}.${property} = ${serializer.ser(value)}`)

        if (index != properties.length - 1)
            snippet.newLine()
    })

    if (parent) {
        snippet.newLine()
        snippet.write(`${name}.Parent = ${formatName(parent.name)}`)
    }

    if (instance.children.length > 0) {
        snippet.newLine()
        snippet.newLine()

        instance.children.forEach((child, index) => {
            snippet.write(translate(child, snippet.indent, instance))

            if (index != instance.children.length - 1) {
                snippet.newLine()
                snippet.newLine()
            }
        })
    }

    return snippet.build()
}

export function TranslateVanilla(instance: Instance): CodegenResult {
    return { title: "Luau", code: translate(instance), language: "PYTHON" }
}
