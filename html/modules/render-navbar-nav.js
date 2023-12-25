export function renderNavbarNav(page, prevPage, nextPage) {
  return `<nav id="navbar">
<ul>
<li>
${renderPrevLink(prevPage)}
</li>
<li>
<a href="toc.html#toc-${page.id}">目次</a>
</li>
<li>
${renderNextLink(nextPage)}
</li>
</ul>
</nav>`;
}

function renderPrevLink(prevPage) {
  if (prevPage === undefined) {
    return "";
  }
  return `<a href="${
    prevPage.filename === "index.html" ? "./" : prevPage.filename
  }">◀&nbsp;前ページ</a>`;
}

function renderNextLink(nextPage) {
  if (nextPage === undefined) {
    return "";
  }
  return `<a href="${nextPage.filename}">次ページ&nbsp;▶</a>`;
}
