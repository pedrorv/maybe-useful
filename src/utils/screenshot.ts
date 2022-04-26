import html2canvas from "html2canvas";

export const takeScreenshot = async (): Promise<string | null> => {
  try {
    const canvas: HTMLCanvasElement = await html2canvas(document.body, {
      allowTaint: true,
      foreignObjectRendering: true,
    });

    return canvas.toDataURL("image/webp", 0.9);
  } catch (e) {
    return null;
  }
};
