import { renderHead } from "./render-head.js";
import { renderFooter } from "./render-footer.js";

/**
 * 目次ページをレンダリングする.
 * @param {Object} page 処理対象のページデータ
 * @param {Array} pages ページデータ配列
 * @returns {string} レンダリング結果のHTML文字列
 */
export const renderTocHtml = (page, pages) => `
<!DOCTYPE html>
<html lang="ja" id="html-${page.id}" prefix="og: https://ogp.me/ns#">
  <head>
${renderHead(`${page.title} - ${Shared.websiteTitle}`, "", page.filename)}
  </head>
  <body>
    <main>
      <div id="website-title">${Shared.websiteTitle}</div>
      <div id="content">
        <section class="toc-section" id="toc">
          <h1>${page.title}</h1>
          <nav id="toc">
${renderTocUl(pages)}
          </nav>
        </section>
      </div>
    </main>
${renderFooter(undefined)}
  </body>
</html>
`;

/**
 * 目次のul要素をレンダリングする.
 * @param {Array} pages ページデータ配列
 * @returns {string} レンダリング結果のHTML文字列
 */
function renderTocUl(pages) {
  const tocUl = document.createElement("ul");
  let curUls = [undefined, tocUl, undefined];
  let curLevel = 1;
  for (const page of pages) {
    if (page.id === "toc") {
      continue; // 目次ページは目次に入れない
    }
    const newLevel = page.level2Title === "" ? 1 : 2;
    if (newLevel === curLevel) {
    } else if (newLevel === curLevel + 1) {
      const newUl = document.createElement("ul");
      curUls[curLevel].lastElementChild.appendChild(newUl);
      curUls[newLevel] = newUl;
      curLevel = newLevel;
    } else if (newLevel < curLevel) {
      curLevel = newLevel;
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
