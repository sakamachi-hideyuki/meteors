const websiteUrl = "https://sakamachi-hideyuki.github.io/meteors/";

/**
 * head要素をレンダリングする.
 * @param {string} title ページのタイトル
 * @param {string} descText ページの説明文
 * @param {string} filename ページのファイル名
 * @returns {string} レンダリング結果のHTML文字列
 */
export const renderHead = (title, descText, filename) => `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      http-equiv="Content-Security-Policy"
      content="
        script-src 'self' https://*.googletagmanager.com;
        img-src 'self' https://*.google-analytics.com https://*.googletagmanager.com;
        connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
        style-src 'self' 'sha256-+9+6y2OyIeRrO4dSTJt/awKsfEc/P47u6msFCxf+gFM=';
      "
    />
    <title>${title}</title>
    <script src="google-analytics.js"></script>
    <style>html{visibility:hidden}</style>
    <link rel="stylesheet" href="style.css" />
${
  descText === "" ? "" : `    <meta name="description" content="${descText}" />`
}
${
  filename === "index.html"
    ? `    <link rel="canonical" href="${websiteUrl}" />`
    : ""
}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:url" content="${websiteUrl}${
      filename === "index.html" ? "" : filename
    }" />
    <meta property="og:image" content="${websiteUrl}images/photo-pleiades-web.webp" />
    <meta property="og:site_name" content="${Shared.websiteTitle}" />
    <meta property="og:title" content="${title}" />
${
  descText === ""
    ? ""
    : `    <meta property="og:description" content="${descText}" />`
}
    <meta name="format-detection" content="address=no, date=no, email=no, telephone=no" />
`;
// CSP(Content Security Policy)のstyle-srcで指定しているハッシュ値は
// FOUC(Flash of unstyled content)を防ぐためのインラインスタイル
// html{visibility:hidden}
// のSHA-256 Base64エンコードでのハッシュ値。
