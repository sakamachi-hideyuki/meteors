export const renderHead = (title, descText, url) =>
  `${Shared.googleAnalyticsHtml}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${descText === "" ? "" : `<meta name="description" content="${descText}">`}
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${Shared.websiteImage}">
<meta property="og:site_name" content="${Shared.websiteTitle}">
<meta property="og:title" content="${title}">
${
  descText === ""
    ? ""
    : `<meta property="og:description" content="${descText}">`
}
<meta name="format-detection" content="address=no, date=no, email=no, telephone=no">
<style>
/* FOUC(Flash of unstyled content)対策 */
html {
  visibility: hidden;
}
</style>
<link rel="stylesheet" href="style.css">`;
