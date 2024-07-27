export const renderFooter = (nextPage) =>
  `<footer>
${renderNextPageNav(nextPage)}
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
<a class="top-of-page" href="#" title="ページ先頭へ">▲</a>
</footer>`;

const renderNextPageNav = (nextPage) =>
  nextPage === undefined
    ? ""
    : `<nav id="next-page">
<a href="${nextPage.filename}">次ページ ▶ ${nextPage.title}</a>
${renderDescDiv(nextPage)}
</nav>`;

const renderDescDiv = (nextPage) =>
  nextPage.descHtml === ""
    ? ""
    : `<div class="desc">${nextPage.descHtml}</div>`;
