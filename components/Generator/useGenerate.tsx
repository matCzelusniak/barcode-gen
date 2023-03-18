import { useState } from "react";
import Pdf from "@/components/Exporter/pdf";
import CodeDataI, { CodeOptionsI, FormatE } from "@/types/codeT";
import Code128 from "@/utils/code/code128";
import SVG from "react-inlinesvg";
import { convertSvgToPngBuffer } from "@/services/converter";
import CodeFactory from "@/utils/code/codeFactory";
import Code from "@/utils/code/code";

const useGenerate = () => {
  const [pdf, setPdf] = useState<JSX.Element | null>(null);
  const [codesList, setCodesList] = useState<JSX.Element[]>([]);

  const handleGenerate = async (codeData: CodeDataI) => {
    let codesPngBuffer: Buffer[] = [];
    let codesJsx: JSX.Element[] = [];

    let promisesToPngBuffer = [];
    for (let i = 0; i < codeData.data.length; i++) {
      const code: Code = CodeFactory.create(codeData.data[i], codeData.options);
      codesJsx.push(<SVG key={i} src={code.getSvgString()} />);
      promisesToPngBuffer.push(code.getPngBuffer());
    }

    setCodesList(codesJsx);
    codesPngBuffer = [...(await Promise.all(promisesToPngBuffer))];

    // switch (data.documentType) {
    //   case DocumentType.PDF: {
    //     setPdf(generatePDF(codesPngBuffer));
    //     break;
    //   }
    //   default:
    //     throw new Error("No export type selected");
    // }
  };

  return {
    codesList,
    pdf,
    handleGenerate,
  };
};

export default useGenerate;
