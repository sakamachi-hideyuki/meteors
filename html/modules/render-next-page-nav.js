export const renderNextPageNav = (nextPage) =>
  nextPage === undefined
    ? ""
    : `<nav id="next-page">
<a href="${nextPage.filename}">次ページ▶${nextPage.title}</a>
${renderDescDiv(nextPage)}
</nav>`;

const renderDescDiv = (nextPage) =>
  nextPage.descHtml === ""
    ? ""
    : `<div class="desc">${nextPage.descHtml}</div>`;
