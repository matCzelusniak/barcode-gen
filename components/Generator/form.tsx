"use client";
import style from "./form.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useGenerate from "./useGenerate";
import { useEffect, useState } from "react";
import { FormatE, DocumentType } from "@/types/codeT";

enum StatusE {
  IDLE,
  ONGOING,
  ERROR,
  SUCCESS,
}

const Form = () => {
  const [generatorStatus, setGeneratorStatus] = useState<StatusE>(StatusE.IDLE);
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
          setGeneratorStatus(StatusE.ONGOING);
          handleGenerate({
            data: codes.split("\n").filter((txt) => txt !== ""),
            options: {
              format: FormatE.CODE128,
              documentType: DocumentType.PDF,
              size: {
                width: 40,
                height: 20,
                svgWidth: 4,
                svgHeight: 120,
              },
            },
          })
            .then(() => {
              setGeneratorStatus(StatusE.SUCCESS);
            })
            .catch(() => {
              setGeneratorStatus(StatusE.ERROR);
            });
        }}
        disabled={codes === ""}
      >
        Generate PDF with Code 128 list - hardcoded size 40x20mm
      </button>
      <div>
        <button>
          {isClient && (
            <PDFDownloadLink document={pdf} fileName="codes.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download document now!"
              }
            </PDFDownloadLink>
          )}
        </button>
      </div>
      <div>
        {generatorStatus === StatusE.ONGOING && <p>Generating...</p>}
        {generatorStatus === StatusE.ERROR && <p>Error</p>}
        {generatorStatus === StatusE.SUCCESS && <p>Success</p>}
      </div>

      <div className={style.codes}>{codesList.slice(0, 10)}</div>
    </div>
  );
};

export default Form;
