import { OutputType, capture } from "../packages";

export const takeScreenshot = (): string | null => {
  try {
    return capture(OutputType.STRING, document) as string;
  } catch (e) {
    return null;
  }
};
