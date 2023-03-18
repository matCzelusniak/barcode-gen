import { CodeOptionsI } from "@/types/codeT";
import Code from "./code";
import JsBarcode from "jsbarcode";

class Code128 extends Code {
  constructor(_value: string, _options: CodeOptionsI) {
    super();

    JsBarcode(this.svgNode, _value, {
      xmlDocument: document,
      format: "CODE128",
    });

    this.svgString = this.xmlSerializer.serializeToString(this.svgNode);
  }
}

export default Code128;
