class Shared {
  static bookTitle = "流星と昴の日本神話";
  static websiteTitle = this.bookTitle;
  static websiteDescription = "日本神話に星の神・神話は少ないと言われているが、実際は様々な星の神・神話が「見立て」を用いて語られている。";
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

  static photoPleiadesAlt = "からすき星と昴";

  static photoPleiadesCaptionHtml = `${this.photoPleiadesAlt}<br>
${this.pleiadesAttributionHtml}`;

  static photoPleiadesHtml = `
<figure id="photo-pleiades" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-pleiades-web-1024.webp 1024w,
        images/photo-pleiades-web-2048.webp 2048w,
        images/photo-pleiades-web-4096.webp 4096w
      "
    />
    <img
      src="images/photo-pleiades-web-4096.webp"
      width="4096"
      height="2048"
      alt="${this.photoPleiadesAlt}"
    />
  </picture>
  <figcaption>${this.photoPleiadesCaptionHtml}</figcaption>
</figure>
`;

  static titleImageAlt = this.bookTitle;

  static figSubaruAlt = "日本神話に登場する天の川・からすき星・昴";

  static figSubaruCaptionHtml = `${this.figSubaruAlt}<br>
${this.pleiadesAttributionHtml}`;

  static figSubaruHtml = `
<figure id="fig-subaru" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-subaru-web-640.webp 640w,
        images/fig-subaru-web-1280.webp 1280w,
        images/fig-subaru-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-subaru-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSubaruAlt}"
    />
  </picture>
  <figcaption>${this.figSubaruCaptionHtml}</figcaption>
</figure>
`;

  static figSubarunokoAlt = "からすき星と昴から生まれた流星の神";

  static figSubarunokoCaptionHtml = this.figSubarunokoAlt;

  static figSubarunokoHtml = `
<figure id="fig-subarunoko" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-subarunoko-web-640.webp 640w,
        images/fig-subarunoko-web-1280.webp 1280w,
        images/fig-subarunoko-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-subarunoko-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSubarunokoAlt}"
    />
  </picture>
  <figcaption>${this.figSubarunokoCaptionHtml}</figcaption>
</figure>
`;

  static photoMeteorAlt =
    "2020年12月4日14時30分(中部欧州標準時)、ノルウェーのシーボットンで撮影された、おうし座北流星群の火球";

  static photoMeteorCaptionHtml = `${this.photoMeteorAlt}<br>
出典：<a href="http://norskmeteornettverk.no/wordpress/?p=3202" target="_blank">Norsk meteornettverk/Universitetet i Tromsø/Ketil Vegum</a>`;

  static photoMeteorHtml = `
<figure id="photo-meteor" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-meteor-web-640.webp 640w,
        images/photo-meteor-web-1280.webp 1280w,
        images/photo-meteor-web-2560.webp 2560w
      "
    />
    <img
      src="images/photo-meteor-2560-web.webp"
      width="2560"
      height="1689"
      alt="${this.photoMeteorAlt}"
    />
  </picture>
  <figcaption>${this.photoMeteorCaptionHtml}</figcaption>
</figure>
`;

  static figIotsunomisumaruAlt = "素戔嗚尊の剣と五百箇御統";

  static figIotsunomisumaruCaptionHtml = `${this.figIotsunomisumaruAlt}<br>
${this.pleiadesAttributionHtml}`;

  static figIotsunomisumaruHtml = `
<figure id="fig-iotsunomisumaru" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-iotsunomisumaru-web-640.webp 640w,
        images/fig-iotsunomisumaru-web-1280.webp 1280w,
        images/fig-iotsunomisumaru-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-iotsunomisumaru-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figIotsunomisumaruAlt}"
    />
  </picture>
  <figcaption>${this.figIotsunomisumaruCaptionHtml}</figcaption>
</figure>
`;

  static figMilkywayinwinterAlt = "冬の天の川の位置(1月中旬午後20時東京の星空)";

  static figMilkywayinwinterCaptionHtml = `${this.figMilkywayinwinterAlt}<br>
出典：<a href="https://www.nao.ac.jp/gallery/chart-list.html" target="_blank">国立天文台</a>`;

