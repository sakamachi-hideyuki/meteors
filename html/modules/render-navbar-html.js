export function renderNavbarHtml(prevPage, curPage, nextPage) {
  return `<nav id="navbar">
<ul>
<li>
${
  prevPage === undefined
    ? ""
    : `<a href="${
        prevPage.filename === "index.html" ? "./" : prevPage.filename
      }">◀&nbsp;前ページ</a>`
}
</li>
<li>
<a href="toc.html#toc-${curPage.id}">目次</a>
</li>
<li>
${
  nextPage === undefined
    ? ""
    : `<a href="${nextPage.filename}">次ページ&nbsp;▶</a>`
}
</li>
</ul>
</nav>`;
}
