$ErrorActionPreference = "Continue"
$dest = "C:\Users\Thinkpad\Documents\deepseek-harness\default-workspace\.claude\skills\li-xiaolai-perspective\references\sources\_tw\raw"
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Force -Path $dest | Out-Null }
$targets = @(
  "https://twitter.com/xiaolai/status/1040126385216339969",
  "https://twitter.com/xiaolai/status/1963620886793392464"
)
foreach ($t in $targets) {
  $arch = "http://web.archive.org/web/2id_/" + $t
  $name = ($t -split '/')[-1]
  try {
    $r = Invoke-WebRequest -Uri $arch -UseBasicParsing -TimeoutSec 60 -Headers @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0 Safari/537.36" }
    $bytes = $r.RawContentStream.ToArray()
    [System.IO.File]::WriteAllBytes("$dest\raw_$name.html", $bytes)
    Write-Output ("SAVED $name bytes=" + $bytes.Length)
  } catch { Write-Output ("FAIL $t :: " + $_.Exception.Message) }
  Start-Sleep -Seconds 6
}
