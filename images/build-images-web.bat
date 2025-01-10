cd /d %~dp0
mkdir build\web
magick build\png\fig-amanoiwato-web.png build\web\fig-amanoiwato-web.webp
magick build\png\fig-amanoiwato-web.png -resize 640x build\web\fig-amanoiwato-web-small.webp
magick build\png\fig-amanoyachimata-web.png build\web\fig-amanoyachimata-web.webp
magick build\png\fig-amanoyachimata-web.png -resize 640x build\web\fig-amanoyachimata-web-small.webp
magick build\png\fig-iotsuiwamura-web.png build\web\fig-iotsuiwamura-web.webp
magick build\png\fig-iotsuiwamura-web.png -resize 640x build\web\fig-iotsuiwamura-web-small.webp
magick build\png\fig-iotsunomisumaru-web.png build\web\fig-iotsunomisumaru-web.webp
magick build\png\fig-iotsunomisumaru-web.png -resize 640x build\web\fig-iotsunomisumaru-web-small.webp
magick build\png\fig-milkywayinsummer-web.png build\web\fig-milkywayinsummer-web.webp
magick build\png\fig-milkywayinsummer-web.png -resize 640x build\web\fig-milkywayinsummer-web-small.webp
magick build\png\fig-milkywayinwinter-web.png build\web\fig-milkywayinwinter-web.webp
magick build\png\fig-milkywayinwinter-web.png -resize 640x build\web\fig-milkywayinwinter-web-small.webp
magick build\png\photo-iwakura-web.png build\web\photo-iwakura-web.webp
magick build\png\photo-iwakura-web.png -resize 640x build\web\photo-iwakura-web-small.webp
magick build\png\photo-magatama-web.png build\web\photo-magatama-web.webp
magick build\png\photo-magatama-web.png -resize 640x build\web\photo-magatama-web-small.webp
magick build\png\photo-meteor-web.png build\web\photo-meteor-web.webp
magick build\png\photo-meteor-web.png -resize 640x build\web\photo-meteor-web-small.webp
magick build\png\photo-ogame-web.png build\web\photo-ogame-web.webp
magick build\png\photo-ogame-web.png -resize 640x build\web\photo-ogame-web-small.webp
magick build\png\photo-otomatsuri-web.png build\web\photo-otomatsuri-web.webp
magick build\png\photo-otomatsuri-web.png -resize 640x build\web\photo-otomatsuri-web-small.webp
magick build\png\photo-pleiades-web.png build\web\photo-pleiades-web.webp
magick build\png\photo-pleiades-web.png -resize 640x build\web\photo-pleiades-web-small.webp
magick build\png\photo-tategushi-web.png build\web\photo-tategushi-web.webp
magick build\png\photo-tategushi-web.png -resize 640x build\web\photo-tategushi-web-small.webp
mkdir ..\docs\images
copy build\web\*.* ..\docs\images\.
