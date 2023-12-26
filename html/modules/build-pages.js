import { convertPages } from "./convert-pages.js";
import { linkPages } from "./link-pages.js";
import { renderPages } from "./render-pages.js";
import { splitPages } from "./split-pages.js";

export function buildPages(html) {
  const pages = splitPages(convertPages(html));
  linkPages(pages);
  renderPages(pages);
  return pages;
}
