node %~dp0screenshot.mjs %1 %2
magick %2 -resize 50%% -define png:exclude-chunk=tIME -strip %2
