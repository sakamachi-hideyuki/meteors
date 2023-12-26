export function validateLinks(html, pages) {
  const oldLinks = getOldLinks(html);
  convertHref(oldLinks, pages);
  const newLinks = getNewLinks(pages);
  validate(oldLinks, newLinks);
}

function getOldLinks(html) {
  const rootElem = document.createElement("div");
  rootElem.innerHTML = html;

  const oldLinks = [];
  rootElem.querySelectorAll("a[href]").forEach((el) => {
    const href = el.getAttribute("href");
    if (!href.startsWith("#") || href.startsWith("#_Toc")) {
      return;
    }
    const link = { href, text: el.innerText };
    oldLinks.push(link);
  });
  return oldLinks;
}

function convertHref(oldLinks, pages) {
  oldLinks.forEach((oldLink) => {
    const anchorName = oldLink.href.substring(1);
    const page = pages.find((p) => p.anchorNames.includes(anchorName));
    if (page === undefined) {
      throw new Error(`page not found. anchorName=${anchorName}`);
    }
    oldLink.href = page.filename;
  });
}

function getNewLinks(pages) {
  const newLinks = [];
  pages.forEach((page) => {
    if (page.contentHtml === "") {
      return;
    }
    const elem = document.createElement("div");
    elem.innerHTML = page.contentHtml;
    elem.querySelectorAll("a[href]").forEach((el) => {
      const href = el.getAttribute("href");
      if (href.startsWith("http")) {
        return;
      }
      const link = { href, text: el.innerText, filename: page.filename };
      newLinks.push(link);
    });
  });
  return newLinks;
}

function validate(oldLinks, newLinks) {
  console.log("oldLinks:");
  console.log(oldLinks);
  console.log("newLinks:");
  console.log(newLinks);
  const len = Math.max(oldLinks.length, newLinks.length);
  for (let i = 0; i < len; i++) {
    const oldLink = oldLinks[i];
    const newLink = newLinks[i];
    if (
      oldLink === undefined ||
      newLink === undefined ||
      oldLink.href !== newLink.href ||
      oldLink.text !== newLink.text
    ) {
      const oldLinkJson = JSON.stringify(oldLink);
      const newLinkJson = JSON.stringify(newLink);
      throw new Error(
        `link unmatch: i=${i} oldLinkJson=${oldLinkJson}, newLinkJson=${newLinkJson}`
      );
    }
  }
}
