import Size from "./size";

export enum DocumentType {
  PDF = "pdf",
}

export enum CodeType {
  CODE128 = "code128",
}

export default interface GeneratorData {
  data: string[];
  codeType: CodeType;
  documentType: DocumentType;
  size: Size;
}
