// import { Color3, Enum, Font, UDim, UDim2, Vector2 } from "../roblox";

// export default abstract class BaseGenerator {
//     protected readonly name: string;
//     protected code = "";

//     private readonly indentSpaces = 4;
//     protected indentPending = false;
//     private indentLevel = 0;

//     constructor(name: string) {
//         this.name = name;
//     }

//     private getIndent(): string {
//         return " ".repeat(this.indentSpaces * this.indentLevel);
//     }

//     protected indent() {
//         this.indentLevel++;
//     }

//     protected dedent() {
//         this.indentLevel = Math.max(0, this.indentLevel - 1);
//     }

//     protected write(text: string) {
//         if (this.indentPending) {
//             this.code += this.getIndent();
//             this.indentPending = false;
//         }

//         this.code += text;
//     }

//     protected writeLine(text: string) {
//         this.write(text);
//         this.newline();
//     }

//     protected newline() {
//         this.write("\n");
//         this.indentPending = true;
//     }

//     abstract element(e: ReactElement, name?: string): void

//     protected abstract vector2(v: Vector2): void

//     protected abstract udim(u: UDim): void

//     protected abstract udim2(u: UDim2): void

//     protected abstract font(f: Font): void

//     protected abstract color(c: Color3): void

//     protected enum(e: Enum) {
//         this.write("Enum.");
//         // this.write(e.items.join("."))
//     }

//     abstract generate(): CodegenResult

//     static error(text: string): CodegenResult {
//         return { title: "ERROR!", language: "PLAINTEXT", code: text };
//     }
// }
