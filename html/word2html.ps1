Param($wordFile, $htmlFile)
$app = New-Object -ComObject Word.Application
$doc = $app.Documents.Open($wordFile)
# HTML形式で保存するとWebレイアウトに切り替わるので、元のレイアウトを保持しておく
$viewType = $doc.ActiveWindow.View.Type
$doc.WebOptions.Encoding = 65001 # 65001 は UTF-8
$doc.SaveAs2($htmlFile, 10) # 10 は wdFormatFilteredHTML
# HTML形式で保存するとWebレイアウトに切り替わるので、元のレイアウトに戻す
$doc.ActiveWindow.View.Type = $viewType
$doc.Close()
$app.Quit()
