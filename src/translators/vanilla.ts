import { fixNames } from "../naming";
import { Instance } from "../roblox";
import { LuauSerializer } from "../seralizers/luau";
import { Snippet } from "../snippet";

function translate(instance: Instance, indent: number = 0, parent?: Instance): string {
    const serializer = new LuauSerializer();
    const snippet = new Snippet(indent);

    snippet.writeLine(`local ${instance.name} = Instance.new("${instance.className}")`)

    const properties = Object.entries(instance.properties)
    properties.forEach(([property, value], index) => {
        snippet.write(`${instance.name}.${property} = ${serializer.ser(value)}`)

        if (index != properties.length - 1)
            snippet.newLine()
    })

    if (parent) {
        snippet.newLine()
        snippet.write(`${instance.name}.Parent = ${parent.name}`)
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
    fixNames(instance, { includeSelf: true, descendants: true })

    return { title: "Luau", code: translate(instance), language: "PYTHON" }
}
