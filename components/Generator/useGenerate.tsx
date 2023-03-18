import { useState } from "react";
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

    const file: File = FileFactory.create(codeData.options.documentType, codes);
    //temporary use only pdf
    setPdf(await file.getFile());
  };

  return {
    codesList,
    pdf,
    handleGenerate,
  };
};

export default useGenerate;
