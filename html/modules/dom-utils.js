/**
 * 指定ルート要素配下の指定セレクタにマッチする要素とその配下ノードを削除する.
 * @param {Element} rootElem ルート要素
 * @param {string} selector セレクタ文字列
 */
export function removeElemsAndDescendants(rootElem, selector) {
  Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
    el.remove();
  });
}

/**
 * 指定ルート要素配下の指定セレクタにマッチする要素を削除する（配下ノードは残す）.
 * @param {Element} rootElem ルート要素
 * @param {string} selector セレクタ文字列
 */
export function removeElems(rootElem, selector) {
  Array.from(rootElem.querySelectorAll(selector)).forEach((el) => {
    while (el.firstChild) {
      el.parentElement.insertBefore(el.firstChild, el);
    }
    el.remove();
  });
}

/**
 * 指定ルート要素配下の指定のタグ名を変更する.
 * @param {Element} rootElem ルート要素
 * @param {string} oldTagName 変更前のタグ名
 * @param {string} newTagName 変更後のタグ名
 */
export function changeTagNames(rootElem, oldTagName, newTagName) {
  Array.from(rootElem.querySelectorAll(oldTagName)).forEach((oldTag) => {
    const newTag = document.createElement(newTagName);
    while (oldTag.firstChild) {
      newTag.appendChild(oldTag.firstChild);
    }
    oldTag.replaceWith(newTag);
  });
}

/**
 * HTML文字列をElementに変換する.
 * @param {string} html HTML文字列
 * @returns {Element} 変換後のElement
 */
export function htmlToElem(html) {
  const dummy = document.createElement("div");
  dummy.innerHTML = html;
  return dummy.firstElementChild;
}
