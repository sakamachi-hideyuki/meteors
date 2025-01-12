cd /d %~dp0
mkdir build\png
call screenshot.bat cover\cover-ebook.html build\png\cover-ebook.png
call screenshot.bat fig-amanoiwato\fig-amanoiwato-ebook.html build\png\fig-amanoiwato-ebook.png
call screenshot.bat fig-amanoiwato\fig-amanoiwato-web.html build\png\fig-amanoiwato-web.png
call screenshot.bat fig-amanoyachimata\fig-amanoyachimata-ebook.html build\png\fig-amanoyachimata-ebook.png
call screenshot.bat fig-amanoyachimata\fig-amanoyachimata-web.html build\png\fig-amanoyachimata-web.png
call screenshot.bat fig-iotsuiwamura\fig-iotsuiwamura-ebook.html build\png\fig-iotsuiwamura-ebook.png
call screenshot.bat fig-iotsuiwamura\fig-iotsuiwamura-web.html build\png\fig-iotsuiwamura-web.png
call screenshot.bat fig-iotsunomisumaru\fig-iotsunomisumaru-ebook.html build\png\fig-iotsunomisumaru-ebook.png
call screenshot.bat fig-iotsunomisumaru\fig-iotsunomisumaru-web.html build\png\fig-iotsunomisumaru-web.png
call screenshot.bat fig-milkywayinsummer\fig-milkywayinsummer-ebook.html build\png\fig-milkywayinsummer-ebook.png
copy fig-milkywayinsummer\fig-milkywayinsummer-web.png build\png\.
call screenshot.bat fig-milkywayinwinter\fig-milkywayinwinter-ebook.html build\png\fig-milkywayinwinter-ebook.png
copy fig-milkywayinwinter\fig-milkywayinwinter-web.png build\png\.
call screenshot.bat fig-subaru\fig-subaru-ebook.html build\png\fig-subaru-ebook.png
call screenshot.bat fig-subaru\fig-subaru-web.html build\png\fig-subaru-web.png
call screenshot.bat fig-subarunoko\fig-subarunoko-ebook.html build\png\fig-subarunoko-ebook.png
call screenshot.bat fig-subarunoko\fig-subarunoko-web.html build\png\fig-subarunoko-web.png
call screenshot.bat photo-iwakura\photo-iwakura-ebook.html build\png\photo-iwakura-ebook.png
magick photo-iwakura\kyoto-Kamitaniiwakura.-xl.png -resize 2560x build\png\photo-iwakura-web.png
call screenshot.bat photo-magatama\photo-magatama-ebook.html build\png\photo-magatama-ebook.png
magick photo-magatama\A200c000042.png -resize 2560x build\png\photo-magatama-web.png
call screenshot.bat photo-meteor\photo-meteor-ebook.html build\png\photo-meteor-ebook.png
magick photo-meteor\tauride-20201204.png -resize 2560x build\png\photo-meteor-web.png
call screenshot.bat photo-ogame\photo-ogame-ebook.html build\png\photo-ogame-ebook.png
magick photo-ogame\001.png -resize x2560 build\png\photo-ogame-web.png
call screenshot.bat photo-otomatsuri\photo-otomatsuri-ebook.html build\png\photo-otomatsuri-ebook.png
magick photo-otomatsuri\wakayama-Kumano_Oto_Festival-xl.png -resize 2560x build\png\photo-otomatsuri-web.png
call screenshot.bat photo-pleiades\photo-pleiades-ebook.html build\png\photo-pleiades-ebook.png
call screenshot.bat photo-pleiades\photo-pleiades-web.html build\png\photo-pleiades-web.png
call screenshot.bat photo-tategushi\photo-tategushi-ebook.html build\png\photo-tategushi-ebook.png
magick photo-tategushi\A017b000004.png -resize 2560x build\png\photo-tategushi-web.png
call screenshot.bat title\title-ebook.html build\png\title-ebook.png
magick mogrify -define png:exclude-chunk=tIME -strip build\png\*.png
