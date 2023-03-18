import { Document, Page, Image } from "@react-pdf/renderer";
import { renderToStaticMarkup } from "react-dom/server";
import Html from "react-pdf-html";
import sharp from "sharp";

const Pdf = ({ elements }: { elements: Buffer[] }) => {
  const getPages = () => {
    const pages = [];
    for (let i = 0; i < elements.length; i++) {
      // const imgS = sharp(elements[i]);
      // imgS.toFormat("png");
      // const buff = new Buffer(elements[i]);
      // const base64data = buff.toString("base64");
      // const png = convert(elements[i], { width: 200, height: 200 });
      // const html = renderToStaticMarkup(
      //   <html>
      //     <p>aaa</p>
      //     <img
      //       width={200}
      //       height={200}
      //       src={`data:image/svg+xml;base64,${base64data}`}
      //     />
      //     <p>ddd</p>
      //   </html>
      // );

      pages.push(
        <Page key={i}>
          <Image
            style={{ width: "100px" }}
            src={{ data: elements[i], format: "png" }}
          ></Image>
        </Page>
      );
    }
    return pages;
  };

  return <Document>{getPages()}</Document>;
};

export default Pdf;
