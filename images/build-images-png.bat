cd /d %~dp0
mkdir build\png
copy cover\cover-ebook.png build\png\.
copy fig-amanoiwato\fig-amanoiwato-ebook.png build\png\.
copy fig-amanoiwato\fig-amanoiwato-web.png build\png\.
copy fig-amanoyachimata\fig-amanoyachimata-ebook.png build\png\.
copy fig-amanoyachimata\fig-amanoyachimata-web.png build\png\.
copy fig-iotsuiwamura\fig-iotsuiwamura-ebook.png build\png\.
copy fig-iotsuiwamura\fig-iotsuiwamura-web.png build\png\.
copy fig-iotsunomisumaru\fig-iotsunomisumaru-ebook.png build\png\.
copy fig-iotsunomisumaru\fig-iotsunomisumaru-web.png build\png\.
copy fig-milkywayinsummer\fig-milkywayinsummer-ebook.png build\png\.
magick fig-milkywayinsummer\fig-milkywayinsummer-web.png -define png:exclude-chunk=tIME -strip build\png\fig-milkywayinsummer-web.png
copy fig-milkywayinwinter\fig-milkywayinwinter-ebook.png build\png\.
magick fig-milkywayinwinter\fig-milkywayinwinter-web.png -define png:exclude-chunk=tIME -strip build\png\fig-milkywayinwinter-web.png
copy fig-subaru\fig-subaru-ebook.png build\png\.
copy fig-subaru\fig-subaru-web.png build\png\.
copy fig-subarunoko\fig-subarunoko-ebook.png build\png\.
copy fig-subarunoko\fig-subarunoko-web.png build\png\.
magick fig-summary\fig-summary-haya-web.png -define png:exclude-chunk=tIME -strip build\png\fig-summary-haya-web.png
copy fig-summary\fig-summary-haya-ebook.png build\png\.
magick fig-summary\fig-summary-hi-web.png -define png:exclude-chunk=tIME -strip build\png\fig-summary-hi-web.png
copy fig-summary\fig-summary-hi-ebook.png build\png\.
magick fig-summary\fig-summary-ishi-web.png -define png:exclude-chunk=tIME -strip build\png\fig-summary-ishi-web.png
copy fig-summary\fig-summary-ishi-ebook.png build\png\.
magick fig-summary\fig-summary-kushi-web.png -define png:exclude-chunk=tIME -strip build\png\fig-summary-kushi-web.png
copy fig-summary\fig-summary-kushi-ebook.png build\png\.
magick fig-summary\fig-summary-mika-web.png -define png:exclude-chunk=tIME -strip build\png\fig-summary-mika-web.png
copy fig-summary\fig-summary-mika-ebook.png build\png\.
magick fig-summary\fig-summary-tama-web.png -define png:exclude-chunk=tIME -strip build\png\fig-summary-tama-web.png
copy fig-summary\fig-summary-tama-ebook.png build\png\.
copy photo-iwakura\photo-iwakura-ebook.png build\png\.
magick photo-iwakura\kyoto-Kamitaniiwakura.-xl.png -resize 2560x -define png:exclude-chunk=tIME -strip build\png\photo-iwakura-web.png
copy photo-magatama\photo-magatama-ebook.png build\png\.
magick photo-magatama\A200c000042.png -resize 2560x -define png:exclude-chunk=tIME -strip build\png\photo-magatama-web.png
copy photo-meteor\photo-meteor-ebook.png build\png\.
magick photo-meteor\tauride-20201204.png -resize 2560x -define png:exclude-chunk=tIME -strip build\png\photo-meteor-web.png
copy photo-ogame\photo-ogame-ebook.png build\png\.
magick photo-ogame\001.png -resize x2560 -define png:exclude-chunk=tIME -strip build\png\photo-ogame-web.png
copy photo-otomatsuri\photo-otomatsuri-ebook.png build\png\.
magick photo-otomatsuri\wakayama-Kumano_Oto_Festival-xl.png -resize 2560x -define png:exclude-chunk=tIME -strip build\png\photo-otomatsuri-web.png
copy photo-pleiades\photo-pleiades-ebook.png build\png\.
copy photo-pleiades\photo-pleiades-web.png build\png\.
copy photo-tategushi\photo-tategushi-ebook.png build\png\.
magick photo-tategushi\A017b000004.png -resize 2560x -define png:exclude-chunk=tIME -strip build\png\photo-tategushi-web.png
copy title\title-ebook.png build\png\.
