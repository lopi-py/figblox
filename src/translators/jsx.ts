import { Instance } from "../roblox";
import { TypeScriptSerializer } from "../seralizers/typescript";
import { Snippet } from "../snippet";

function translate(instance: Instance, indent: number = 0): string {
    const serializer = new TypeScriptSerializer();
    const snippet = new Snippet(indent);

    snippet.writeLine(`<${instance.className.toLowerCase()}`)
    snippet.indent++
    snippet.writeLine(`Key="${instance.name.toLowerCase()}"`)

    Object.entries(instance.properties).forEach(([property, value]) => {
        const serialized = serializer.ser(value)

        if (typeof value == "string")
            snippet.writeLine(`${property}=${serialized}`)
        else
            snippet.writeLine(`${property}={${serialized}}`)
    })

    snippet.indent--

    if (instance.children.length > 0) {
        snippet.writeLine(">")
        snippet.indent++

        instance.children.forEach((child) => snippet.writeLine(translate(child, snippet.indent)))

        snippet.indent--
        snippet.write(`</${instance.className.toLowerCase()}>`)
    } else
        snippet.write("/>")

    return snippet.build()
}

export function TranslateJsx(instance: Instance): CodegenResult {
    return { title: "TypeScript", code: translate(instance), language: "TYPESCRIPT" }
}
