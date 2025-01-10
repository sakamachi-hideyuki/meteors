Param($wordFile, $htmlFile)
$app = New-Object -ComObject Word.Application
$doc = $app.Documents.Open($wordFile)
$doc.WebOptions.Encoding = 65001
$doc.SaveAs2($htmlFile, 10)
$doc.Close()
$app.Quit()
