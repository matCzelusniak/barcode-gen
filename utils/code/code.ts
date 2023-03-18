import { DOMImplementation, XMLSerializer } from "xmldom";
import { convertSvgToPngBuffer } from "@/services/converter";
abstract class Code {
  protected xmlSerializer: XMLSerializer;
  protected document: Document;
  protected svgNode: SVGSVGElement;
  protected declare svgString: string;

  constructor() {
    this.xmlSerializer = new XMLSerializer();

    this.document = new DOMImplementation().createDocument(
      "http://www.w3.org/1999/xhtml",
      "html",
      null
    );

    this.svgNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
  }

  public getSvgString(): string {
    return this.svgString;
  }

  public getPngBuffer(): Promise<Buffer> {
    return convertSvgToPngBuffer(this.svgString);
  }
}

export default Code;
