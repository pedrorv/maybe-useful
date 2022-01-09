const imported: Record<string, boolean> = {};

export const importFromCDN = (url: string): Promise<void> =>
  new Promise((resolve) => {
    if (imported[url]) return resolve();

    const script = document.createElement("script");
    script.setAttribute("src", url);
    document.head.appendChild(script);
    script.onload = () => resolve();

    imported[url] = true;
  });
