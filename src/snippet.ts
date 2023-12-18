export class Snippet {
    private code = "";
    private indentSpaces = 4;
    private indentPending = false;
    private indentChar = ' ';

    constructor(public indent = 0) { }

    private getIndent(): string {
        return this.indentChar.repeat(this.indentSpaces * this.indent);
    }

    write(text: string) {
        if (this.indentPending) {
            this.code += this.getIndent();
            this.indentPending = false;
        }

        this.code += text;
    }

    writeLine(text: string) {
        this.write(text);
        this.newLine();
    }

    newLine() {
        this.write("\n");
        this.indentPending = true;
    }

    build(): string {
        return this.code
    }
}
