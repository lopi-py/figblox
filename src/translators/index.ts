import { Instance } from "../roblox";
import { TranslateFusion } from "./fusion";
import { TranslateJsx } from "./jsx";
import { TranslateReact } from "./react";

export type Framework = "react" | "fusion" | "jsx"

export function translate(framework: Framework, instance: Instance): CodegenResult {
    switch (framework) {
        case "react":
            return TranslateReact(instance)
        case "fusion":
            return TranslateFusion(instance)
        case "jsx":
            return TranslateJsx(instance)
    }
}
