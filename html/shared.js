class Shared {
  static bookTitle = "流星と昴の日本神話";
  static websiteTitle = this.bookTitle;
  static websiteDescription = "日本神話に星の神・神話は少ないと言われているが、実際は星が付く名の神社は多く、日本神話では様々な星の神・神話が「見立て」を用いて語られている。";
  static websiteUrl = "https://sakamachi-hideyuki.github.io/meteors/";
  static websiteImage = `${Shared.websiteUrl}images/photo-pleiades-web.webp`;

  static googleAnalyticsHtml = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-45DHNXBNFZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-45DHNXBNFZ');
</script>
`;

  static pleiadesAttributionHtml = `Adapted from <a href="https://commons.wikimedia.org/wiki/File:Orion,_Taurus_and_Pleiades.jpg" target="_blank">"Orion, Taurus and Pleiades"</a><br>
by Panda~thwiki, used under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>`;

  static photoPleiadesAlt = "オリオン座、おうし座、昴";

  static photoPleiadesWebHtml = `
<figure id="photo-pleiades" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-pleiades-web-small.webp">
  <img src="images/photo-pleiades-web.webp" width="1920" height="960" alt="${this.photoPleiadesAlt}">
</picture>
<figcaption>${this.photoPleiadesAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static photoPleiadesEbookHtml = `
<figure id="photo-pleiades" class="image-and-caption">
<img src="dark100-light100contrast100x2.png" width="1280" height="853" alt="${this.photoPleiadesAlt}">
<figcaption>${this.photoPleiadesAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static titleImageAlt = this.bookTitle;

  static photoMeteorAlt =
    "2020年12月4日14時30分(中央ヨーロッパ時間)、ノルウェーのシーボットンで撮影された、おうし座北流星群の火球";

  static photoMeteorHtml = `
<figure id="photo-meteor" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-meteor-web-small.webp">
  <img src="images/photo-meteor-web.webp" width="1280" height="845" alt="${this.photoMeteorAlt}">
</picture>
<figcaption>${this.photoMeteorAlt}<br>
出典：<a href="http://norskmeteornettverk.no/wordpress/?p=3202" target="_blank">Norsk meteornettverk/Universitetet i Tromsø/Ketil Vegum</a></figcaption>
</figure>
`;

  static figUkeiAlt = "素戔嗚尊の剣と五百箇御統";

  static figUkeiHtml = `
<figure id="fig-ukei" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/fig-ukei-web-small.webp">
  <img src="images/fig-ukei-web.webp" width="1280" height="800" alt="${this.figUkeiAlt}">
</picture>
<figcaption>${this.figUkeiAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static figMilkywayinwinterAlt = "冬の天の川の位置(1月中旬午後20時東京の星空)";

  static figMilkywayinwinterHtml = `
<figure id="fig-milkywayinwinter" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/fig-milkywayinwinter-web-small.webp">
  <img src="images/fig-milkywayinwinter-web.webp" width="1920" height="1920" alt="${this.figMilkywayinwinterAlt}">
</picture>
<figcaption>${this.figMilkywayinwinterAlt}<br>
出典：<a href="https://www.nao.ac.jp/gallery/chart-list.html" target="_blank">国立天文台</a></figcaption>
</figure>
`;

  static figMilkywayinsummerAlt = "夏の天の川の位置(7月中旬午後21時東京の星空)";

  static figMilkywayinsummerHtml = `
<figure id="fig-milkywayinsummer" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/fig-milkywayinsummer-web-small.webp">
  <img src="images/fig-milkywayinsummer-web.webp" width="1920" height="1920" alt="${this.figMilkywayinsummerAlt}">
</picture>
<figcaption>${this.figMilkywayinsummerAlt}<br>
出典：<a href="https://www.nao.ac.jp/gallery/chart-list.html" target="_blank">国立天文台</a></figcaption>
</figure>
`;

  static photoTategushiAlt = "是川石器時代遺跡　漆塗り櫛出土状況";

  static photoTategushiHtml = `
<figure id="photo-tategushi" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-tategushi-web-small.webp">
  <img src="images/photo-tategushi-web.webp" width="1280" height="860" alt="${this.photoTategushiAlt}">
</picture>
<figcaption>${this.photoTategushiAlt}<br>
出典：<a href="https://jomon-japan.jp/archives#/asset/360" target="_blank">JOMON ARCHIVES（八戸市教育委員会撮影）</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></figcaption>
</figure>
`;

  static photoOgameAlt = "須惠器　大甕";

  static photoOgameHtml = `
<figure id="photo-ogame" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-ogame-web-small.webp">
  <img src="images/photo-ogame-web.webp" width="960" height="1280" alt="${this.photoOgameAlt}">
</picture>
<figcaption>${this.photoOgameAlt}<br>
出典：<a href="https://adeac.jp/choshi-city/catalog/mp010261-200010" target="_blank">銚子市／銚子市デジタルアーカイブ</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></figcaption>
</figure>
`;

  static photoMagatamaAlt = "朝日山(1)遺跡　ヒスイ製玉類";

  static photoMagatamaHtml = `
<figure id="photo-magatama" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-magatama-web-small.webp">
  <img src="images/photo-magatama-web.webp" width="1280" height="857" alt="${this.photoMagatamaAlt}">
</picture>
<figcaption>${this.photoMagatamaAlt}<br>
出典：<a href="https://jomon-japan.jp/archives#/asset/504" target="_blank">JOMON ARCHIVES（青森県埋蔵文化財調査センター所蔵、田中義道撮影）</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></figcaption>
</figure>
`;

  static figIzanaginotsurugiAlt = "伊奘諾尊の剣と五百箇磐石・天岩戸";

  static figIzanaginotsurugiHtml = `
<figure id="fig-izanakinotsurugi" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/fig-izanakinotsurugi-web-small.webp">
  <img src="images/fig-izanakinotsurugi-web.webp" width="1280" height="800" alt="${this.figIzanaginotsurugiAlt}">
</picture>
<figcaption>${this.figIzanaginotsurugiAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static figAmanoyachimataAlt = "アマノヤチマタと天岩戸";

  static figAmanoyachimataHtml = `
<figure id="fig-amanoyachimata" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/fig-amanoyachimata-web-small.webp">
  <img src="images/fig-amanoyachimata-web.webp" width="1280" height="800" alt="${this.figAmanoyachimataAlt}">
</picture>
<figcaption>${this.figAmanoyachimataAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static photoOtomatsuriAlt = "新宮の御燈祭";

  static photoOtomatsuriHtml = `
<figure id="photo-otomatsuri" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-otomatsuri-web-small.webp">
  <img src="images/photo-otomatsuri-web.webp" width="1280" height="852" alt="${this.photoOtomatsuriAlt}">
</picture>
<figcaption>${this.photoOtomatsuriAlt} © panpanzupan<br>
出典：<a href="https://find47.jp/ja/i/t5MU6" target="_blank">FIND/47</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></figcaption>
</figure>
`;

  static photoIwakuraAlt = "神谷磐座";

  static photoIwakuraHtml = `
<figure id="photo-iwakura" class="image-and-caption">
<picture>
  <source media="(max-width: 640px)" srcset="images/photo-iwakura-web-small.webp">
  <img src="images/photo-iwakura-web.webp" width="1280" height="853" alt="${this.photoIwakuraAlt}">
</picture>
<figcaption>${this.photoIwakuraAlt} © rikky_photography<br>
出典：<a href="https://find47.jp/ja/i/o0gM4" target="_blank">FIND/47</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></figcaption>
</figure>
`;

  static altToHtml = {
    [Shared.photoPleiadesAlt]: "",
    [Shared.titleImageAlt]: "",
    [Shared.photoMeteorAlt]: "",
    [Shared.figUkeiAlt]: Shared.figUkeiHtml,
    [Shared.figMilkywayinwinterAlt]: Shared.figMilkywayinwinterHtml,
    [Shared.figMilkywayinsummerAlt]: Shared.figMilkywayinsummerHtml,
    [Shared.photoTategushiAlt]: "",
    [Shared.photoOgameAlt]: "",
    [Shared.photoMagatamaAlt]: "",
    [Shared.figIzanaginotsurugiAlt]: Shared.figIzanaginotsurugiHtml,
    [Shared.figAmanoyachimataAlt]: Shared.figAmanoyachimataHtml,
    [Shared.photoOtomatsuriAlt]: "",
    [Shared.photoIwakuraAlt]: "",
  };

  static pageIdToHtml = {
    "chapter-of-haya": Shared.photoMeteorHtml,
    "chapter-of-kushi": Shared.photoTategushiHtml,
    "chapter-of-mika": Shared.photoOgameHtml,
    "chapter-of-tama": Shared.photoMagatamaHtml,
    "chapter-of-hi": Shared.photoOtomatsuriHtml,
    "chapter-of-ishi": Shared.photoIwakuraHtml,
  };
}