  static figMilkywayinwinterHtml = `
<figure id="fig-milkywayinwinter" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-milkywayinwinter-web-480.webp 480w,
        images/fig-milkywayinwinter-web-960.webp 960w,
        images/fig-milkywayinwinter-web-1920.webp 1920w
      "
    />
    <img
      src="images/fig-milkywayinwinter-web-1920.webp"
      width="1920"
      height="1920"
      alt="${this.figMilkywayinwinterAlt}"
    />
  </picture>
  <figcaption>${this.figMilkywayinwinterCaptionHtml}</figcaption>
</figure>
`;

  static figMilkywayinsummerAlt = "夏の天の川の位置(7月中旬午後21時東京の星空)";

  static figMilkywayinsummerCaptionHtml = `${this.figMilkywayinsummerAlt}<br>
出典：<a href="https://www.nao.ac.jp/gallery/chart-list.html" target="_blank">国立天文台</a>`;

  static figMilkywayinsummerHtml = `
<figure id="fig-milkywayinsummer" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-milkywayinsummer-web-480.webp 480w,
        images/fig-milkywayinsummer-web-960.webp 960w,
        images/fig-milkywayinsummer-web-1920.webp 1920w
      "
    />
    <img
      src="images/fig-milkywayinsummer-web-1920.webp"
      width="1920"
      height="1920"
      alt="${this.figMilkywayinsummerAlt}"
    />
  </picture>
  <figcaption>${this.figMilkywayinsummerCaptionHtml}</figcaption>
</figure>
`;

  static figSummaryHayaAlt = "神名に「ハヤ」が付く神";

  static figSummaryHayaCaptionHtml = this.figSummaryHayaAlt;

  static figSummaryHayaHtml = `
<figure id="fig-summary-haya" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-summary-haya-web-640.webp 640w,
        images/fig-summary-haya-web-1280.webp 1280w,
        images/fig-summary-haya-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-summary-haya-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSummaryHayaAlt}"
    />
  </picture>
  <figcaption>${this.figSummaryHayaCaptionHtml}</figcaption>
</figure>
`;

  static photoTategushiAlt = "是川石器時代遺跡　漆塗り櫛出土状況";

  static photoTategushiCaptionHtml = `${this.photoTategushiAlt}<br>
出典：<a href="https://jomon-japan.jp/archives#/asset/360" target="_blank">JOMON ARCHIVES（八戸市教育委員会撮影）</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>`;

  static photoTategushiHtml = `
<figure id="photo-tategushi" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-tategushi-web-640.webp 640w,
        images/photo-tategushi-web-1280.webp 1280w,
        images/photo-tategushi-web-2560.webp 2560w
      "
    />
    <img
      src="images/photo-tategushi-web-2560.webp"
      width="2560"
      height="1721"
      alt="${this.photoTategushiAlt}"
    />
  </picture>
  <figcaption>${this.photoTategushiCaptionHtml}</figcaption>
</figure>
`;

  static figSummaryKushiAlt = "神名に「クシ」またはその変化が付く神";

  static figSummaryKushiCaptionHtml = this.figSummaryKushiAlt;

  static figSummaryKushiHtml = `
<figure id="fig-summary-kushi" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-summary-kushi-web-640.webp 640w,
        images/fig-summary-kushi-web-1280.webp 1280w,
        images/fig-summary-kushi-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-summary-kushi-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSummaryKushiAlt}"
    />
  </picture>
  <figcaption>${this.figSummaryKushiCaptionHtml}</figcaption>
</figure>
`;

  static photoOgameAlt = "須惠器　大甕";

  static photoOgameCaptionHtml = `${this.photoOgameAlt}<br>
出典：<a href="https://adeac.jp/choshi-city/catalog/mp010261-200010" target="_blank">銚子市デジタルアーカイブ</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>`;

  static photoOgameHtml = `
<figure id="photo-ogame" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-ogame-web-480.webp 480w,
        images/photo-ogame-web-960.webp 960w,
        images/photo-ogame-web-1920.webp 1920w
      "
    />
    <img
      src="images/photo-ogame-web-1920.webp"
      width="1920"
      height="2560"
      alt="${this.photoOgameAlt}"
    />
  </picture>
  <figcaption>${this.photoOgameCaptionHtml}</figcaption>
</figure>
`;

  static figSummaryMikaAlt = "神名に「ミカ」またはその変化が付く神";

  static figSummaryMikaCaptionHtml = this.figSummaryMikaAlt;

