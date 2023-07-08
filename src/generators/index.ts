import BaseGenerator from "./generator";
import RbxtsGenerator from "./rbxts";
import ReactGenerator from "./react";

export type Language = "react" | "rbxts";

export function getGenerator(language: Language, name: string): BaseGenerator {
    switch (language) {
        case "react": return new ReactGenerator(name);
        case "rbxts": return new RbxtsGenerator(name);
    }
}
