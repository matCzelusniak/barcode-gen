import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

const Code128 = (value: string): string => {
  const xmlSerializer = new XMLSerializer();
  const document = new DOMImplementation().createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null
  );
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  JsBarcode(svgNode, value, {
    xmlDocument: document,
  });

  console.log(svgNode);
  return xmlSerializer.serializeToString(svgNode);
};

export default Code128;
