export interface Size {
  width: number;
  height: number;
}

export enum DocumentType {
  PDF = "pdf",
}

export enum FormatE {
  CODE128 = "code128",
}

export interface CodeOptionsI {
  format: FormatE;
  documentType: DocumentType;
  size: Size;
}

export default interface CodeDataI {
  data: string[];
  options: CodeOptionsI;
}
