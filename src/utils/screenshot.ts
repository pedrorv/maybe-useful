import html2canvas from "html2canvas";

export const takeScreenshot = () => {
  html2canvas(document.body, {
    allowTaint: true,
    foreignObjectRendering: true,
  }).then((canvas) => {
    var link = document.createElement("a");
    link.download = "image.png";

    canvas.toBlob(function (blob) {
      link.href = URL.createObjectURL(blob);
      link.click();
      link.parentElement?.removeChild(link);
    }, "image/png");
  });
};
