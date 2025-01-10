chcp 65001
cd /d %~dp0
powershell -ExecutionPolicy RemoteSigned -File word2html.ps1 %~dp0..\..\word\流星と昴の日本神話.docx %~dp0流星と昴の日本神話.htm
node build-html.mjs http://127.0.0.1:5500/html/build.html ..\docs
pause
