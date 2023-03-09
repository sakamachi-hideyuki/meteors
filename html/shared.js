class Shared {
  static bookTitle = "流星と昴の日本神話";

  static author = "坂町英之";

  static pleiadesAttributionHtml = `This photo is adapted from <a href="https://commons.wikimedia.org/wiki/File:Orion,_Taurus_and_Pleiades.jpg" target="_blank">"Orion, Taurus and Pleiades"</a><br>
by Panda~thwiki, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">used under CC BY 4.0</a>`;

  static photoCoverAlt = `${this.bookTitle}　${this.author}`;

  static photoPleiadesAlt = "写真：オリオン座、おうし座、昴";

  static photoCoverHtml = `
<figure id="cover" class="image-and-caption">
<img src="images/cover-web.jpg" alt="${this.photoCoverAlt}">
<figcaption>${this.photoPleiadesAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static titleImageAlt = this.bookTitle;

  static photoMeteorAlt =
    "2020年12月4日14時30分(中央ヨーロッパ時間)、ノルウェーのシーボットンで撮影された、おうし座北流星群の火球";

  static photoMeteorHtml = `
<figure id="photo-meteor" class="image-and-caption">
<img src="images/photo-meteor-web.jpg" alt="${this.photoMeteorAlt}">
<figcaption>${this.photoMeteorAlt}<br>
出典：<a href="http://norskmeteornettverk.no/wordpress/?p=3202" target="_blank">Norsk meteornettverk/Universitetet i Tromsø/Ketil Vegum</a></figcaption>
</figure>
`;

  static figUkeiAlt = "蛇韓鋤之剣と五百箇御統";

  static figUkeiHtml = `
<figure id="fig-ukei" class="image-and-caption">
<img src="images/fig-ukei-web.jpg" alt="${this.figUkeiAlt}">
<figcaption>${this.figUkeiAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static photoTategushiAlt = "是川石器時代遺跡　漆塗り櫛出土状況";

  static photoTategushiHtml = `
<figure id="photo-tategushi" class="image-and-caption">
<img src="images/photo-tategushi-web.jpg" alt="${this.photoTategushiAlt}">
<figcaption>${this.photoTategushiAlt}<br>
出典：<a href="https://jomon-japan.jp/archives#/asset/360" target="_blank">JOMON ARCHIVES（八戸市教育委員会撮影）</a><br>
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Licensed under CC BY 4.0</a></figcaption>
</figure>
`;

  static photoOgameAlt = "須惠器　大甕";

  static photoOgameHtml = `
<figure id="photo-ogame" class="image-and-caption">
<img src="images/photo-ogame-web.jpg" alt="${this.photoOgameAlt}">
<figcaption>${this.photoOgameAlt}<br>
出典：<a href="https://adeac.jp/choshi-city/catalog/mp010261-200010" target="_blank">銚子市／銚子市デジタルアーカイブ</a><br>
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Licensed under CC BY 4.0</a></figcaption>
</figure>
`;

  static photoMagatamaAlt = "朝日山(1)遺跡　ヒスイ製玉類";

  static photoMagatamaHtml = `
<figure id="photo-magatama" class="image-and-caption">
<img src="images/photo-magatama-web.jpg" alt="${this.photoMagatamaAlt}">
<figcaption>${this.photoMagatamaAlt}<br>
出典：<a href="https://jomon-japan.jp/archives#/asset/504" target="_blank">JOMON ARCHIVES（青森県埋蔵文化財調査センター所蔵、田中義道撮影）</a><br>
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Licensed under CC BY 4.0</a></figcaption>
</figure>
`;

  static figIzanaginotsurugiAlt = "伊奘諾尊の剣と五百箇磐石・天岩戸";

  static figIzanaginotsurugiHtml = `
<figure id="fig-izanakinotsurugi" class="image-and-caption">
<img src="images/fig-izanakinotsurugi-web.jpg" alt="${this.figIzanaginotsurugiAlt}">
<figcaption>${this.figIzanaginotsurugiAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static figAmanoyachimataAlt = "アマノヤチマタと天岩戸";

  static figAmanoyachimataHtml = `
<figure id="fig-amanoyachimata" class="image-and-caption">
<img src="images/fig-amanoyachimata-web.jpg" alt="${this.figAmanoyachimataAlt}">
<figcaption>${this.figAmanoyachimataAlt}<br>
${this.pleiadesAttributionHtml}</figcaption>
</figure>
`;

  static photoOtomatsuriAlt = "新宮の御燈祭";

  static photoOtomatsuriHtml = `
<figure id="photo-otomatsuri" class="image-and-caption">
<img src="images/photo-otomatsuri-web.jpg" alt="${this.photoOtomatsuriAlt}">
<figcaption>${this.photoOtomatsuriAlt} © panpanzupan<br>
出典：<a href="https://find47.jp/ja/i/t5MU6" target="_blank">FIND/47</a><br>
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Licensed under CC BY 4.0</a></figcaption>
</figure>
`;

  static photoIwakuraAlt = "神谷磐座";

  static photoIwakuraHtml = `
<figure id="photo-iwakura" class="image-and-caption">
<img src="images/photo-iwakura-web.jpg" alt="${this.photoIwakuraAlt}">
<figcaption>${this.photoIwakuraAlt} © rikky_photography<br>
出典：<a href="https://find47.jp/ja/i/o0gM4" target="_blank">FIND/47</a><br>
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Licensed under CC BY 4.0</a></figcaption>
</figure>
`;

  static altToHtml = {
    [Shared.photoPleiadesAlt]: "",
    [Shared.titleImageAlt]: "",
    [Shared.photoMeteorAlt]: Shared.photoMeteorHtml,
    [Shared.figUkeiAlt]: Shared.figUkeiHtml,
    [Shared.photoTategushiAlt]: Shared.photoTategushiHtml,
    [Shared.photoOgameAlt]: Shared.photoOgameHtml,
    [Shared.photoMagatamaAlt]: Shared.photoMagatamaHtml,
    [Shared.figIzanaginotsurugiAlt]: Shared.figIzanaginotsurugiHtml,
    [Shared.figAmanoyachimataAlt]: Shared.figAmanoyachimataHtml,
    [Shared.photoOtomatsuriAlt]: Shared.photoOtomatsuriHtml,
    [Shared.photoIwakuraAlt]: Shared.photoIwakuraHtml,
  };
}
