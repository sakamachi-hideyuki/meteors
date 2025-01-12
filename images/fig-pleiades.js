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
      u {
        text-underline-offset: 8px;
      }
      #text > div {
        color: #000;
        font-family: serif;
        font-size: 50px;
        font-weight: bold;
        position: absolute;
        text-align: center;
        white-space: nowrap;
      }
      #bubble > div {
        background-color: #fff;
        border: 2px solid #000;
        color: #000;
        font-family: serif;
        font-size: 50px;
        font-weight: bold;
        padding: 40px 50px 20px 50px;
        position: absolute;
        white-space: nowrap;
      }
      #amanogawa-container {
        overflow: hidden;

        position: absolute;
        left: 0;
        top: 0;
        width: 2560px;
        height: 800px;
      }
      #amanogawa {
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
    <div id="amanogawa-container">
      <div id="amanogawa"></div>
    </div>
    <div id="text">
      <div style="left: 500px; top: 70px;">天の川</div>

      <div style="left: 500px; top: 280px;"><u>オリオン座</u></div>
      <div style="left: 120px; top: 530px;">ベテルギウス</div>
      <div style="left: 150px; top: 880px;">三つ星<br>（からすき星）</div>
      <div style="left: 500px; top: 1200px;">小三つ星</div>
      <div style="left: 700px; top: 1400px;">リゲル</div>

      <div style="left: 1600px; top: 140px;"><u>おうし座</u></div>
      <div style="left: 1140px; top: 460px;">アルデバラン</div>
      <div style="left: 1920px; top: 340px;">プレアデス星団<br>（<ruby>昴<rp>(</rp><rt>すばる</rt><rp>)</rp></ruby>）
      </div>
    </div>`;

  static figAmanoiwatoContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <line
        x1="680"
        y1="140"
        x2="900"
        y2="250"
      />
      <line
        x1="590"
        y1="1060"
        x2="1000"
        y2="1240"
      />
      <line
        x1="2000"
        y1="480"
        x2="1800"
        y2="800"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 200px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby>伊奘諾<rp>(</rp><rt>イザナキ</rt><rp>)</rp></ruby>の剣の神（<ruby>伊都之尾羽張<rp>(</rp><rt>イツノオハバリ</rt><rp>)</rp></ruby>神、<ruby>稜威雄走<rp>(</rp><rt>イツノオバシリ</rt><rp>)</rp></ruby>神）
      </div>
      <div style="left: 1600px; top: 800px">
        <ruby>天岩戸<rp>(</rp><rt>あまのいわと</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figAmanoyachimataContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
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
      <line
        x1="590"
        y1="1060"
        x2="1000"
        y2="1240"
      />
      <line
        x1="2000"
        y1="480"
        x2="1800"
        y2="800"
      />
    </svg>
    <div id="bubble">
      <div style="left: 1000px; top: 1200px">
        アマノヤチマタ
      </div>
      <div style="left: 1600px; top: 800px">
        <ruby>天岩戸<rp>(</rp><rt>あまのいわと</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figIotsuiwamuraContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <line
        x1="680"
        y1="140"
        x2="900"
        y2="250"
      />
      <line
        x1="590"
        y1="1060"
        x2="1000"
        y2="1240"
      />
      <line
        x1="2000"
        y1="480"
        x2="1800"
        y2="800"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 200px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby>伊奘諾<rp>(</rp><rt>イザナキ</rt><rp>)</rp></ruby>の剣（<ruby>伊都之尾羽張<rp>(</rp><rt>いつのおはばり</rt><rp>)</rp></ruby>）
      </div>
      <div style="left: 1600px; top: 800px">
        <ruby>五百箇磐石<rp>(</rp><rt>いおついわむら</rt><rp>)</rp></ruby>（<ruby>湯津石村<rp>(</rp><rt>ゆついわむら</rt><rp>)</rp></ruby>）
      </div>
    </div>`;

  static figIotsunomisumaruContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <line
        x1="680"
        y1="140"
        x2="900"
        y2="250"
      />
      <line
        x1="590"
        y1="1060"
        x2="1000"
        y2="1240"
      />
      <line
        x1="2000"
        y1="480"
        x2="1800"
        y2="800"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 200px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby>素戔嗚<rp>(</rp><rt>スサノオ</rt><rp>)</rp></ruby>の剣（<ruby>蛇韓鋤之剣<rp>(</rp><rt>おろちのからすきのつるぎ</rt><rp>)</rp></ruby>）
      </div>
      <div style="left: 1600px; top: 800px">
        <ruby>五百箇御統<rp>(</rp><rt>いおつのみすまる</rt><rp>)</rp></ruby>
      </div>
    </div>`;

  static figSubaruContentHtml = `
    ${this.baseHtml}
    <svg
      width="2560px"
      height="1706px"
    >
      <rect
        x="1"
        y="1"
        width="2558"
        height="1704"
        fill="none"
      />
      <line
        x1="0"
        y1="1250"
        x2="2560"
        y2="200"
      />
      <line
        x1="680"
        y1="140"
        x2="900"
        y2="250"
      />
      <line
        x1="590"
        y1="1060"
        x2="1000"
        y2="1240"
      />
      <line
        x1="2000"
        y1="480"
        x2="1800"
        y2="800"
      />
    </svg>
    <div id="bubble">
      <div style="left: 900px; top: 200px">
        <ruby>天安河<rp>(</rp><rt>あまのやすのかわ</rt><rp>)</rp></ruby>
      </div>
      <div style="left: 1000px; top: 1200px">
        <ruby>素戔嗚<rp>(</rp><rt>スサノオ</rt><rp>)</rp></ruby>の剣（<ruby>蛇韓鋤之剣<rp>(</rp><rt>おろちのからすきのつるぎ</rt><rp>)</rp></ruby>）<br>

        <ruby>伊奘諾<rp>(</rp><rt>イザナキ</rt><rp>)</rp></ruby>の剣（<ruby>伊都之尾羽張<rp>(</rp><rt>いつのおはばり</rt><rp>)</rp></ruby>）<br>

        <ruby>伊奘諾<rp>(</rp><rt>イザナキ</rt><rp>)</rp></ruby>の剣の神（<ruby>伊都之尾羽張<rp>(</rp><rt>イツノオハバリ</rt><rp>)</rp></ruby>神、<ruby>稜威雄走<rp>(</rp><rt>イツノオバシリ</rt><rp>)</rp></ruby>神）
      </div>
      <div style="left: 1600px; top: 800px">
        <ruby>五百箇御統<rp>(</rp><rt>いおつのみすまる</rt><rp>)</rp></ruby><br>

        <ruby>五百箇磐石<rp>(</rp><rt>いおついわむら</rt><rp>)</rp></ruby>（<ruby>湯津石村<rp>(</rp><rt>ゆついわむら</rt><rp>)</rp></ruby>）<br>

        <ruby>天岩戸<rp>(</rp><rt>あまのいわと</rt><rp>)</rp></ruby>
      </div>
    </div>`;
}
