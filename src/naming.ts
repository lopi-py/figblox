import { Instance } from "./roblox";

// TODO: allow other cases instead of lower case
export enum Casing {
    LowerCase,
}

function formatName(name: string, casing: Casing = Casing.LowerCase) {
    switch (casing) {
        case Casing.LowerCase:
            return name.toLowerCase().replace(" ", "_")
    }
}

interface FixNamesOptions {
    includeSelf?: boolean;
    descendants?: boolean;
    casing?: Casing;
}

export function fixNames(instance: Instance, options?: FixNamesOptions) {
    let namesCount: Record<string, number> = {}

    instance.name = formatName(instance.name, options?.casing)

    if (options?.includeSelf)
        namesCount[instance.name] = 1

    function processChild(child: Instance) {
        const name = formatName(child.name, options?.casing)

        if (namesCount[name])
            namesCount[name]++
        else
            namesCount[name] = 1

        const suffix = namesCount[name] > 1 ? `_${namesCount[name]}` : ""
        child.name = name + suffix
    }

    function processChildren(_instance: Instance) {
        _instance.children.forEach(processChild)

        if (!options?.descendants)
            namesCount = {}

        _instance.children.forEach(processChildren)
    }

    processChildren(instance)
}
