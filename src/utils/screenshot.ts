import { importFromCDN } from "./import";

export const takeScreenshot = async (): Promise<string | null> => {
  try {
    await importFromCDN(
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.0/html2canvas.min.js"
    );

    const canvas = await (window as any)?.html2canvas(document.body, {
      allowTaint: true,
      foreignObjectRendering: true,
    });

    return canvas.toDataURL();
  } catch (e) {
    return null;
  }
};
