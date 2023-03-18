import File from "@/utils/generator/file";
import Pdf from "@/utils/generator/pdf";
import { DocumentType } from "@/types/codeT";
import Code from "@/utils/code/code";

class FileFactory {
  static create(_documentType: DocumentType, _codes: Code[]): File {
    switch (_documentType) {
      case DocumentType.PDF:
        return new Pdf(_codes);
      default:
        throw new Error("Unknown document type");
    }
  }
}

export default FileFactory;
