"use client";
import style from "./form.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useGenerate from "./useGenerate";
import { useEffect, useState } from "react";
import { FormatE, DocumentType } from "@/types/codeT";

const Form = () => {
  const [codes, setCodes] = useState("");
  const { pdf, handleGenerate, codesList } = useGenerate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <label htmlFor="codes">Codes per line</label>
      <textarea
        id="codes"
        className={style.area}
        value={codes}
        onChange={(e) => setCodes(e.target.value)}
      />
      <button
        onClick={() => {
          handleGenerate({
            data: codes.split("\n"),
            options: {
              format: FormatE.CODE128,
              documentType: DocumentType.PDF,
              size: {
                width: 40,
                height: 20,
              },
            },
          });
        }}
      >
        Generate PDF with Code 128 list - hardcoded size 40x20mm
      </button>
      {isClient && (
        <PDFDownloadLink document={pdf} fileName="code.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      )}
      <div className={style.codes}>{codesList}</div>
    </div>
  );
};

export default Form;
