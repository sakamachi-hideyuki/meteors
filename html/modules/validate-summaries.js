import { removeElems } from "./dom-utils.js";

export function validateSummaries(pages) {
  const summariesS = getSummariesS(pages).map(removeLinks);
  const summariesC = getSummariesC(pages).map(removeLinks);
  validate(summariesS, summariesC);
}

function getSummariesS(pages) {
  const begin = '<p class="heading">まとめ</p>\n';
  const end1 = '<p class="blank">';
  const end2 = "</section>";
  const summaries = [];
  // 補足以外のまとめを収集
  pages
    .filter((p) => !p.h3Title.startsWith("補足"))
    .forEach((page) => {
      const beginIndex = page.contentHtml.indexOf(begin);
      if (beginIndex === -1) {
        return;
      }
      let endIndex = page.contentHtml.indexOf(end1, beginIndex);
      if (endIndex === -1) {
        endIndex = page.contentHtml.indexOf(end2, beginIndex);
        if (endIndex === -1) {
          return;
        }
      }
      const summary = page.contentHtml.substring(
        beginIndex + begin.length,
        endIndex
      );
      summaries.push(summary);
    });
  return summaries;
}

function getSummariesC(pages) {
  const begin = '<p class="list-1">';
  const end = "</section>";
  const separator = '<p class="blank">&nbsp;</p>\n';
  const summaries = [];
  // 章のまとめを収集
  pages
    .filter((p) => p.h3Title.endsWith("まとめ"))
    .forEach((page) => {
      const beginIndex = page.contentHtml.indexOf(begin);
      const endIndex = page.contentHtml.indexOf(end);
      if (beginIndex === -1 || endIndex === -1) {
        return;
      }
      const html = page.contentHtml.substring(beginIndex, endIndex);
      const sums = html.split(separator);
      summaries.push(...sums);
    });
  return summaries;
}

function removeLinks(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;
  removeElems(rootElem, "a[href]");
  return rootElem.innerHTML;
}

function validate(summariesS, summariesC) {
  console.log("summariesS:");
  console.log(summariesS);
  console.log("summariesC:");
  console.log(summariesC);
  const len = Math.max(summariesS.length, summariesC.length);
  const errors = [];
  for (let i = 0; i < len; i++) {
    const summaryS = summariesS[i];
    const summaryC = summariesC[i];
    if (
      summaryS === undefined ||
      summaryC === undefined ||
      summaryS !== summaryC
    ) {
      errors.push(
        `summary unmatch: i=${i} summaryS=
${summaryS}
, summaryC=
${summaryC}`
      );
    }
  }
  if (errors.length !== 0) {
    errors.forEach((e) => console.error(e));
    throw new Error(`summary unmatch: ${errors.length} error(s)`);
  }
}
