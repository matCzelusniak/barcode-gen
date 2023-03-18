import { useState } from "react";
import Pdf from "@/components/Exporter/pdf";
import CodeDataI, { CodeOptionsI, FormatE } from "@/types/codeT";
import SVG from "react-inlinesvg";
import CodeFactory from "@/utils/code/codeFactory";
import Code from "@/utils/code/code";
import FileFactory from "@/utils/generator/fileFactory";
import File from "@/utils/generator/file";

const useGenerate = () => {
  const [pdf, setPdf] = useState<JSX.Element | null>(null);
  const [codesList, setCodesList] = useState<JSX.Element[]>([]);

  const handleGenerate = async (codeData: CodeDataI) => {
    let codes: Code[] = [];
    let codesJsx: JSX.Element[] = [];

    for (let i = 0; i < codeData.data.length; i++) {
      const code: Code = CodeFactory.create(codeData.data[i], codeData.options);
      codesJsx.push(<SVG key={i} src={code.getSvgString()} />);
      codes.push(code);
    }

    setCodesList(codesJsx);

    //temporary use only pdf
    const file: File = FileFactory.create(codeData.options.documentType, codes);
    setPdf(await file.getFile());
    // switch (data.documentType) {
    //   case DocumentType.PDF: {
    //     setPdf(generatePDF(codesPngBuffer));
    //     break;
    //   }
    //   default:
    //     throw new Error("No export type selected");
    // }
  };

  // const generateCode128List = (genData: GeneratorData) => {
  //   let codes128: string[] = [];
  //   for (let i = 0; i < genData.data.length; i++) {
  //     codes128.push(Code128(genData.data[i]));
  //   }
  //   console.log("codes:", codes128);
  //   return codes128;
  // };

  const generatePDF = (codes: Buffer[]) => {
    console.log("codes bef odf:", codes);
    return <Pdf elements={codes} />;
  };

  return {
    codesList,
    pdf,
    handleGenerate,
  };
};

export default useGenerate;
