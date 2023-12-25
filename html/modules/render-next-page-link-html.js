export function renderNextPageLinkHtml(nextPage) {
  if (nextPage === undefined) {
    return "";
  }
  const descDiv =
    nextPage.descHtml === ""
      ? ""
      : `<div class="desc">${nextPage.descHtml}</div>`;
  return `<nav id="next-page">
<a href="${nextPage.filename}">次ページ▶${nextPage.title}</a>
${descDiv}
</nav>`;
}
