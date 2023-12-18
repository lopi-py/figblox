import { Instance } from "../roblox";
import { TranslateFusion } from "./fusion";
import { TranslateJsx } from "./jsx";
import { TranslateReact } from "./react";
import { TranslateVanilla } from "./vanilla";

export type Framework = "react" | "fusion" | "jsx" | "vanilla"

export function translate(framework: Framework, instance: Instance): CodegenResult {
    switch (framework) {
        case "react":
            return TranslateReact(instance)
        case "fusion":
            return TranslateFusion(instance)
        case "jsx":
            return TranslateJsx(instance)
        case "vanilla":
            return TranslateVanilla(instance)
    }
}
