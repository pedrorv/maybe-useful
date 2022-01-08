import html2canvas from "html2canvas";

export const takeScreenshot = async (): Promise<string | null> => {
  try {
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      foreignObjectRendering: true,
    });

    return canvas.toDataURL();
  } catch (e) {
    return null;
  }
};
