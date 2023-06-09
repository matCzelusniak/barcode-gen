import { Document, Page, Image } from "@react-pdf/renderer";
import Code from "../code/code";
import File from "./file";
import { convertMmToPx } from "@/utils/helpers/unit";

class Pdf extends File {
  constructor(_codes: Code[]) {
    super(_codes);
  }

  public async getFile(): Promise<JSX.Element> {
    let promisesToPngBuffer = [];
    for (let i = 0; i < this.codes.length; i++) {
      promisesToPngBuffer.push(this.codes[i].getPngBuffer());
    }

    const codesPngBuffer: Buffer[] = [
      ...(await Promise.all(promisesToPngBuffer)),
    ];

    let pages: JSX.Element[] = [];
    for (let i = 0; i < codesPngBuffer.length; i++) {
      pages.push(
        <Page
          key={i}
          size={{
            width: `${convertMmToPx(this.codes[i].getSize().width)}px`,
            height: `${convertMmToPx(this.codes[i].getSize().height)}px`,
          }}
          dpi={300}
        >
          <Image
            style={{
              width: `${convertMmToPx(this.codes[i].getSize().width)}px`,
              height: `${convertMmToPx(this.codes[i].getSize().height)}px`,
            }}
            src={{ data: codesPngBuffer[i], format: "png" }}
          ></Image>
        </Page>
      );
    }

    return <Document>{pages}</Document>;
  }
}

export default Pdf;
