import { renderFooter } from "./render-footer.js";

export const renderTocHtml = (page, pages) =>
  `<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title} - ${Shared.websiteTitle}</title>
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:url" content="${Shared.websiteUrl}${page.filename}">
<meta property="og:image" content="${Shared.websiteImage}">
<meta property="og:site_name" content="${Shared.websiteTitle}">
<meta property="og:title" content="${page.title} - ${Shared.websiteTitle}" />
<style>
/* FOUC(Flash of unstyled content)対策 */
html {
  visibility: hidden;
}
</style>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<div class="h1-title">${Shared.websiteTitle}</div>
<div id="content">
<h2>${page.title}</h2>
<nav id="toc">
${renderTocUl(pages)}
</nav>
</div>
</main>
${renderFooter(undefined)}
</body>
</html>
`;

function renderTocUl(pages) {
  const tocUl = document.createElement("ul");
  let curUls = [undefined, tocUl, undefined];
  let curLevel = 1;
  for (const page of pages) {
    if (page.id === "toc") {
      continue; // 目次ページは目次に入れない
    }
    const newLevel = page.h3Title === "" ? 1 : 2;
    if (newLevel === curLevel) {
    } else if (newLevel === curLevel + 1) {
      const newUl = document.createElement("ul");
      curUls[curLevel].lastElementChild.appendChild(newUl);
      curUls[newLevel] = newUl;
      curLevel = newLevel;
    } else if (newLevel < curLevel) {
      curLevel = newLevel;
    } else {
      throw new Error();
    }
    if (page.contentHtml === "") {
      continue;
    }
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = page.filename === "index.html" ? "./" : page.filename;
    a.id = `toc-${page.id}`;
    a.innerText = page.title;
    li.appendChild(a);
    if (page.descHtml !== "") {
      const descDiv = document.createElement("div");
      descDiv.className = "desc";
      descDiv.innerHTML = page.descHtml;
      li.appendChild(descDiv);
    }
    curUls[curLevel].appendChild(li);
    curUls[curLevel].appendChild(document.createTextNode("\n"));
  }
  return tocUl.outerHTML;
}
