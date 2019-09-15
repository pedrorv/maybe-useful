export const click = (e: MouseEvent) => {
  // const target = <HTMLElement>e.target;

  // if (
  //   target &&
  //   target.nodeName &&
  //   (target.nodeName === "HTML" || target.nodeName === "BODY")
  // )
  //   return;

  const path = e.composedPath() as HTMLElement[];

  console.log(document);

  console.log("document", e);
  const htmlIndex = Array.from(path)
    .reverse()
    .findIndex(x => x && x.nodeName && x.nodeName.toLowerCase() === "html");
  console.log(htmlIndex);
  console.log(
    Array.from(path)
      .reverse()
      .slice(htmlIndex)
      .map(el => {
        console.log(el);
        return `${el.nodeName.toLowerCase()}.${el.className
          .split(" ")
          .join(".")}`;
      })
      .join(" > ")
  );
  // console.log(e.target.innerHTML);
  console.log(window.location.origin + window.location.pathname);
};

export default {
  click
};
