export function renderNextPageNav(nextPage) {
  if (nextPage === undefined) {
    return "";
  }
  return `<nav id="next-page">
<a href="${nextPage.filename}">次ページ▶${nextPage.title}</a>
${renderDescDiv(nextPage)}
</nav>`;
}

function renderDescDiv(nextPage) {
  if (nextPage.descHtml === "") {
    return "";
  }
  return `<div class="desc">${nextPage.descHtml}</div>`;
}
