import { convertPages } from "./convert-pages.js";
import { linkPages } from "./link-pages.js";
import { renderPages } from "./render-pages.js";
import { splitPages } from "./split-pages.js";

export function buildPages(html) {
  const convertedHtml = convertPages(html);
  const pages = splitPages(convertedHtml);
  linkPages(pages);
  renderPages(pages);
  return pages;
}
