export class DomUtils {
  static removeElemsAndDescendants(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      el.remove();
    });
  }

  static removeElems(rootElem, selector) {
    Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
      while (el.firstChild) {
        el.parentElement.insertBefore(el.firstChild, el);
      }
      el.remove();
    });
  }

  static removeBlankLines(rootElem) {
    rootElem.innerHTML = rootElem.innerHTML.replace(/\n+/g, "\n");
  }

  static changeTagNames(rootElem, oldTagName, newTagName) {
    Array.from(rootElem.querySelectorAll(oldTagName)).forEach((oldTag) => {
      const newTag = document.createElement(newTagName);
      while (oldTag.firstChild) {
        newTag.appendChild(oldTag.firstChild);
      }
      oldTag.replaceWith(newTag);
    });
  }

  static htmlToElem(html) {
    const dummy = document.createElement("div");
    dummy.innerHTML = html;
    return dummy.children[0];
  }
}
