/**
 * ヘッダーをレンダリングする.
 * @param {Object} page 処理対象のページデータ
 * @param {Object} prevPage 前ページのページデータ
 * @param {Object} nextPage 次ページのページデータ
 * @returns {string} レンダリング結果のHTML文字列
 */
export const renderHeader = (page, prevPage, nextPage) => `
    <header>
      <nav id="navbar">
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
      </nav>
    </header>
`;

const renderPrevLink = (prevPage) =>
  prevPage === undefined
    ? ""
    : `            <a href="${
        prevPage.filename === "index.html" ? "./" : prevPage.filename
      }">◀前ページ</a>`;

const renderNextLink = (nextPage) =>
  nextPage === undefined
    ? ""
    : `            <a href="${nextPage.filename}">次ページ▶</a>`;