  static figSummaryMikaHtml = `
<figure id="fig-summary-mika" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-summary-mika-web-640.webp 640w,
        images/fig-summary-mika-web-1280.webp 1280w,
        images/fig-summary-mika-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-summary-mika-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSummaryMikaAlt}"
    />
  </picture>
  <figcaption>${this.figSummaryMikaCaptionHtml}</figcaption>
</figure>
`;

  static photoMagatamaAlt = "朝日山(1)遺跡　ヒスイ製玉類";

  static photoMagatamaCaptionHtml = `${this.photoMagatamaAlt}<br>
出典：<a href="https://jomon-japan.jp/archives#/asset/504" target="_blank">JOMON ARCHIVES（青森県埋蔵文化財調査センター所蔵、田中義道撮影）</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>`;

  static photoMagatamaHtml = `
<figure id="photo-magatama" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-magatama-web-640.webp 640w,
        images/photo-magatama-web-1280.webp 1280w,
        images/photo-magatama-web-2560.webp 2560w
      "
    />
    <img
      src="images/photo-magatama-web-2560.webp"
      width="2560"
      height="1714"
      alt="${this.photoMagatamaAlt}"
    />
  </picture>
  <figcaption>${this.photoMagatamaCaptionHtml}</figcaption>
</figure>
`;

  static figIotsuiwamuraAlt = "伊奘諾尊の剣と五百箇磐石";

  static figIotsuiwamuraCaptionHtml = `${this.figIotsuiwamuraAlt}<br>
${this.pleiadesAttributionHtml}`;

  static figIotsuiwamuraHtml = `
<figure id="fig-iotsuiwamura" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-iotsuiwamura-web-640.webp 640w,
        images/fig-iotsuiwamura-web-1280.webp 1280w,
        images/fig-iotsuiwamura-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-iotsuiwamura-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figIotsuiwamuraAlt}"
    />
  </picture>
  <figcaption>${this.figIotsuiwamuraCaptionHtml}</figcaption>
</figure>
`;

  static figAmanoiwatoAlt = "伊奘諾尊の剣の神と天岩戸";

  static figAmanoiwatoCaptionHtml = `${this.figAmanoiwatoAlt}<br>
${this.pleiadesAttributionHtml}`;

  static figAmanoiwatoHtml = `
<figure id="fig-amanoiwato" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-amanoiwato-web-640.webp 640w,
        images/fig-amanoiwato-web-1280.webp 1280w,
        images/fig-amanoiwato-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-amanoiwato-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figAmanoiwatoAlt}"
    />
  </picture>
  <figcaption>${this.figAmanoiwatoCaptionHtml}</figcaption>
</figure>
`;

  static figAmanoyachimataAlt = "アマノヤチマタと天岩戸";

  static figAmanoyachimataCaptionHtml = `${this.figAmanoyachimataAlt}<br>
${this.pleiadesAttributionHtml}`;

  static figAmanoyachimataHtml = `
<figure id="fig-amanoyachimata" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-amanoyachimata-web-640.webp 640w,
        images/fig-amanoyachimata-web-1280.webp 1280w,
        images/fig-amanoyachimata-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-amanoyachimata-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figAmanoyachimataAlt}"
    />
  </picture>
  <figcaption>${this.figAmanoyachimataCaptionHtml}</figcaption>
</figure>
`;

  static figSummaryTamaAlt = "神名に「玉」が付く神";

  static figSummaryTamaCaptionHtml = this.figSummaryTamaAlt;

  static figSummaryTamaHtml = `
<figure id="fig-summary-tama" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-summary-tama-web-640.webp 640w,
        images/fig-summary-tama-web-1280.webp 1280w,
        images/fig-summary-tama-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-summary-tama-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSummaryTamaAlt}"
    />
  </picture>
  <figcaption>${this.figSummaryTamaCaptionHtml}</figcaption>
</figure>
`;

  static photoOtomatsuriAlt = "新宮の御燈祭";

  static photoOtomatsuriCaptionHtml = `${this.photoOtomatsuriAlt} © panpanzupan<br>
出典：<a href="https://find47.jp/ja/i/t5MU6" target="_blank">FIND/47</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>`;

