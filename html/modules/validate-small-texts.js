// smallスタイルにするテキストの一覧
const smallTexts = [
  "（『角川古語大辞典』角川書店）",
  "（『古語大辞典』小学館）",
  "（『時代別国語大辞典　上代編』三省堂）",
  "（『大漢和辞典　修訂第二版』大修館書店）",
  "（『日本国語大辞典　第二版』小学館）",
];

/**
 * smallスタイルにするテキストの検証を行う.
 * エラーがあれば例外をスローする.
 * @param {Array} pages ページデータ配列
 * @throws {Error} 関連ページへのリンクが関連ページより前のHTMLに存在する場合
 */
export function validateSmallTexts(pages) {
  const errors = pages.map((p) => validatePage(p)).reduce((a, c) => a + c, 0);
  if (errors !== 0) {
    throw new Error(`smallエラー: ${errors} 件`);
  }
}

/**
 * 指定ページのsmallスタイルにするテキストを検証する.
 * @param {Object} page ページデータ
 * @returns {number} エラー件数
 */
function validatePage(page) {
  let errorCount = validateSmallSpanContents(page);
  smallTexts.forEach((smallText) => {
    const isValid = validateSmallSpan(page, smallText);
    if (!isValid) {
      errorCount++;
    }
  });
  return errorCount;
}

/**
 * 指定のページのHTML中で<span class="small">と</span>に囲まれているテキストが全てsmallTextsに含まれているかを検証する.
 * smallTextsに含まれていないテキストが見つかった場合はエラーメッセージをコンソールに出力する.
 * @param {Object} page ページデータ
 * @returns {number} エラー件数
 */
function validateSmallSpanContents(page) {
  let errorCount = 0;
  const html = page.contentHtml;

  // <span class="small">...</span> パターンにマッチするすべてのテキストを取得
  const pattern = /<span class="small">([^<]+)<\/span>/g;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    const foundText = match[1];

    // foundTextがsmallTextsに含まれているかチェック
    if (!smallTexts.includes(foundText)) {
      console.error(
        `${page.filename} ${page.title}: <span class="small">に含まれているテキスト "${foundText}" がsmallTextsに含まれていません`,
      );
      errorCount++;
    }
  }

  return errorCount;
}

/**
 * 指定のページのHTML中の指定のsmallTextの前に<span class="small">があり、後に</span>があるか検証する.
 * smallTextがHTML中に全くない場合は正常とし、存在する場合は<span class="small">で正しく囲まれているか検証する.
 * 複数含まれている場合もすべてが正しく囲まれているか検証する.
 * 存在するのに囲まれていない場合はエラーメッセージをコンソールに出力する.
 * @param {Object} page ページデータ
 * @param {string} smallText 検証対象のsmallテキスト
 * @returns {boolean} 検証結果（true: 正常、false: エラーあり）
 */
function validateSmallSpan(page, smallText) {
  const html = page.contentHtml;

  // smallTextが出現する全回数を数える
  const pattern = new RegExp(smallText, "g");
  const totalMatches = html.match(pattern)?.length ?? 0;
  if (totalMatches === 0) {
    return true; // テキストが存在しないので正常
  }

  // <span class="small">テキスト</span> の形式で囲まれているすべてのテキストを取得
  const patternInSpan = new RegExp(
    `<span class="small">${smallText}</span>`,
    "g",
  );
  const matchedInSpan = html.match(patternInSpan)?.length ?? 0;

  // すべてのsmallTextが<span class="small">で囲まれているかチェック
  const isValid = totalMatches === matchedInSpan;

  if (!isValid) {
    console.error(
      `${page.filename} ${page.title}: "${smallText}" が正しく<span class="small">で囲まれていません`,
    );
  }

  return isValid;
}
