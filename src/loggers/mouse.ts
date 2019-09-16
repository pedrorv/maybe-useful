export const click = (e: MouseEvent) => {
  const path = Array.from(e.composedPath() as HTMLElement[]);

  const htmlIndex = path.findIndex(
    x => x && x.nodeName && x.nodeName.toLowerCase() === "html"
  );

  const eventPath = Array.from(path)
    .reverse()
    .slice(htmlIndex)
    .map(
      el =>
        `${el.nodeName.toLowerCase()}${el.className
          .split(" ")
          .filter(x => x)
          .map(c => `.${c}`)
          .join("")}`
    )
    .join(" ");

  return {
    eventPath,
    location: `${window.location.origin}${window.location.pathname}`
  };
};

export default {
  click
};
