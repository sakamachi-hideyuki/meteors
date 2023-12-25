export class LinkValidator {
  static validate(html, pages) {
    const oldLinks = this.#getOldLinks(html);
    this.#convertHref(oldLinks, pages);
    const newLinks = this.#getNewLinks(pages);
    this.#validateLinks(oldLinks, newLinks);
  }

  static #getOldLinks(html) {
    const rootElem = document.createElement("div");
    rootElem.innerHTML = html;

    const oldLinks = [];
    Array.from(rootElem.querySelectorAll("a[href]")).forEach((el) => {
      const href = el.getAttribute("href");
      if (!href.startsWith("#") || href.startsWith("#_Toc")) {
        return;
      }
      const link = { href, text: el.innerText };
      oldLinks.push(link);
    });
    return oldLinks;
  }

  static #convertHref(oldLinks, pages) {
    oldLinks.forEach((oldLink) => {
      const anchorName = oldLink.href.substring(1);
      const page = pages.find((p) => p.anchorNames.includes(anchorName));
      if (page === undefined) {
        throw new Error(`page not found. anchorName=${anchorName}`);
      }
      oldLink.href = page.filename;
    });
  }

  static #getNewLinks(pages) {
    const newLinks = [];
    pages.forEach((page) => {
      if (page.contentHtml === "") {
        return;
      }
      const elem = document.createElement("div");
      elem.innerHTML = page.contentHtml;
      Array.from(elem.querySelectorAll("a[href]")).forEach((el) => {
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

  static #validateLinks(oldLinks, newLinks) {
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
}
