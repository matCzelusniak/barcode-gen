import sharp from "sharp";

export const convertSvgToPngBuffer = async (svg: string) => {
  console.log("jajo svg", svg);
  const imgS = sharp(svg);
  return imgS.toFormat("png").toBuffer();
};
