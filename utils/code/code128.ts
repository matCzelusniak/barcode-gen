import { CodeOptionsI } from "@/types/codeT";
import Code from "./code";
import JsBarcode from "jsbarcode";

class Code128 extends Code {
  constructor(_value: string, _options: CodeOptionsI) {
    super();
    this.size = _options.size;

    JsBarcode(this.svgNode, _value, {
      xmlDocument: document,
      format: "CODE128",
      width: _options.size.svgWidth,
      height: _options.size.svgHeight,
      fontSize: 45,
    });

    this.svgString = this.xmlSerializer.serializeToString(this.svgNode);
  }
}

export default Code128;
