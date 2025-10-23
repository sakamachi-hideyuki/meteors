/**
 * ページ間リンクを作成する.
 * @param {Array} pages ページデータ配列
 */
export function linkPages(pages) {
  for (const page of pages) {
    // 目次、先頭ページ、付録、改版履歴のページや、コンテンツなしのページはスキップ
    if (
      page.id === "toc" ||
      page.id === "index" ||
      page.id === "revision-history" ||
      page.contentHtml === ""
    ) {
      continue;
    }
    linkPreface(pages, page);
    linkAppendix(pages, page);
    linkChapter(pages, page);
    linkSection(pages, page);
    linkSummary(pages, page);
  }
}

/**
 * 序文ページへのリンクを作成する.
 * @param {Array} pages ページデータ配列
 * @param {Object} page 処理対象のページデータ
 */
function linkPreface(pages, page) {
  const target = pages.find((p) => p.id === "preface");
  // "【序文】"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/【序文】/g, (s) => {
    return `<a href="${target.filename}">${s}</a>`;
  });
}

/**
 * 付録ページへのリンクを作成する.
 * @param {Array} pages ページデータ配列
 * @param {Object} page 処理対象のページデータ
 */
function linkAppendix(pages, page) {
  const target = pages.find((p) => p.id === "appendix");
  // "付録参照"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/付録参照/g, (s) => {
    return `<a href="${target.filename}">${s}</a>`;
  });
  if (page.id !== "appendix") {
    // 付録ページ以外では、最初の"神名末尾のパターン"をリンク化
    page.contentHtml = page.contentHtml.replace(/神名末尾のパターン/, (s) => {
      return `<a href="${target.filename}">${s}</a>`;
    });
  }
}

/**
 * 章ページへのリンクを作成する.
 * @param {Array} pages ページデータ配列
 * @param {Object} page 処理対象のページデータ
 */
function linkChapter(pages, page) {
  // "【～の章】"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/【(.の章)】/g, (s, p1) => {
    const target = pages.find((p) => p.h2Title === p1 && p.h3Title === "");
    if (target === undefined) {
      console.error(`createLinks: ${s} not found.`);
      return s;
    }
    return `<a href="${target.filename}">${s}</a>`;
  });
  // "本章冒頭"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/本章冒頭/g, (s) => {
    const target = pages.find(
      (p) => p.h2Title === page.h2Title && p.h3Title === ""
    );
    if (target === undefined) {
      console.error(`createLinks: ${s} not found.`);
      return s;
    }
    return `<a href="${target.filename}">${s}</a>`;
  });
}

/**
 * 各項のページへのリンクを作成する.
 * @param {Array} pages ページデータ配列
 * @param {Object} page 処理対象のページデータ
 */
function linkSection(pages, page) {
  // "【～の章／～】"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(
    /【(.の章)／([^】]+)】/g,
    (s, p1, p2) => {
      if (!p2.startsWith("補足　")) {
        const index = p2.indexOf("、");
        if (index !== -1) {
          p2 = p2.substring(0, index);
        }
      }
      const target = pages.find((p) => p.h2Title === p1 && p.h3Title === p2);
      if (target === undefined) {
        console.error(`createLinks: ${s} not found.`);
        return s;
      }
      return `<a href="${target.filename}">${s}</a>`;
    }
  );
}

/**
 * 章のまとめページから各項のページへのリンクを作成する.
 * @param {Array} pages ページデータ配列
 * @param {Object} page 処理対象のページデータ
 */
function linkSummary(pages, page) {
  // 章のまとめのページ以外はリンク化しない
  if (!page.id.endsWith("--summary")) {
    return;
  }
  // "<p class="list-1">・～"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(
    /<p class="list-1">・([^（…<]+)/g,
    (s, p1) => {
      const target = pages.find(
        (p) => p.h2Title === page.h2Title && p.h3Title === p1
      );
      if (target === undefined) {
        console.error(`createLinks: ${p1} not found.`);
        return s;
      }
      return `<p class="list-1">・<a href="${target.filename}">${p1}</a>`;
    }
  );
}
