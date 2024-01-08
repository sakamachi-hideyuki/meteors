export const renderNavbarNav = (page, prevPage, nextPage) =>
  `<nav id="navbar">
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

const renderPrevLink = (prevPage) =>
  prevPage === undefined
    ? ""
    : `<a href="${
        prevPage.filename === "index.html" ? "./" : prevPage.filename
      }">◀前ページ</a>`;

const renderNextLink = (nextPage) =>
  nextPage === undefined
    ? ""
    : `<a href="${nextPage.filename}">次ページ▶</a>`;