  static photoOtomatsuriHtml = `
<figure id="photo-otomatsuri" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-otomatsuri-web-640.webp 640w,
        images/photo-otomatsuri-web-1280.webp 1280w,
        images/photo-otomatsuri-web-2560.webp 2560w
      "
    />
    <img
      src="images/photo-otomatsuri-web-2560.webp"
      width="2560"
      height="1704"
      alt="${this.photoOtomatsuriAlt}"
    />
  </picture>
  <figcaption>${this.photoOtomatsuriCaptionHtml}</figcaption>
</figure>
`;

  static figSummaryHiAlt = "神名に「乙類のヒ」「ホ」が付く神";

  static figSummaryHiCaptionHtml = this.figSummaryHiAlt;

  static figSummaryHiHtml = `
<figure id="fig-summary-hi" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-summary-hi-web-640.webp 640w,
        images/fig-summary-hi-web-1280.webp 1280w,
        images/fig-summary-hi-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-summary-hi-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSummaryHiAlt}"
    />
  </picture>
  <figcaption>${this.figSummaryHiCaptionHtml}</figcaption>
</figure>
`;

  static photoIwakuraAlt = "神谷磐座";

  static photoIwakuraCaptionHtml = `${this.photoIwakuraAlt} © rikky_photography<br>
出典：<a href="https://find47.jp/ja/i/o0gM4" target="_blank">FIND/47</a><br>
Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>`;

  static photoIwakuraHtml = `
<figure id="photo-iwakura" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/photo-iwakura-web-640.webp 640w,
        images/photo-iwakura-web-1280.webp 1280w,
        images/photo-iwakura-web-2560.webp 2560w
      "
    />
    <img
      src="images/photo-iwakura-web-2560.webp"
      width="2560"
      height="1707"
      alt="${this.photoIwakuraAlt}"
    />
  </picture>
  <figcaption>${this.photoIwakuraCaptionHtml}</figcaption>
</figure>
`;

  static figSummaryIshiAlt = "神名に「イシ」「イワ」またはその変化が付く神";

  static figSummaryIshiCaptionHtml = this.figSummaryIshiAlt;

  static figSummaryIshiHtml = `
<figure id="fig-summary-ishi" class="image-and-caption">
  <picture>
    <source
      srcset="
        images/fig-summary-ishi-web-640.webp 640w,
        images/fig-summary-ishi-web-1280.webp 1280w,
        images/fig-summary-ishi-web-2560.webp 2560w
      "
    />
    <img
      src="images/fig-summary-ishi-web-2560.webp"
      width="2560"
      height="1706"
      alt="${this.figSummaryIshiAlt}"
    />
  </picture>
  <figcaption>${this.figSummaryIshiCaptionHtml}</figcaption>
</figure>
`;

  static altToHtml = {
    [Shared.photoPleiadesAlt]: "",
    [Shared.titleImageAlt]: "",
    [Shared.figSubaruAlt]: Shared.figSubaruHtml,
    [Shared.figSubarunokoAlt]: Shared.figSubarunokoHtml,
    [Shared.photoMeteorAlt]: "",
    [Shared.figIotsunomisumaruAlt]: Shared.figIotsunomisumaruHtml,
    [Shared.figMilkywayinwinterAlt]: Shared.figMilkywayinwinterHtml,
    [Shared.figMilkywayinsummerAlt]: Shared.figMilkywayinsummerHtml,
    [Shared.figSummaryHayaAlt]: Shared.figSummaryHayaHtml,
    [Shared.photoTategushiAlt]: "",
    [Shared.figSummaryKushiAlt]: Shared.figSummaryKushiHtml,
    [Shared.photoOgameAlt]: "",
    [Shared.figSummaryMikaAlt]: Shared.figSummaryMikaHtml,
    [Shared.photoMagatamaAlt]: "",
    [Shared.figIotsuiwamuraAlt]: Shared.figIotsuiwamuraHtml,
    [Shared.figAmanoiwatoAlt]: Shared.figAmanoiwatoHtml,
    [Shared.figAmanoyachimataAlt]: Shared.figAmanoyachimataHtml,
    [Shared.figSummaryTamaAlt]: Shared.figSummaryTamaHtml,
    [Shared.photoOtomatsuriAlt]: "",
    [Shared.figSummaryHiAlt]: Shared.figSummaryHiHtml,
    [Shared.photoIwakuraAlt]: "",
    [Shared.figSummaryIshiAlt]: Shared.figSummaryIshiHtml,
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
