import { useState } from "react";
import GeneratorData from "@/types/generatorData";
import Pdf from "@/components/Exporter/pdf";
import { DocumentType } from "@/types/generatorData";
import Code128 from "@/utils/code/code128";
import SVG from "react-inlinesvg";
import { convertSvgToPngBuffer } from "@/services/converter";

const useGenerate = () => {
  const [pdf, setPdf] = useState<JSX.Element | null>(null);
  const [codesList, setCodesList] = useState<JSX.Element[]>([]);

  const handleGenerate = async (genData: GeneratorData) => {
    let codesSvgText: string[] = [];
    let codesPngBuffer: Buffer[] = [];
    let codesJsx: JSX.Element[] = [];
    switch (genData.codeType) {
      case "code128":
        codesSvgText = generateCode128List(genData);
        // setTimeout(() => {
        //   codes.forEach((code) => {
        //     console.log("code:", renderToStaticMarkup(code));
        //   });
        // }, 1000);
        let promises = [];
        for (let i = 0; i < codesSvgText.length; i++) {
          promises.push(convertSvgToPngBuffer(codesSvgText[i]));
        }

        codesPngBuffer = [...(await Promise.all(promises))];

        for (let i = 0; i < codesSvgText.length; i++) {
          const buff = new Buffer(codesSvgText[i]);
          const base64data = buff.toString("base64");
          codesJsx.push(<SVG key={i} src={codesSvgText[i]} />);
          codesJsx.push(
            <img src={`data:image/svg+xml;base64,${base64data}`} alt="" />
          );
        }
        setCodesList(codesJsx);
        break;
      default:
        setCodesList([]);
    }

    switch (data.documentType) {
      case DocumentType.PDF: {
        setPdf(generatePDF(codesPngBuffer));
        break;
      }
      default:
        throw new Error("No export type selected");
    }
  };

  const generateCode128List = (genData: GeneratorData) => {
    let codes128: string[] = [];
    for (let i = 0; i < genData.data.length; i++) {
      codes128.push(Code128(genData.data[i]));
    }
    console.log("codes:", codes128);
    return codes128;
  };

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
