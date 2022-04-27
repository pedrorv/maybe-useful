import { toCanvas } from "html-to-image";

export const takeScreenshot = async (): Promise<string | null> => {
  try {
    const canvas = await toCanvas(document.body, {
      backgroundColor: getComputedStyle(document.body).backgroundColor,
      fontEmbedCSS: "",
    });

    return canvas.toDataURL("image/webp", 0.9);
  } catch (e) {
    return null;
  }
};
