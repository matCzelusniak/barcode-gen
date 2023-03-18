import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

type Data = {
  png?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const svg = req.body.svg;
    const svgImgBuffer = sharp(Buffer.from(svg));
    const pngImgBuffer = await svgImgBuffer.toFormat("png").toBuffer();
    res.status(200).json({ png: pngImgBuffer.toString("base64") });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
