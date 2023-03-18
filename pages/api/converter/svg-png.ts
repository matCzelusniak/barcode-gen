// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

type Data = {
  png: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const svg = req.body.svg;
    const imgS = sharp(Buffer.from(svg));
    const imgB = await imgS.toFormat("png").toBuffer();
    console.log({ png: imgB.toString("base64") });
    res.status(200).json({ png: imgB.toString("base64") });
  } else {
    res.statusCode = 405;
    res.end();
  }
}
