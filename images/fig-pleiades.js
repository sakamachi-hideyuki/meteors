class FigPleiades {
  static baseHtml = `
    <style>
      body {
        background-color: #f00;
        font-size: 0;
        margin: 0;
      }
      img {
        filter: brightness(55%) contrast(300%) saturate(0) invert(1);
      }
      #milkyway-container {
        overflow: hidden;

        position: absolute;
        left: 0;
        top: 0;
        width: 2560px;
        height: 800px;
      }
      #milkyway {
        background: linear-gradient(#666, #fff);
        opacity: 0.5;
        transform: rotate(-30deg);
        transform-origin: left bottom;

        position: absolute;
        left: 0;
        top: 0;
        width: 2560px;
        height: 800px;
      }
      #text > div {
        color: #000;
        font-family: serif;
        font-size: 60px;
        font-weight: bold;
        position: absolute;
        text-align: center;
        white-space: nowrap;
      }
      u {
        text-decoration-thickness: 2px;
        text-underline-offset: 20px;
      }
      #bubble > div {
        color: #000;
        font-family: serif;
        font-size: 80px;
        font-weight: bold;
        padding: 40px 50px 20px 50px;
        position: absolute;
        white-space: nowrap;
      }
      svg {
        position: absolute;
        left: 0;
        top: 0;
      }
      svg rect {
        stroke: #000;
        stroke-width: 2;
      }
      svg line {
        stroke: #000;
        stroke-width: 2;
      }
    </style>
    <img src="../photo-pleiades/Orion_Taurus_and_Pleiades.png" width="2560" height="1706">
    <div id="milkyway-container">
      <div id="milkyway"></div>
    </div>
    <div id="text">
      <div style="left: 550px; top: 50px;">天の川</div>

      <div style="left: 450px; top: 300px;"><u>オリオン座</u></div>
      <div style="left: 50px; top: 520px;">ベテルギウス</div>
      <div style="left: 90px; top: 850px;">三つ星<br>（からすき星）</div>
      <div style="left: 500px; top: 1190px;">小三つ星</div>
      <div style="left: 700px; top: 1390px;">リゲル</div>

      <div style="left: 1600px; top: 100px;"><u>おうし座</u></div>
      <div style="left: 1280px; top: 390px;">アルデバラン</div>
      <div style="left: 1880px; top: 320px;">プレアデス星団<br>（<ruby>昴<rp>(</rp><rt>すばる</rt><rp>)</rp></ruby>）
      </div>
    </div>`;

  static figAmanoiwatoContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <!-- 全体の枠 -->
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <!-- からすき星と昴を結ぶ線 -->
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <!-- 天の川とふきだしを結ぶ線 -->
      <line
        x1="750"
        y1="120"
        x2="900"
        y2="200"
      />
      <!-- からすき星とふきだしを結ぶ線 -->
      <line
        x1="600"
        y1="1080"
        x2="1000"
        y2="1280"
      />
      <!-- 昴とふきだしを結ぶ線 -->
      <line
        x1="1940"
        y1="500"
        x2="1760"
        y2="700"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 150px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby><ruby>伊都之尾羽張<rp>(</rp><rt>イツノオハバリ</rt><rp>)</rp></ruby>神
      </div>
      <div style="left: 1500px; top: 700px">
        <ruby>天岩戸<rp>(</rp><rt>あまのいわと</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figAmanoyachimataContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <!-- 全体の枠 -->
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <!-- からすき星と昴を結ぶ線 -->
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <line
        x1="375"
        y1="0"
        x2="530"
        y2="1035"
      />
      <line
        x1="530"
        y1="1035"
        x2="750"
        y2="1706"
      />
      <line
        x1="900"
        y1="0"
        x2="290"
        y2="1706"
      />
      <line
        x1="1410"
        y1="0"
        x2="0"
        y2="1660"
      />
      <!-- からすき星とふきだしを結ぶ線 -->
      <line
        x1="600"
        y1="1080"
        x2="1000"
        y2="1280"
      />
      <!-- 昴とふきだしを結ぶ線 -->
      <line
        x1="1940"
        y1="500"
        x2="1760"
        y2="700"
      />
    </svg>
    <div id="bubble">
      <div style="left: 1000px; top: 1200px">
        アマノヤチマタ
      </div>
      <div style="left: 1500px; top: 700px">
        <ruby>天岩戸<rp>(</rp><rt>あまのいわと</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figIotsuiwamuraContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <!-- 全体の枠 -->
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <!-- からすき星と昴を結ぶ線 -->
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <!-- 天の川とふきだしを結ぶ線 -->
      <line
        x1="750"
        y1="120"
        x2="900"
        y2="200"
      />
      <!-- からすき星とふきだしを結ぶ線 -->
      <line
        x1="600"
        y1="1080"
        x2="1000"
        y2="1280"
      />
      <!-- 昴とふきだしを結ぶ線 -->
      <line
        x1="1940"
        y1="500"
        x2="1760"
        y2="700"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 150px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby><ruby>伊都之尾羽張<rp>(</rp><rt>いつのおはばり</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1500px; top: 700px">
        <ruby>五百箇磐石<rp>(</rp><rt>いおついわむら</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figIotsunomisumaruContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <!-- 全体の枠 -->
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <!-- からすき星と昴を結ぶ線 -->
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <!-- 天の川とふきだしを結ぶ線 -->
      <line
        x1="750"
        y1="120"
        x2="900"
        y2="200"
      />
      <!-- からすき星とふきだしを結ぶ線 -->
      <line
        x1="600"
        y1="1080"
        x2="1000"
        y2="1280"
      />
      <!-- 昴とふきだしを結ぶ線 -->
      <line
        x1="1940"
        y1="500"
        x2="1760"
        y2="700"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 150px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby><ruby>蛇韓鋤之剣<rp>(</rp><rt>おろちのからすきのつるぎ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1500px; top: 700px">
        <ruby>五百箇御統<rp>(</rp><rt>いおつのみすまる</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figSubaruContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <!-- 全体の枠 -->
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <!-- からすき星と昴を結ぶ線 -->
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <!-- 天の川とふきだしを結ぶ線 -->
      <line
        x1="750"
        y1="120"
        x2="900"
        y2="200"
      />
      <!-- からすき星とふきだしを結ぶ線 -->
      <line
        x1="600"
        y1="1080"
        x2="1000"
        y2="1280"
      />
      <!-- 昴とふきだしを結ぶ線 -->
      <line
        x1="1940"
        y1="500"
        x2="1760"
        y2="700"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 150px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby>蛇韓鋤之剣<rp>(</rp><rt>おろちのからすきのつるぎ</rt><rp>)</rp></ruby><br>

        <ruby>伊都之尾羽張<rp>(</rp><rt>いつのおはばり</rt><rp>)</rp></ruby><br>

        <ruby><ruby>伊都之尾羽張<rp>(</rp><rt>イツノオハバリ</rt><rp>)</rp></ruby>神
      </div>
      <div style="left: 1500px; top: 700px">
        <ruby>五百箇御統<rp>(</rp><rt>いおつのみすまる</rt><rp>)</rp></ruby><br>

        <ruby>五百箇磐石<rp>(</rp><rt>いおついわむら</rt><rp>)</rp></ruby><br>

        <ruby>天岩戸<rp>(</rp><rt>あまのいわと</rt><rp>)</rp></ruby>
      </div>
    </div>`;
}
