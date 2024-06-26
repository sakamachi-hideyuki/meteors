export function linkPages(pages) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    // 目次、先頭ページ、付録、改版履歴のページや、コンテンツなしのページはスキップ
    if (
      page.id === "toc" ||
      page.id === "index" ||
      page.id === "appendix" ||
      page.id === "revision-history" ||
      page.contentHtml === ""
    ) {
      continue;
    }
    const prevPage = pages[i - 1];
    let nextPage = undefined;
    for (let j = i + 1; j < pages.length; j++) {
      if (pages[j].contentHtml !== "") {
        nextPage = pages[j];
        break;
      }
    }
    linkPreface(pages, page);
    linkAppendix(pages, page);
    linkChapter(pages, page);
    linkSection(pages, page, prevPage, nextPage);
    linkSupplement(pages, page);
    if (page.id.endsWith("--summary")) {
      linkSummary(pages, page);
    }
  }
}

function linkPreface(pages, page) {
  // 序文のページでは"序文"をリンク化しない
  if (page.id === "preface") {
    return;
  }
  const target = pages.find((p) => p.id === "preface");
  // "序文"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/序文/g, (s) => {
    return `<a href="${target.filename}">${s}</a>`;
  });
}

function linkAppendix(pages, page) {
  const target = pages.find((p) => p.id === "appendix");
  // "付録参照"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/付録参照/g, (s) => {
    return `<a href="${target.filename}">${s}</a>`;
  });
  // 最初の"神名末尾のパターン"をリンク化
  page.contentHtml = page.contentHtml.replace(/神名末尾のパターン/, (s) => {
    return `<a href="${target.filename}">${s}</a>`;
  });
}

function linkChapter(pages, page) {
  // "「～の章」で"、"「～の章」、"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(
    /「([^<>「」]+の章)」(で|、)/g,
    (s, p1, p2) => {
      const target = pages.find((p) => p.h2Title === p1 && p.h3Title === "");
      if (target === undefined) {
        console.error(`createLinks: ${s} not found.`);
        return s;
      }
      return `<a href="${target.filename}">「${p1}」</a>${p2}`;
    }
  );
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

function linkSection(pages, page, prevPage, nextPage) {
  // "「～の章」～の項"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(
    /「([^<>「」]+の章)」([^<>「」項]+)の項/g,
    (s, p1, p2) => {
      const index = p2.indexOf("、");
      if (index !== -1) {
        p2 = p2.substring(0, index);
      }
      const target = pages.find((p) => p.h2Title === p1 && p.h3Title === p2);
      if (target === undefined) {
        console.error(`createLinks: ${s} not found.`);
        return s;
      }
      return `<a href="${target.filename}">${s}</a>`;
    }
  );
  // "本章の～の項"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(
    /本章の([^<>「」項]+)の項/g,
    (s, p1) => {
      const index = p1.indexOf("、");
      if (index !== -1) {
        p1 = p1.substring(0, index);
      }
      const target = pages.find(
        (p) => p.h2Title === page.h2Title && p.h3Title === p1
      );
      if (target === undefined) {
        console.error(`createLinks: ${s} not found.`);
        return s;
      }
      return `<a href="${target.filename}">${s}</a>`;
    }
  );
  // "前項"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/前項/g, (s) => {
    return `<a href="${prevPage.filename}">${s}</a>`;
  });
  // "次項"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(/次項/g, (s) => {
    return `<a href="${nextPage.filename}">${s}</a>`;
  });
}

function linkSupplement(pages, page) {
  // "「補足　～」"をリンク化
  page.contentHtml = page.contentHtml.replaceAll(
    /「(補足　[^<>「」]+)」/g,
    (s, p1) => {
      const target = pages.find((p) => p.h3Title === p1);
      if (target === undefined) {
        console.error(`createLinks: ${s} not found.`);
        return s;
      }
      return `<a href="${target.filename}">${s}</a>`;
    }
  );
}

function linkSummary(pages, page) {
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
