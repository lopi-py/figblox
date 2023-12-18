import { Instance } from "../roblox";
import { TypeScriptSerializer } from "../seralizers/typescript";
import { Snippet } from "../snippet";
import { getLength } from "../util";

function translate(instance: Instance, indent: number = 0, name?: string): string {
    const serializer = new TypeScriptSerializer();
    const snippet = new Snippet(indent);

    snippet.writeLine(`<${instance.className.toLowerCase()}`)
    snippet.indent++

    if (name)
        snippet.writeLine(`Key="${name}"`)

    Object.entries(instance.properties).forEach(([property, value]) => {
        const serialized = serializer.ser(value)

        if (typeof value == "string")
            snippet.writeLine(`${property}=${serialized}`)
        else
            snippet.writeLine(`${property}={${serialized}}`)
    })

    snippet.indent--

    if (getLength(instance.children) > 0) {
        snippet.writeLine(">")
        snippet.indent++

        Object.entries(instance.children).forEach(([name, child]) => {
            snippet.writeLine(translate(child, snippet.indent, name.toLowerCase()))
        })

        snippet.indent--
        snippet.write(`</${instance.className.toLowerCase()}>`)
    } else
        snippet.write("/>")

    return snippet.build()
}

export function TranslateJsx(instance: Instance): CodegenResult {
    return { title: "TypeScript", code: translate(instance), language: "TYPESCRIPT" }
}
