export function removeElemsAndDescendants(rootElem, selector) {
  Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
    el.remove();
  });
}

export function removeElems(rootElem, selector) {
  Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
    while (el.firstChild) {
      el.parentElement.insertBefore(el.firstChild, el);
    }
    el.remove();
  });
}

export function removeBlankLines(rootElem) {
  rootElem.innerHTML = rootElem.innerHTML.replace(/\n+/g, "\n");
}

export function changeTagNames(rootElem, oldTagName, newTagName) {
  Array.from(rootElem.querySelectorAll(oldTagName)).forEach((oldTag) => {
    const newTag = document.createElement(newTagName);
    while (oldTag.firstChild) {
      newTag.appendChild(oldTag.firstChild);
    }
    oldTag.replaceWith(newTag);
  });
}

export function htmlToElem(html) {
  const dummy = document.createElement("div");
  dummy.innerHTML = html;
  return dummy.firstElementChild;
}
