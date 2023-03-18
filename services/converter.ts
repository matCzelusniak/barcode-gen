export const convertSvgToPngBuffer = async (svg: string): Promise<Buffer> => {
  console.log("jajo svg: ", JSON.stringify({ svg: svg }));
  const res = await fetch("/api/converter/svg-png", {
    method: "POST",
    body: JSON.stringify({ svg: svg }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { png } = await res.json();
  console.log(png);
  return Buffer.from(png, "base64");
};
