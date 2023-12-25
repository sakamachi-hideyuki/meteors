import { PageConverter } from "./page-converter.js";
import { PageLinker } from "./page-linker.js";
import { PageRenderer } from "./page-renderer.js";
import { PageSplitter } from "./page-splitter.js";

export class PageBuilder {
  static build(html) {
    const convertedHtml = PageConverter.convert(html);
    const pages = PageSplitter.split(convertedHtml);
    PageLinker.link(pages);
    PageRenderer.render(pages);
    return pages;
  }
}
