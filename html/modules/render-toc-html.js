export function renderTocHtml(pages) {
  return `<!DOCTYPE html>
<html lang="ja" id="html-toc">
<head>
${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>目次 - ${Shared.bookTitle}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<div id="content">
<div class="h1-title">${Shared.bookTitle}</div>
<h2>目次</h2>
<nav id="toc">
${renderTocUl(pages)}
</nav>
</div>
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
<a class="top-of-page" href="#" title="ページ先頭へ">▲</a>
</body>
</html>
`;
}

function renderTocUl(pages) {
  const tocUl = document.createElement("ul");
  let curUls = [undefined, tocUl, undefined];
  let curLevel = 1;
  for (const page of pages) {
    if (page.tocLevel === 0) {
      continue; // 目次ページは目次に入れない
    } else if (page.tocLevel === curLevel) {
    } else if (page.tocLevel === curLevel + 1) {
      const newUl = document.createElement("ul");
      curUls[curLevel].lastElementChild.appendChild(newUl);
      curUls[page.tocLevel] = newUl;
      curLevel = page.tocLevel;
    } else if (page.tocLevel < curLevel) {
      curLevel = page.tocLevel;
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
