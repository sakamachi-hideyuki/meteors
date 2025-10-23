import { renderHead } from "./render-head.js";
import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";

/**
 * 先頭ページをレンダリングする.
 * @param {Object} page 処理対象のページデータ
 * @param {Object} nextPage 次ページのページデータ
 * @returns {string} レンダリング結果のHTML文字列
 */
export const renderIndexHtml = (page, nextPage) => `
<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
  <head>
${renderHead(Shared.websiteTitle, page.descText, page.filename)}
  </head>
  <body>
${renderHeader(page, undefined, nextPage)}
    <main>
      <div class="website-image">
${Shared.photoPleiadesHtml}
      </div>
      <div id="content">
${page.contentHtml}
      </div>
    </main>
${renderFooter(nextPage)}
  </body>
</html>
`;
