import { CodeOptionsI, FormatE } from "@/types/codeT";
import Code from "./code";
import Code128 from "./code128";

abstract class CodeFactory {
  static create(_value: string, _options: CodeOptionsI): Code {
    switch (_options.format) {
      case FormatE.CODE128:
        return new Code128(_value, _options);
      default:
        throw new Error("Unknown format");
    }
  }
}

export default CodeFactory;
