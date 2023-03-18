export const convertSvgToPngBuffer = async (svg: string): Promise<Buffer> => {
  const res = await fetch("/api/converter/svg-png", {
    method: "POST",
    body: JSON.stringify({ svg: svg }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { png } = await res.json();
  return Buffer.from(png, "base64");
};
