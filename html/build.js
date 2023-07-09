class Builder {
  static amazonUrl = "https://www.amazon.co.jp/dp/B09DX3WVX6/";

  static canonicalHtml =
    '<link rel="canonical" href="https://sakamachi-hideyuki.github.io/meteors/">';

  static googleAnalyticsHtml = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-45DHNXBNFZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-45DHNXBNFZ');
</script>
`;

  static h2TitleToId = {
    序文: "preface",
    速の章: "chapter-of-haya",
    櫛の章: "chapter-of-kushi",
    甕の章: "chapter-of-mika",
    玉の章: "chapter-of-tama",
    火の章: "chapter-of-hi",
    石の章: "chapter-of-ishi",
    "付録　神名末尾のパターン": "appendix",
    改版履歴: "revision-history",
  };

  build(inputHtml) {
    const rootElem = document.createElement("div");
    rootElem.innerHTML = inputHtml;

    this.removeElemsAndDescendants(rootElem, "[class^=MsoToc], br");
    this.removeElems(rootElem, "a, span");
    this.removeUnnecessaryAttrs(rootElem);

    this.convertTextIndents(rootElem);
    this.convertImages(rootElem);

    this.removeBlankLines(rootElem);
    this.removeUnnecessaryParagraphs(rootElem);

    this.changeTagNames(rootElem, "h2", "h3");
    this.changeTagNames(rootElem, "h1", "h2");

    this.createH2Sections(rootElem);
    this.setH2SectionIds(rootElem);
    this.moveH2SectionImages(rootElem);

    this.createH3Sections(rootElem);
    this.setH3SectionIdsAndClasses(rootElem);
    this.moveH3Sections(rootElem);
    this.removeBlankLinesAtEndOfSections(rootElem);
    this.setTitleOnlyClasses(rootElem);

    const pages = this.createPages(rootElem);

    return pages;
  }

  removeElemsAndDescendants(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      el.remove();
    });
  }

  removeElems(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      while (el.firstChild) {
        el.parentElement.insertBefore(el.firstChild, el);
      }
      el.remove();
    });
  }

  removeUnnecessaryAttrs(rootElem) {
    rootElem.querySelectorAll("*").forEach((el) => {
      const textIndent = el.style.textIndent;
      for (const name of el.getAttributeNames()) {
        if (name.toLowerCase() === "alt") {
          // alt属性は削除しない
          continue;
        }
        // それ以外の属性は削除
        el.removeAttribute(name);
      }
      if (textIndent) {
        // style属性のtext-indentのみ復活
        el.style.textIndent = textIndent;
      }
    });
  }

  convertTextIndents(rootElem) {
    rootElem.querySelectorAll("*[style]").forEach((el) => {
      const textIndent = el.style.textIndent;
      if (textIndent && textIndent.endsWith("pt")) {
        // ptを数値で取得
        const pt = Number(textIndent.substring(0, textIndent.length - 2));
        // 10.5ptあたり1remに変換、四捨五入で小数部１桁にする
        const rem = Math.round((pt / 10.5) * 10) / 10;
        el.style.textIndent = `${rem}rem`;
      }
    });
  }

  convertImages(rootElem) {
    Array.from(rootElem.querySelectorAll("img")).forEach((el) => {
      const alt = el.getAttribute("alt") ?? "";
      const html = Shared.altToHtml[alt];
      if (html === undefined) {
        throw new Error(`Unknown alt: ${alt}`);
      }
      let ancestor = el.parentElement;
      while (
        ancestor.tagName.toLowerCase() !== "p" &&
        ancestor.tagName.toLowerCase() !== "table"
      ) {
        ancestor = ancestor.parentElement;
      }
      if (html === "") {
        ancestor.remove();
      } else {
        const newElem = this.htmlToElem(html);
        ancestor.replaceWith(newElem);
      }
    });
  }

  removeBlankLines(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/\n+/g, "\n");
  }

  removeUnnecessaryParagraphs(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/<p>\n?<\/p>\n?/g, ""); // 内容のないpを削除
  }

  changeTagNames(rootElem, oldTagName, newTagName) {
    Array.from(rootElem.querySelectorAll(oldTagName)).forEach((oldTag) => {
      const newTag = document.createElement(newTagName);
      while (oldTag.firstChild) {
        newTag.appendChild(oldTag.firstChild);
      }
      oldTag.replaceWith(newTag);
    });
  }

  createH2Sections(rootElem) {
    let h2Section = undefined;
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "h2") {
        h2Section = this.htmlToElem('<section class="h2-section"></section>');
        node.replaceWith(h2Section);
      }
      if (h2Section !== undefined) {
        h2Section.appendChild(node);
      }
    }
  }

  setH2SectionIds(rootElem) {
    rootElem.querySelectorAll(".h2-section").forEach((el) => {
      const h2Title = el.querySelector("h2").innerText;
      const id = Builder.h2TitleToId[h2Title];
      if (id === undefined) {
        throw new Error(`Unknown h2 title: ${h2Title}`);
      }
      el.id = id;
    });
  }

  moveH2SectionImages(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    let prevH2Section = undefined;
    for (const h2Section of h2Sections) {
      if (
        prevH2Section !== undefined &&
        prevH2Section.lastElementChild.className === "image-and-caption"
      ) {
        h2Section.prepend(prevH2Section.lastElementChild);
      }
      prevH2Section = h2Section;
    }
  }

  createH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      let h3Section = undefined;
      for (const node of Array.from(h2Section.childNodes)) {
        if (node.nodeType === 1 && node.tagName.toLowerCase() === "h3") {
          h3Section = this.htmlToElem('<section class="h3-section"></section>');
          node.replaceWith(h3Section);
        }
        if (h3Section !== undefined) {
          h3Section.appendChild(node);
        }
      }
    }
  }

  setH3SectionIdsAndClasses(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      let sectionCount = 0;
      let supplementCount = 0;
      for (const h3Section of h3Sections) {
        const h3Title = h3Section.querySelector("h3").innerText;
        if (h3Title.endsWith("まとめ")) {
          h3Section.id = `${h2Section.id}--summary`;
          h3Section.classList.add("summary");
        } else if (h3Title.startsWith("補足")) {
          supplementCount++;
          h3Section.id = `${h2Section.id}--supplement-${supplementCount}`;
          h3Section.classList.add("supplement");
        } else {
          sectionCount++;
          h3Section.id = `${h2Section.id}--section-${sectionCount}`;
          h3Section.classList.add("section");
        }
      }
    }
  }

  moveH3Sections(rootElem) {
    const h2Sections = Array.from(rootElem.querySelectorAll(".h2-section"));
    for (const h2Section of h2Sections) {
      const h3Sections = Array.from(h2Section.querySelectorAll(".h3-section"));
      const nextH2Section = h2Section.nextElementSibling;
      for (const h3Section of h3Sections) {
        nextH2Section.before(h3Section);
      }
    }
  }

  removeBlankLinesAtEndOfSections(rootElem) {
    rootElem.querySelectorAll("section").forEach((el) => {
      // 末尾の空行は削除
      el.innerHTML = el.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n+)+$/g, "");
    });
  }

  setTitleOnlyClasses(rootElem) {
    rootElem.querySelectorAll(".h3-section").forEach((el) => {
      if (el.querySelector("p") === null) {
        el.classList.add("title-only");
      }
    });
  }

  createPages(rootElem) {
    const pages = this.createPageData(rootElem);
    this.combineTitleOnlyPages(pages);
    this.createLinks(pages);
    const introductionHtml = this.createIntroductionHtml(rootElem);
    const tocHtml = this.createTocHtml(pages);
    pages[0].html = this.createIndexHtml(
      introductionHtml,
      tocHtml,
      this.createNextPageLinkHtml(pages[1])
    );

    for (let i = 1; i < pages.length; i++) {
      if (pages[i].html === undefined) {
        continue;
      }
      let nextPage = undefined;
      for (let j = i + 1; j < pages.length; j++) {
        if (pages[j].html !== undefined) {
          nextPage = pages[j];
          break;
        }
      }
      const navbarHtml = this.createNavbarHtml(
        pages[i - 1],
        pages[i],
        nextPage
      );
      pages[i].html = this.createPageHtml(
        pages[i].h2Title,
        pages[i].h3Title,
        navbarHtml,
        pages[i].html,
        this.createNextPageLinkHtml(nextPage)
      );
    }
    return pages;
  }

  createPageData(rootElem) {
    const pages = [];
    const indexPage = {
      level: 1,
      id: "index",
      title: "先頭ページ",
      h2Title: "",
      h3Title: "",
      filename: "index.html",
      html: "",
      titleOnly: false,
    };
    pages.push(indexPage);
    const els = Array.from(rootElem.querySelectorAll("h2, h3"));
    let h2Title = "";
    for (const el of els) {
      const section = el.parentElement;
      const level = Number(el.tagName.substring(1)); // h2->2, h3->3
      const id = section.id;
      const title = el.innerText;
      let h3Title = "";
      if (level === 2) {
        h2Title = title;
      } else {
        h3Title = title;
      }
      const filename = `${id}.html`;
      const html = section.outerHTML;
      const titleOnly = section.classList.contains("title-only");
      const page = {
        level,
        id,
        title,
        h2Title,
        h3Title,
        filename,
        html,
        titleOnly,
      };
      pages.push(page);
    }
    console.log(pages);
    return pages;
  }

  combineTitleOnlyPages(pages) {
    // タイトルのみのセクションがある場合、htmlとfilenameを修正
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].titleOnly) {
        for (let j = i + 1; j < pages.length; j++) {
          pages[i].html += pages[j].html; // 最初のタイトルのみのセクションにhtmlをまとめる
          pages[j].html = undefined;
          pages[j].filename = pages[i].filename; // filenameは全部同じにする
          if (!pages[j].titleOnly) {
            i = j;
            break;
          }
        }
      }
    }
  }

  createLinks(pages) {
    const preface = pages.find(p => p.id === "preface");
    const appendix = pages.find(p => p.id === "appendix");
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (page.html === undefined || page.id === 'revision-history') {
        continue;
      }
      page.html = page.html.replaceAll(/「序文」/g, (s) => {
        return `<a href="${preface.filename}">${s}</a>`;
      });
      page.html = page.html.replaceAll(/付録参照/g, (s) => {
        return `<a href="${appendix.filename}">${s}</a>`;
      });
      page.html = page.html.replaceAll(/「([^<>「」]+の章)」([^<>「」項]+)の項/g, (s, p1, p2) => {
        const index = p2.indexOf("、");
        if (index !== -1) {
          p2 = p2.substring(0, index);
        }
        const target = pages.find(p => p.h2Title === p1 && p.h3Title === p2);
        if (target === undefined) {
          console.error(`createLinks: ${s} not found.`);
          return s;
        }
        return `<a href="${target.filename}">${s}</a>`;
      });
      page.html = page.html.replaceAll(/本章の([^<>「」項]+)の項/g, (s, p1) => {
        const index = p1.indexOf("、");
        if (index !== -1) {
          p1 = p1.substring(0, index);
        }
        const target = pages.find(p => p.h2Title === page.h2Title && p.h3Title === p1);
        if (target === undefined) {
          console.error(`createLinks: ${s} not found.`);
          return s;
        }
        return `<a href="${target.filename}">${s}</a>`;
      });
      page.html = page.html.replaceAll(/「([^<>「」]+の章)」で/g, (s, p1) => {
        const target = pages.find(p => p.h2Title === p1 && p.h3Title === "");
        if (target === undefined) {
          console.error(`createLinks: ${s} not found.`);
          return s;
        }
        return `<a href="${target.filename}">「${p1}」</a>で`;
      });
      page.html = page.html.replaceAll(/前項/g, (s) => {
        const target = pages[i - 1];
        return `<a href="${target.filename}">${s}</a>`;
      });
      page.html = page.html.replaceAll(/「(補足　[^<>「」]+)」/g, (s, p1) => {
        const target = pages.find(p => p.h3Title === p1);
        if (target === undefined) {
          console.error(`createLinks: ${s} not found.`);
          return s;
        }
        return `<a href="${target.filename}">${s}</a>`;
      });
    }
  }

  createIntroductionHtml(rootElem) {
    const intro = this.htmlToElem('<div id="introduction"></div>');
    // 最初のsectionの手前までのノードを取り出す
    for (const node of Array.from(rootElem.childNodes)) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "section") {
        break;
      }
      intro.appendChild(node);
    }
    // 末尾の空行は削除
    intro.innerHTML = intro.innerHTML.replace(/(<p[^>]*>&nbsp;<\/p>\n)+$/g, "");
    return intro.outerHTML;
  }

  createTocHtml(pages) {
    const tocNav = document.createElement("nav");
    tocNav.id = "toc";
    const tocUl = document.createElement("ul");
    tocNav.appendChild(tocUl);
    let curUls = [undefined, undefined, tocUl, undefined];
    let curLevel = 2;
    for (const page of pages) {
      if (page.level === 1) {
        continue; // h1は目次にしない
      } else if (page.level === curLevel) {
      } else if (page.level === curLevel + 1) {
        const newUl = document.createElement("ul");
        curUls[curLevel].lastElementChild.appendChild(newUl);
        curUls[page.level] = newUl;
        curLevel = page.level;
      } else if (page.level < curLevel) {
        curLevel = page.level;
      } else {
        throw new Error();
      }
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = page.filename;
      a.id = `toc-${page.id}`;
      a.innerText = page.title;
      li.appendChild(a);
      curUls[curLevel].appendChild(li);
    }
    return tocNav.outerHTML;
  }

  createIndexHtml(introductionHtml, tocHtml, nextPageLinkHtml) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${Shared.bookTitle}</title>
${Builder.canonicalHtml}
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
${Shared.photoCoverHtml}
<div id="website-desc">
本Webサイトは <a href="${Builder.amazonUrl}" target="_blank">書籍『${Shared.bookTitle}』(著:${Shared.author})</a> の内容を著者がWeb公開したものです。
</div>
</header>
<main>
<section class="h1-section" id="index">
<h1>${Shared.bookTitle}</h1>
${introductionHtml}
${tocHtml}
</section>
${nextPageLinkHtml}
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
</body>
</html>
`;
  }

  createNavbarHtml(prevPage, curPage, nextPage) {
    return `<nav id="navbar">
<ul>
<li>
<a href="./">≪&nbsp;先頭ページ</a>
</li>
<li>
<a href="./#toc-${curPage.id}">目次</a>
</li>
<li>
<a href="${
      prevPage.filename === "index.html" ? "./" : prevPage.filename
    }">&lt;&nbsp;前ページ</a>
</li>
<li>
${
  nextPage === undefined
    ? ""
    : `<a href="${nextPage.filename}">次ページ&nbsp;&gt;</a>`
}
</li>
</ul>
</nav>`;
  }

  createNextPageLinkHtml(nextPage) {
    return nextPage === undefined
      ? ""
      : `<a id="next-page" href="${nextPage.filename}">次ページ&nbsp;&gt;&nbsp;${nextPage.title}</a>`;
  }

  createPageHtml(h2Title, h3Title, navbarHtml, contentHtml, nextPageLinkHtml) {
    const title =
      h3Title === ""
        ? `${h2Title} | ${Shared.bookTitle}`
        : `${h2Title}　${h3Title} | ${Shared.bookTitle}`;
    const h2TitleDiv = h3Title === ""
        ? ""
        : `<div class="h2-title">${h2Title}</div>`;
    return `<!DOCTYPE html>
<html lang="ja">
<head>
${Builder.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
${navbarHtml}
<header>
<div class="h1-title">${Shared.bookTitle}</div>
${h2TitleDiv}
</header>
<main>
${contentHtml}
${nextPageLinkHtml}
</main>
<footer>
<div id="copyright">© 2021 SAKAMACHI HIDEYUKI</div>
</footer>
</body>
</html>
`;
  }

  htmlToElem(html) {
    const dummy = document.createElement("div");
    dummy.innerHTML = html;
    return dummy.children[0];
  }
}

document.getElementById("buildButton").addEventListener("click", () => {
  const inputIframe = document.getElementById("inputIframe");
  const inputElem =
    inputIframe.contentWindow.document.querySelector("body>div");
  const inputHtml = inputElem.innerHTML;

  const pages = new Builder().build(inputHtml);

  const outputElem = document.getElementById("outputElem");
  outputElem.innerHTML = "";

  pages
    .filter((page) => page.html !== undefined)
    .forEach((page) => {
      const dataUrl =
        "data:text/html;charset=UTF-8," + encodeURIComponent(page.html);
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = page.filename;
      a.innerText = page.filename;
      p.appendChild(a);
      outputElem.appendChild(p);
    });
});

document.getElementById("saveButton").addEventListener("click", () => {
  const links = document.querySelectorAll("a[download]");
  Array.from(links).forEach((el) => el.click());
});
